# PRAHARI - AI-Driven Multi-Vendor Network Security Compliance Auditor

**Team:** Power Rangers1  
**Problem Statement ID:** 26155 (Smart India Hackathon 2026)  
**Theme:** Blockchain & Cybersecurity  

## Overview
PRAHARI is a Continuous-Exposure-Management Engine for Heterogeneous Network Compliance. It offers an AI-augmented, vendor-agnostic platform to interpret configurations from a vast array of hardware (Palo Alto, Cisco, Juniper, White-box running SONiC, etc.) and audit them against rigorous security frameworks (CIS, NIST SP 800-53, DISA STIGs, ISO/IEC 27001).

## Features
- **Unified Ingestion Engine:** Upload exported configurations from any device securely without needing live credentials.
- **AI-Powered Training Module:** Employs NLP and pattern recognition. Map unrecognized blocks once via GUI—no backend redeployment required.
- **Multi-Framework Compliance Engine:** Deviation analysis mapped to CIS, NIST, ISO standards.
- **Attack-Path Prioritized Remediation:** Integrates minimum-cost hardening graph theory to rank the smallest fix set.
- **Actionable Reporting:** Per-device, step-by-step CLI remediation paths wrapped in Tamper-evident, SHA-256 hashed PDF reports.

## Setup Instructions (Full Stack)

### 1. Start the Python Backend (FastAPI Engine)
The core normalization and NLP parsing logic resides in the Python backend.
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*The backend will run on `http://localhost:8000`.*

### 2. Start the React Frontend
Open a new terminal window:
```bash
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

### Built With
- React & Vite
- Vanilla CSS with custom glassmorphism and modern aesthetics
- FastAPI & Python for NLP/Heuristic Normalization
- Reference Datasets: NCIIPC, CIS Benchmarks, NIST SP 800-53

## Contact
For data source references, see NCIIPC datasets (nciipc.gov.in, helpdesk1@nciipc.gov.in).
