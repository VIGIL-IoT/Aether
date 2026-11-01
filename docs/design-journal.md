# Design journal status

This file previously contained a first-person project history and detailed hardware decisions, measurements, and test outcomes that could not be corroborated from repository evidence. Those statements have been removed rather than treated as verified history.

The reviewable current decisions are:

- The implemented browser application is a deterministic channel-selection model with no RF interface.
- The hardware project is a separate carrier proposal for an ESP32 DevKitC V4 and two nRF24 breakout sockets.
- Carrier R1 uses USB power through the DevKit and has no battery or charging circuit.
- The carrier is unbuilt; physical fit and operation remain unverified.
- The legacy firmware is not integrated with the browser app or validated against R1.

These notes are a retrospective reading of the current repository, not a claim about undocumented historical intent. Future entries should include a date, relevant commit, decision, alternatives, and evidence.
