---
id: 18
date: "Aug 2026"
image: "assets/images/n8n-rechnung-workflow.jpeg"
tags_en:
  - "n8n"
  - "Automation"
  - "Ollama"
  - "LocalLLM"
  - "DataPrivacy"
  - "Workflow"
  - "HumanInTheLoop"
  - "OpenSource"
tags_de:
  - "n8n"
  - "Automatisierung"
  - "Ollama"
  - "LocalLLM"
  - "Datenschutz"
  - "Workflow"
  - "HumanInTheLoop"
  - "OpenSource"
title_en: "Automated Invoice Processing with n8n, Local Ollama LLM & Human-in-the-Loop"
title_de: "Automatisierte Rechnungsverarbeitung mit n8n, lokalem Ollama LLM & Human-in-the-Loop"
excerpt_en: "A privacy-first, on-premise automated invoice pipeline: n8n email ingestion, local data extraction using Ollama, and a Human-in-the-Loop approval gate."
excerpt_de: "Ein kompletter On-Premise Workflow für Rechnungsprüfung: E-Mail-Parsing mit n8n, lokale Extraktion via Ollama und manuelle Freigabe vor dem finalen Datenbank-Eintrag."
content_en: |
  Over the past few days, I built an automated workflow simulating a standard business routine: processing incoming invoices. 🧾⚡

  The core priority was **maximum data privacy**. The system ingests incoming invoice emails and extracts the relevant invoice data. To achieve this, I combined **n8n** with a local LLM running via **Ollama**. This ensures sensitive financial and customer data never leaves the local server infrastructure.

  To maintain reliable quality control, a **Human-in-the-Loop** verification step is integrated:
  1. The pipeline pauses after parsing and waits for manual one-click user approval.
  2. Upon approval, invoice items are automatically written to the database/spreadsheet.
  3. Upon rejection, a notification email is automatically dispatched.

  An exciting project demonstrating how AI-driven automation can be implemented securely, privacy-first, and 100% on-premise.
content_de: |
  Ich habe in den letzten Tagen einen automatisierten Workflow gebaut, der eine typische Unternehmensroutine simuliert: die Verarbeitung von Eingangsrechnungen. 🧾⚡

  Der Fokus lag dabei auf **maximalem Datenschutz**. Das System liest eingehende E-Mails aus und extrahiert die relevanten Rechnungsdaten. Dafür nutze ich **n8n** in Kombination mit einem lokalen LLM über **Ollama**. Das bedeutet, dass sensible Unternehmensdaten zu keinem Zeitpunkt den eigenen Server verlassen.

  Um die Kontrolle zu behalten, ist ein **Human-in-the-Loop**-Schritt integriert:
  1. Das System pausiert nach der Extraktion und wartet auf eine manuelle Freigabe per Klick.
  2. Bei Zustimmung werden die Rechnungsdaten automatisch in eine Tabelle geschrieben.
  3. Bei Ablehnung wird automatisiert eine standardisierte Absage-Mail verschickt.

  Ein spannendes Projekt, das zeigt, wie man KI-gestützte Automatisierung sicher, DSGVO-konform und komplett on-premise umsetzen kann.
---
