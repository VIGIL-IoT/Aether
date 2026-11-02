# ADR-001: Keep the channel model in the browser

## Status

Accepted as the current architecture; recorded retrospectively on 2026-11-02.

## Context

The current Aether web application demonstrates channel-selection state for two modeled radios. The model is a pure function, the store is in-memory, and the Vite build produces static files. The repository separately contains a KiCad carrier proposal and legacy ESP32 firmware. No verified connection exists between the browser application and physical radio hardware.

The repository history does not record the original decision discussion. This ADR describes the current boundary and its present benefits; it does not claim these were the historical motivations.

## Decision

Keep channel selection as a deterministic, client-side model. Label output as simulated and keep the hardware proposal and legacy firmware as separate artifacts until a reviewed interface and validation path exist.

## Consequences

- The simulator is easy to build and inspect without a device, server, radio, account, or API.
- Pure model behavior can be tested independently from React rendering.
- The interface can teach the implemented selection rules but cannot establish RF behavior, spectrum occupancy, packet reception, range, or device performance.
- Simulated elapsed time is derived from the selected interval and must not be presented as measured wall time.
- A future hardware connection requires a separately reviewed interface, firmware and pin-map reconciliation, safety review, and hardware-in-loop evidence.

## Alternatives and evidence limits

This ADR does not assert that hardware-connected operation, a backend, or measured experiments were historically evaluated and rejected. Those alternatives remain possible future work; the present evidence does not justify claiming an end-to-end system.
