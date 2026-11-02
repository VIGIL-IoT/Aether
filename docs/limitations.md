# Limitations

This page records what the current repository does not establish.

## Browser model

- It models channel selection only. It has no packet, PHY, receiver, propagation, interference, occupancy, or coexistence simulation.
- Wi-Fi and BLE marks are reference frequencies, not sensed activity.
- The displayed frequencies and visit counts are model outputs, not measurements.
- Browser timer scheduling is not a real-time guarantee.
- Automated tests cover the pure model; UI behavior has not been covered by browser automation.
- The repository has no ESLint configuration or dependency; static linting is not configured.
- Dependency audit results apply to the locked web npm tree and the date run. They do not establish firmware provenance, runtime security, or future dependency status.

## Hardware

- Carrier R1 has not been fabricated, assembled, or checked against the exact mating boards.
- The assumed DevKitC V4 and nRF24 breakout dimensions and pin numbering may differ across clones.
- KiCad ERC/DRC checks do not establish connector fit, signal integrity, electrical margins, thermal behavior, radio behavior, or compliance.
- No manufacturing package, verified enclosure fit, or assembly evidence is included.
- There is no measured power budget. R1 has no battery or charging circuit.

## Firmware

- The legacy sketches have not been reconciled with carrier R1 and have not been validated on hardware.
- Some firmware files contain RF transmission routines; the project has no deployment or regulatory review for them.
- Firmware provenance and the relationship to the upstream project named in source comments have not been independently audited.

## Research and governance

- Experiment folders contain proposals, not executed studies or results.
- There are no hardware benchmarks, performance measurements, participant approvals, or environmental study data.
- No SDG or societal-impact claim is supported by outcome evidence.
- The web dependency tree had 0 findings at moderate severity or higher in the audit run recorded on 2026-11-02. Firmware licensing provenance and production security have not been fully audited.
