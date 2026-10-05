# PRAHARI - Architecture Document
**Team:** Power Rangers1 (Smart India Hackathon 2026)

## 1. System Overview
PRAHARI is a Continuous-Exposure-Management Engine designed to tackle the core challenge of auditing heterogeneous, multi-vendor network infrastructures. The solution leverages AI (Pattern Recognition and NLP) to parse, map, and evaluate proprietary configuration texts against global security standards, fully isolated from live devices.

## 2. Core Modules & Data Flow

### 2.1 Unified Ingestion Engine
*   **Purpose:** Accepts single or bulk configuration files. 
*   **Mechanism:** Supports varied formats (Fortinet, Cisco, Palo Alto, SONiC, Cloud IaC). No live credentials or network sessions are ever established. 
*   **Benefit:** Zero-live-device access ensures the auditor application cannot become an attack surface, adhering to Protected-System-class requirements.

### 2.2 Normalization & AI-Powered Training Module
*   **Purpose:** Extract raw syntax and translate it into a vendor-neutral Security Baseline Model.
*   **Mechanism:** Uses a NAPALM-style initial parser bolstered by a robust Natural Language Processing (NLP) layer.
*   **Dynamic Adaptation (The Loop):** When unfamiliar syntax is encountered (e.g. white-box/SONiC configs), the system traps it and presents it via the *Interactive Training GUI*. An administrator visually maps the parsed parameters (e.g., `timeout 0`) to baseline rules (e.g., `Console Timeout`). 
*   **Benefit:** Eliminates the need for backend code deployment when new vendor firmware is released. The AI Engine effectively learns structure, maintaining scalability.

### 2.3 Multi-Framework Compliance Engine
*   **Purpose:** Deterministic deviation analysis.
*   **Mechanism:** Compares the normalized schema against versioned rule packs (CIS Benchmarks, NIST SP 800-53, DISA STIGs, ISO/IEC 27001). 
*   **Verdict Discipline:** Explanations and mappings may use NLP, but verdicts (PASS/FAIL) rely strictly on deterministic logic to ensure defensible audit evidence.

### 2.4 Correlation & Choke-Point Remediation
*   **Purpose:** Moving beyond linear checklist vulnerability scores to measurable path reduction.
*   **Mechanism:** Failed controls are mapped onto a cross-device Attack-Graph (NetworkX / Neo4j architecture). A minimum-hardening graph solver calculates the smallest configuration fix set required to collapse the most critical exploitable paths (Choke-point Remediation).

### 2.5 Actionable Intelligence & Reporting
*   **Purpose:** Generate defensible, customized PDF outputs for empanelled auditors and network admins.
*   **Mechanism:** Produces device-specific CLI command strings to resolve non-compliance directly. Implements a Tamper-evident SHA-256 hash-chain ledger to guarantee report non-repudiation.

## 3. Technology Stack (Proposed Production Architecture)
While the prototype demonstrates the frontend UX and Logical Flow via React/Vite, a full production deployment utilizes:
*   **Frontend:** React (Dashboard, Training Interface, Graph View)
*   **Backend REST API:** FastAPI, PostgreSQL
*   **Normalisation:** Python (Netmiko/NAPALM logic) + NLP (Ollama/spaCy)
*   **Correlation:** NetworkX / Neo4j
*   **Reporting Engine:** Python ReportLab / FPDF
*   **Deployment:** Fully air-gapped Docker capability for maximum on-premises privacy.

## 4. Deployment & Scalability Model
The architecture ensures PRAHARI scales across massive multi-site architectures seamlessly:
1.  **Pilot:** ~25 devices, local database.
2.  **Extended:** Multi-site distributed processing, 100+ devices.
3.  **Fleet-wide:** Used as a force multiplier for CERT-In empanelled auditors, reducing multi-day audits to minutes.
