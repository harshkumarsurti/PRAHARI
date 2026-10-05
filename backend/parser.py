import re
import hashlib
from typing import Dict, Any, List

class FindingStatus:
    PASS = "PASS"
    FAIL = "FAIL"
    UNKNOWN = "UNKNOWN"
    OBSERVED = "OBSERVED"

class ContextualEvidence:
    def __init__(self, line: int, text: str, section: str, rule: str):
        self.line = line
        self.text = text
        self.section = section
        self.rule = rule
    def dict(self):
        return {"line": self.line, "text": self.text, "section": self.section, "rule": self.rule}

class SecurityIntent:
    def __init__(self, value, status, confidence, evidence: List[ContextualEvidence]):
        self.value = value
        self.status = status
        self.confidence = confidence
        self.evidence = evidence
    def dict(self):
        return {
            "value": self.value,
            "status": self.status,
            "confidence": self.confidence,
            "evidence": [e.dict() for e in self.evidence]
        }

class ConfigurationParser:
    def parse(self, text: str) -> Dict[str, Any]:
        raise NotImplementedError("Subclasses must implement parse()")

class UnknownParser(ConfigurationParser):
    def parse(self, text: str) -> Dict[str, Any]:
        return {
            "vendor": "Unknown",
            "parser_status": "UNKNOWN",
            "confidence": 0.0,
            "review_required": True,
            "security_intents": {}
        }

class CiscoParser(ConfigurationParser):
    def parse(self, text: str) -> Dict[str, Any]:
        lines = text.split('\n')
        intents = {
            "ssh_protocol_version": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, []),
            "telnet_disabled": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, []),
            "logging_enabled": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, []),
            "password_encryption": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, [])
        }
        
        current_section = "global"
        for i, line in enumerate(lines, 1):
            line_str = line.strip()
            if not line_str or line_str.startswith("!"):
                continue
                
            if line_str.startswith("line ") or line_str.startswith("interface ") or line_str.startswith("router "):
                current_section = line_str
                continue
            if line.startswith(" ") and current_section != "global":
                pass
            else:
                current_section = "global"
            
            # SSH Version
            if current_section == "global":
                if re.match(r'^ip ssh version 2', line_str, re.IGNORECASE):
                    intents["ssh_protocol_version"] = SecurityIntent(2, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "CISCO_SSH_VERSION")])
                elif re.match(r'^ip ssh version 1', line_str, re.IGNORECASE):
                    intents["ssh_protocol_version"] = SecurityIntent(1, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "CISCO_SSH_VERSION")])
                
                if re.match(r'^service password-encryption', line_str, re.IGNORECASE):
                    intents["password_encryption"] = SecurityIntent(True, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "CISCO_PW_ENCRYPT")])
                
                if re.match(r'^logging host|^logging \d+\.\d+\.\d+\.\d+', line_str, re.IGNORECASE):
                    intents["logging_enabled"] = SecurityIntent(True, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "CISCO_LOGGING")])
            
            if current_section.startswith("line vty"):
                if re.match(r'^transport input ssh', line_str, re.IGNORECASE) and not "telnet" in line_str.lower():
                    if intents["telnet_disabled"].status == FindingStatus.UNKNOWN:
                        intents["telnet_disabled"] = SecurityIntent(True, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "CISCO_VTY_TRANSPORT")])
                elif "telnet" in line_str.lower():
                    intents["telnet_disabled"] = SecurityIntent(False, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "CISCO_VTY_TRANSPORT")])
                    
        return {
            "vendor": "Cisco IOS",
            "parser_status": "SUCCESS",
            "confidence": 0.99,
            "review_required": False,
            "security_intents": {k: v.dict() for k, v in intents.items()}
        }

class FortinetParser(ConfigurationParser):
    def parse(self, text: str) -> Dict[str, Any]:
        lines = text.split('\n')
        intents = {
            "ssh_protocol_version": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, []),
            "telnet_disabled": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, []),
            "logging_enabled": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, []),
            "password_encryption": SecurityIntent(None, FindingStatus.UNKNOWN, 1.0, [])
        }
        
        current_section = "global"
        for i, line in enumerate(lines, 1):
            line_str = line.strip()
            if line_str.startswith("config "):
                current_section = line_str
                continue
            if line_str == "end":
                current_section = "global"
                continue
                
            if current_section == "config system global":
                if re.match(r'^set admin-ssh-v1 disable', line_str, re.IGNORECASE):
                    intents["ssh_protocol_version"] = SecurityIntent(2, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "FORTI_SSH_V2")])
            
            if current_section.startswith("config system interface"):
                if re.match(r'^set allowaccess.*ssh', line_str, re.IGNORECASE) and not re.search(r'telnet', line_str, re.IGNORECASE):
                    if intents["telnet_disabled"].status == FindingStatus.UNKNOWN:
                        intents["telnet_disabled"] = SecurityIntent(True, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "FORTI_ADMIN_ACCESS")])
                elif "telnet" in line_str.lower():
                    intents["telnet_disabled"] = SecurityIntent(False, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "FORTI_ADMIN_ACCESS")])

            if current_section == "config log syslogd setting":
                if re.match(r'^set status enable', line_str, re.IGNORECASE):
                    intents["logging_enabled"] = SecurityIntent(True, FindingStatus.OBSERVED, 1.0, [ContextualEvidence(i, line_str, current_section, "FORTI_LOGGING")])
                    
        return {
            "vendor": "Fortinet FortiOS",
            "parser_status": "SUCCESS",
            "confidence": 0.99,
            "review_required": False,
            "security_intents": {k: v.dict() for k, v in intents.items()}
        }

