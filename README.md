# Aether

Aether is an open-source learning project with a browser-based model of two nRF24 channel selectors and a proposed KiCad carrier for an ESP32 DevKitC V4 with two nRF24 breakouts.

## Project status

| Part | Status |
| --- | --- |
| Browser simulator | Implemented. Deterministically models channel selection; emits no RF. |
| KiCad carrier R1 | Schematic and two-layer board are present and pass the recorded KiCad ERC/DRC checks. The design is unbuilt and has not been fit-checked. |
| ESP32 firmware | Legacy sketches are present but are not verified against the R1 carrier or validated on hardware. Some sketches contain RF transmission routines. |
| RF experiments | Proposals only. No measurement data or experiment results are checked in. |

The live simulator is [aether-nrf-sim.vercel.app](https://aether-nrf-sim.vercel.app/). It is the Aether app; vigil-lyart-iota.vercel.app is unrelated.

## What the simulator does

- Shows two model radios selecting among RF_CH values 0–125.
- Maps each value to a modelled centre frequency using 2400 MHz + RF_CH.
- Provides sequential, seeded-random, and fixed-offset selection modes.
- Tracks modelled visits and elapsed simulated time.
- Marks selected Wi-Fi and Bluetooth LE frequencies for reference.

The simulator does not transmit RF, scan the spectrum, generate Wi-Fi or BLE traffic, simulate packets, or measure RSSI, power, temperature, or battery state. Its outputs are deterministic software-model results.

## Run the simulator

Requires Node.js 18 or newer.

    cd web
    npm install
    npm run dev

The model checks and production build are:

    npm test
    npm run build

See [web/README.md](web/README.md) for controls and [docs/setup-guide.md](docs/setup-guide.md) for setup details.

## Hardware

The current carrier proposal is in [hardware/kicad/aether-carrier-r1](hardware/kicad/aether-carrier-r1/). It is powered through the ESP32 DevKit's USB input and routes its 3V3/GND and GPIO signals to two radio sockets. It has no battery, charger, USB connector, regulator, or external antenna connector.

Open the KiCad project file in that folder. Review its [README](hardware/kicad/aether-carrier-r1/README.md) and BOM before considering fabrication. The board assumes specific mating-board dimensions and pin numbering; verify the actual parts and mechanical clearances before ordering. ERC/DRC results do not establish physical fit, RF performance, or regulatory compliance.

The older files under [hardware/schematics](hardware/schematics/) and the older PCB notes are retained as legacy material and are not the R1 design.

## Safety and firmware status

The browser simulator is software-only. The legacy firmware is a separate, unvalidated codebase; it has not been reconciled with the R1 pin map, tested on hardware, or reviewed for deployment. Do not treat its presence as evidence of a safe or working radio. Review [docs/legal-and-safety.md](docs/legal-and-safety.md) before handling transmitter-capable hardware.

## Documentation

- [Documentation hub](docs/index.md)
- [Current architecture](docs/architecture.md)
- [Project scope and requirements](docs/project-scope.md)
- [Limitations](docs/limitations.md)
- [Traceability](docs/traceability.md)
- [Validation record](docs/testing-methodology.md)
- [KiCad carrier R1](hardware/kicad/aether-carrier-r1/README.md)
- [Experiments: proposals and status](experiments/README.md)
- [Security policy](SECURITY.md)
- [Web verification workflow](.github/workflows/verify-web.yml)

## Repository layout

    docs/          Project, architecture, setup, and validation documentation
    experiments/   Unexecuted experiment proposals; no result data
    firmware/      Legacy ESP32/nRF24 sketches, unvalidated against carrier R1
    hardware/      Current KiCad carrier and legacy hardware material
    web/           React/TypeScript simulator, model tests, and Vite/Vercel config

## Licensing

The repository contains a GPL-3.0 license and a CERN-OHL-S v2 hardware license. Check the relevant license file and file headers for the material you use. Firmware provenance is not fully audited; see [firmware/CHANGES.md](firmware/CHANGES.md). No license terms have been changed as part of this status correction.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Contributions should preserve the distinction between simulated output, unverified firmware, and measured hardware results.
