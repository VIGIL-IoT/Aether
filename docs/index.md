# Aether documentation

This hub describes the implemented browser simulator and the unbuilt carrier proposal. The legacy firmware and experiment folders are not evidence of validated hardware operation.

## Start here

- [Project scope and requirements](project-scope.md)
- [Current architecture](architecture.md)
- [Setup guide](setup-guide.md)
- [Implementation methodology](methodology.md)
- [Research gap and evidence needs](research-gap.md)
- [Research sources ledger](research-sources.md)
- [Engineering evidence, assumptions, and FMEA-lite](engineering-evidence.md)
- [Hardware references](hardware-references.md)
- [Compatibility and public contracts](compatibility-and-contracts.md)
- [AI skills and specialized tool registry](AI_SKILLS_REFERENCE.md)
- [Repository audit and maturity score](REPOSITORY_AUDIT.md)
- [Dependency management and SBOM](dependency-management.md)
- [Known limitations](limitations.md)
- [Validation record](testing-methodology.md)
- [Requirements traceability](traceability.md)
- [ADR-001: browser model boundary](decisions/ADR-001-browser-model-boundary.md)
- [SDG assessment](sdg-alignment.md)

## Browser simulator

- [Web project README](../web/README.md)
- [Web screen design record](web-ui-design.md)
- [Model implementation](../web/src/domain/rfModel.mjs)
- [Model tests](../web/tests/rfModel.test.mjs)

The live site is [aether-nrf-sim.vercel.app](https://aether-nrf-sim.vercel.app/). It models channel selection and does not transmit or measure RF.

## Hardware

- [Carrier R1 KiCad project and BOM](../hardware/kicad/aether-carrier-r1/README.md)
- [Assembly readiness](assembly-guide.md)
- [Current ESP32 pin map](pinout.md)
- [Power design status](power-budget.md)
- [Hardware references and component limits](hardware-references.md)
- [Legacy schematic notes](../hardware/schematics/README.md)
- [Legacy PCB notes](../hardware/pcb/README.md)
- [Legacy enclosure file](../hardware/enclosure/README.md)

Carrier R1 is an unbuilt proposal. Do not use the legacy hardware notes as build instructions.

## Firmware and experiments

- [Firmware provenance and status](../firmware/CHANGES.md)
- [Experiment proposals and status](../experiments/README.md)
- [RF terminology and model boundaries](rf-notes.md)
- [Withdrawn protocol draft](protocol-specification.md)
- [Safety notes](legal-and-safety.md)

No hardware experiment results or RF measurements are checked in.

## Project history and planning

- [Roadmap](roadmap.md)
- [Design journal status](design-journal.md)
- [Lessons-learned status](lessons-learned.md)
- [Cost status](cost-analysis.md)
- [Build configurations](build-variants.md)

## Governance

- [Contributing](../CONTRIBUTING.md)
- [Security policy](../SECURITY.md)
- [License files](../LICENSE), [hardware license](../LICENSE-HARDWARE)