import json
import os

class RuleEngine:
    @staticmethod
    def load_controls(framework_file="cis_controls.json"):
        filepath = os.path.join(os.path.dirname(__file__), "controls", framework_file)
        if not os.path.exists(filepath):
            return []
        with open(filepath, 'r') as f:
            return json.load(f)

    @staticmethod
    def evaluate(normalized_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        if normalized_data.get("parser_status") == "UNKNOWN":
            return []
            
        intents = normalized_data.get("security_intents", {})
        results = []
        controls = RuleEngine.load_controls()
        
        for control in controls:
            intent_key = control["intent_key"]
            expected_val = control["expected_value"]
            intent_obj = intents.get(intent_key, {})
            
            actual_val = intent_obj.get('value')
            status_flag = intent_obj.get('status')
            
            if status_flag == FindingStatus.UNKNOWN or actual_val is None:
                final_status = "UNKNOWN"
            elif actual_val == expected_val:
                final_status = "PASS"
            else:
                final_status = "FAIL"
                
            results.append({
                "id": control["id"],
                "frameworks": [control["framework"]],
                "desc": control["title"],
                "expected": f"{intent_key} = {expected_val}",
                "actual": f"{intent_key} = {actual_val} (Status: {status_flag})",
                "status": final_status,
                "evidence": intent_obj.get('evidence', []),
                "remediation": control["remediation"],
                "severity": control["severity"]
            })
            
        return results

def detect_vendor(text: str) -> ConfigurationParser:
    text_lower = text.lower()
    if "cisco" in text_lower or "ios" in text_lower or "interface gigabitethernet" in text_lower:
        return CiscoParser()
    elif "fortigate" in text_lower or "config system global" in text_lower or "fortios" in text_lower:
        return FortinetParser()
    else:
        # NO SILENT FALLBACK. Unknown configuration triggers human review state.
        return UnknownParser()

def analyze_configuration(filename: str, config_text: str) -> Dict[str, Any]:
    """
    Advanced Deterministic Core:
    1. Detects Vendor (No unsafe fallbacks).
    2. Parses raw CLI text (with context) into a Unified Security Model (JSON).
    3. Rule Engine evaluates the Model deterministically.
    """
    parser = detect_vendor(config_text)
    normalized_model = parser.parse(config_text)
    
    compliance_results = RuleEngine.evaluate(normalized_model)

    if normalized_model["parser_status"] == "UNKNOWN":
        score = 0
        device_status = "Unrecognized Syntax"
        framework = "Pending"
    else:
        passed_controls = sum(1 for r in compliance_results if r["status"] == "PASS")
        total_evaluatable = sum(1 for r in compliance_results if r["status"] in ["PASS", "FAIL"])
        score = int((passed_controls / total_evaluatable) * 100) if total_evaluatable > 0 else 0
        device_status = "Normalized"
        framework = "CIS / NIST / STIG"

    device_id = filename.split('.')[0].upper()
    
    raw_config_hash = hashlib.sha256(config_text.encode('utf-8')).hexdigest()
    
    # Generate canonical hash by removing trailing whitespace and blank lines
    canonical_text = "\n".join([line.strip() for line in config_text.split('\n') if line.strip()])
    canonical_config_hash = hashlib.sha256(canonical_text.encode('utf-8')).hexdigest()
    
    return {
        "device": {
            "id": device_id,
            "vendor": normalized_model["vendor"],
            "status": device_status,
            "score": score,
            "framework": framework,
            "review_required": normalized_model["review_required"],
            "raw_config_hash": raw_config_hash,
            "canonical_config_hash": canonical_config_hash
        },
        "compliance": compliance_results,
        "normalized_model": normalized_model
    }

import copy

def simulate_remediation(normalized_model: Dict[str, Any], target_intent_key: str, expected_value: Any) -> Dict[str, Any]:
    """
    Phase 10: What-If Remediation Simulation (Dry-Run)
    """
    simulated_model = copy.deepcopy(normalized_model)
    
    if target_intent_key in simulated_model.get("security_intents", {}):
        simulated_model["security_intents"][target_intent_key]["value"] = expected_value
        simulated_model["security_intents"][target_intent_key]["status"] = FindingStatus.OBSERVED
    else:
        simulated_model.setdefault("security_intents", {})[target_intent_key] = {
            "value": expected_value,
            "status": FindingStatus.OBSERVED,
            "confidence": 1.0,
            "evidence": [{"line": 0, "text": "SIMULATED REMEDIATION", "section": "simulated", "rule": "SIMULATION"}]
        }
        
    before_results = RuleEngine.evaluate(normalized_model)
    after_results = RuleEngine.evaluate(simulated_model)
    
    def calc_score(results):
        passed = sum(1 for r in results if r["status"] == "PASS")
        total = sum(1 for r in results if r["status"] in ["PASS", "FAIL"])
        return int((passed / total) * 100) if total > 0 else 0
        
    score_before = calc_score(before_results)
    score_after = calc_score(after_results)
    
    paths_before = max(0, 10 - (score_before // 10))
    paths_after = max(0, 10 - (score_after // 10))
    
    return {
        "status": "SIMULATION - NOT APPLIED TO DEVICE",
        "score_before": score_before,
        "score_after": score_after,
        "delta_score": score_after - score_before,
        "paths_before": paths_before,
        "paths_after": paths_after,
        "delta_paths": paths_before - paths_after,
        "compliance_after": after_results
    }

