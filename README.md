![License](https://img.shields.io/badge/license-CERN--OHL--S--v2-blue) ![Platform](https://img.shields.io/badge/platform-ESP32-green) ![RF Band](https://img.shields.io/badge/RF-2.4%20GHz-orange) ![Status](https://img.shields.io/badge/status-experimental-yellow)

# Aether 

**Welcome to Aether**, a compact, open-hardware platform designed to demystify the invisible world of 2.4 GHz wireless communication.

Whether you're a student exploring RF fundamentals, a maker curious about how WiFi and Bluetooth coexist, or a researcher studying wireless protocols, Aether gives you hands-on access to the electromagnetic spectrum that powers billions of devices around us.

## What is Aether?

Aether is a portable RF experimentation platform built around an ESP32 microcontroller and dual NRF24L01+ transceivers. It's designed for controlled laboratory environments where you can safely explore wireless communication concepts, protocol behavior, and the fascinating dance of signals in the 2.4 GHz ISM band.

Think of it as a learning laboratory in your hands, a tool that transforms abstract RF theory into tangible experiments you can run, modify, and understand.

## Why "Aether"?

In 19th-century physics, the luminiferous aether was theorized as an invisible medium permeating space, the substrate through which electromagnetic waves propagated. While the Michelson-Morley experiment and subsequent developments in relativity rendered the classical aether obsolete, the term persisted as a cultural reference to invisible transmission, the unseen carrier of signals through empty space.

Modern wireless communication operates on the same conceptual foundation: electromagnetic waves traverse the air, carrying information between devices without physical connection. The 2.4 GHz ISM band is crowded with overlapping protocols, WiFi, Bluetooth, Zigbee, each navigating this shared medium through frequency hopping, channel selection, and adaptive modulation.

Aether embodies this principle. It is a platform for observing RF signal propagation, studying protocol coexistence, and understanding how wireless systems interact within the electromagnetic spectrum. The name reflects both the historical concept of an invisible transmission medium and the modern reality of wireless experimentation: making the unseen visible, the abstract tangible.

---

## Overview

Aether is an open-hardware research platform built around an ESP32 microcontroller and dual NRF24L01+ transceivers. It enables controlled study of wireless protocol behavior, RF interference patterns, and embedded systems design principles in laboratory environments.

**What Aether is:**
- An educational tool for understanding 2.4 GHz wireless protocols
- A platform for studying frequency hopping and channel coexistence
- A hands-on embedded systems learning environment
- An open-hardware reference design for dual-radio RF experimentation

**What Aether is NOT:**
- A tool for unauthorized wireless interference
- A device for disrupting commercial or public wireless infrastructure
- A product intended for deployment outside controlled research settings

---

## Hardware

| Component | Qty | Role |
|-----------|-----|------|
| ESP32 | 1 | Dual-core MCU, SPI master, application logic controller |
| NRF24L01+ | 2 | Independent 2.4 GHz transceivers for simultaneous TX/RX operations |
| External antennas (RP-SMA) | 2 | Replaces onboard PCB trace antennas for improved range and directionality |
| Decoupling capacitors (100µF) | 2 | Bulk capacitance across NRF24 VCC/GND rails |
| TP4056 module | 1 | Li-ion charge controller with overcharge/overdischarge protection |
| 3.7V Li-ion cell | 1 | Primary power source (18650 or similar) |
| Slide switch | 1 | Hard power cutoff for battery disconnect |
| Power LED (3mm) | 1 | Current-limited supply rail indicator |
| Custom PCB | 1 | 2-layer FR4 board integrating all components |

> **Why 100µF capacitors are mandatory:**
> 
> The NRF24L01+ draws burst current spikes up to ~160mA during transmission events. Thin PCB traces and wire inductance create impedance that cannot respond instantaneously to these transients. Without bulk capacitance directly at the VCC pin, the supply voltage droops below the NRF24's minimum operating threshold, corrupting SPI transactions and causing transmission failures. The 100µF capacitor acts as a local charge reservoir, absorbing the transient demand before it propagates back to the regulator. This is not optional, it is a hard requirement for reliable operation.

---

## Features

- Dual independent NRF24L01+ modules on separate SPI buses (no bus contention)
- Simultaneous transmit and receive capability across 126 channels (2.400-2.525 GHz)
- Configurable data rates (250kbps, 1Mbps, 2Mbps) and transmit power levels
- Portable battery-powered operation with integrated charging
- External antenna support for controlled radiation pattern experimentation
- Open firmware based on PlatformIO/Arduino framework
- Designed for modification, extension, and educational use

---

## Repository Structure

```
aether/
├── firmware/
│   ├── esp32/           # ESP32 application code (SPI init, radio control loop)
│   └── nrf24/           # NRF24L01+ hardware abstraction layer
├── hardware/
│   ├── pcb/             # PCB layout notes and design rules
│   ├── schematics/      # Schematic documentation and net descriptions
│   └── enclosure/       # Enclosure design intent and print settings
├── docs/
│   ├── architecture.md  # System topology and signal flow
│   ├── rf-notes.md      # RF theory, FHSS, 2.4 GHz band analysis
│   ├── setup-guide.md   # Toolchain setup and hardware assembly
│   └── legal-and-safety.md  # Regulations, ethical use, compliance
├── assets/              # Renders, diagrams, images
├── tools/               # Companion scripts and analysis utilities
├── .gitignore
├── LICENSE              # CERN OHL-S v2
├── README.md
├── CONTRIBUTING.md
└── SECURITY.md
```

---

## Architecture

Aether uses a dual-SPI topology to eliminate bus contention and enable simultaneous operation of both NRF24L01+ modules:

- **ESP32 HSPI** to NRF24 Module #1 (CE1/CSN1 on GPIO 15/5)
- **ESP32 VSPI** to NRF24 Module #2 (CE2/CSN2 on GPIO 17/16)

Power flows from the 3.7V Li-ion cell through the TP4056 charge controller to a 3.3V LDO regulator, which supplies the ESP32 and both NRF24 modules. Each NRF24 has a dedicated 100µF decoupling capacitor at its VCC pin to handle transmission current spikes.

The ESP32 coordinates both radios, configuring channels, data rates, and transmit power via SPI register writes. This architecture supports independent channel sweeps, simultaneous transmit/receive experiments, and protocol-level interference studies.

---

## RF Learning Objectives

Aether enables hands-on exploration of these research questions:

- How do WiFi, Bluetooth, and Zigbee coexist in the 2.4 GHz band without mutual destruction?
- What is the probability of packet collision when two frequency-hopping systems share spectrum?
- How does transmit power affect range, interference radius, and power consumption?
- What channel spacing is required to avoid adjacent-channel interference at different data rates?
- How do physical obstructions (metal, water, human tissue) attenuate 2.4 GHz signals?
- What is the relationship between RSSI, packet error rate, and distance in real environments?

---

## Embedded Systems Goals

Building and modifying Aether develops practical skills in:

- **SPI communication:** Multi-device bus management, register-level peripheral control
- **Interrupt handling:** GPIO-driven event detection for packet reception
- **Power management:** Battery monitoring, sleep modes, current profiling
- **RF register configuration:** Direct manipulation of transceiver state machines
- **Real-time constraints:** Timing-sensitive protocol implementation in embedded C++
- **Hardware debugging:** Logic analyzer use, signal integrity analysis, power rail troubleshooting

---

## Roadmap

**v1.0 (Current)** - Breadboard prototype with external modules, proof-of-concept firmware

**v2.0** - Custom PCB revision integrating ESP32 and NRF24 modules, optimized power distribution, RP-SMA antenna connectors

**v3.0** - Protocol extensions (Bluetooth LE scanning, Zigbee frame injection), OLED status display, SD card logging

---

## Legal Disclaimer

> [!WARNING]
> Aether is an educational RF research platform. It exists to study wireless communication systems, protocol behavior, and interference concepts in controlled environments. All experimentation must comply with applicable local laws, RF regulations, and spectrum authority guidelines. This project does not support, endorse, or facilitate unauthorized disruption of wireless communications. Users bear sole responsibility for lawful and ethical operation.

---

## Contributing

We welcome contributions that improve Aether's educational value, hardware design, or firmware capabilities. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our development process, coding standards, and pull request guidelines.

---

## Credits and Acknowledgments

Aether builds upon the work of the open-source community. We gratefully acknowledge the following contributions:

- **ESP32 NRF24L01+ Example Code:** Initial Arduino sketches for dual-radio operation and channel hopping patterns adapted from [smoochiee/Bluetooth-jammer-esp32](https://github.com/smoochiee/Bluetooth-jammer-esp32). These examples provided foundational reference implementations for HSPI/VSPI configuration and frequency hopping algorithms.

---

## License

Aether is licensed under the **CERN Open Hardware Licence Version 2 - Strongly Reciprocal (CERN-OHL-S v2)**. This license ensures that all modifications and derivatives remain open, fostering a collaborative hardware development ecosystem. The full license text is available in [LICENSE](LICENSE).

We chose CERN-OHL-S v2 because it:
- Guarantees freedom to study, modify, and share hardware designs
- Requires derivatives to remain open (strong reciprocity)
- Aligns with the open-source hardware community's values
- Provides clear patent grant and termination clauses
