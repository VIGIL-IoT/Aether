# Aether Documentation Hub

Welcome to the Aether documentation. This page provides organized access to all project documentation.

## Quick Start

New to Aether? Start here:

1. [Setup Guide](setup-guide.md) - Toolchain installation and first build
2. [Assembly Guide](assembly-guide.md) - Hardware assembly instructions
3. [Architecture Overview](architecture.md) - System design and topology

## Hardware Documentation

### Design Files
- [Bill of Materials](../hardware/BOM.md) - Complete component list and sourcing
- [Schematics](../hardware/schematics/README.md) - Circuit diagrams and net descriptions
- [PCB Design](../hardware/pcb/README.md) - Layout files and design rules
- [Enclosure](../hardware/enclosure/README.md) - Mechanical design and 3D files

### System Design
- [Architecture](architecture.md) - Dual-SPI topology and signal flow
- [Pin Mapping](pinout.md) - ESP32 GPIO assignments and connections
- [Power Budget](power-budget.md) - Current consumption and battery life analysis

## Firmware Documentation

### Development
- [Setup Guide](setup-guide.md) - Arduino IDE and toolchain setup
- [Firmware Architecture](../firmware/esp32/README.md) - Code structure and modules
- [Changes Log](../firmware/CHANGES.md) - Modifications from original source

### Configuration
- [Pin Mapping](pinout.md) - Hardware connections and GPIO assignments
- [RF Configuration](rf-notes.md) - Channel maps and power settings

## RF and Research

### Theory
- [RF Notes](rf-notes.md) - 2.4 GHz band analysis and propagation theory
- [Protocol Specification](protocol-specification.md) - Future Aether protocol definition

### Experiments
- [Experiments Overview](../experiments/README.md) - Research methodology and framework
- [Testing Methodology](testing-methodology.md) - Standardized measurement procedures

## Project Information

### Development
- [Design Journal](design-journal.md) - Engineering decisions and rationale
- [Lessons Learned](lessons-learned.md) - Mistakes and improvements
- [Roadmap](roadmap.md) - Version history and future plans

### Analysis
- [Cost Analysis](cost-analysis.md) - Build cost breakdown and optimization
- [Build Variants](build-variants.md) - Different configuration options

### Compliance
- [Legal & Safety](legal-and-safety.md) - RF regulations and ethical use
- [Security Policy](../SECURITY.md) - Vulnerability reporting and responsible disclosure

## Contributing

- [Contributing Guide](../CONTRIBUTING.md) - Development process and standards
- [Code Style](../CONTRIBUTING.md#code-style) - Firmware and documentation standards

## External Resources

### Datasheets
- [ESP32 Technical Reference](https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf)
- [NRF24L01+ Datasheet](https://www.nordicsemi.com/DocLib/Content/Product_Spec/nRF24L01P/latest/nRF24L01P_PS)
- [RF24 Library Documentation](https://nrf24.github.io/RF24/)

### Standards
- [FCC Part 15 Rules](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15)
- [ETSI EN 300 328](https://www.etsi.org/deliver/etsi_en/300300_300399/300328/)
- [IEEE 802.11 Standard](https://standards.ieee.org/ieee/802.11/7028/)

---

## Document Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| [Architecture](architecture.md) | ✅ Complete | 2026-05-30 |
| [Setup Guide](setup-guide.md) | ✅ Complete | 2026-05-30 |
| [RF Notes](rf-notes.md) | ✅ Complete | 2026-05-30 |
| [Design Journal](design-journal.md) | ✅ Complete | 2026-05-30 |
| [BOM](../hardware/BOM.md) | ✅ Complete | 2026-05-30 |
| [Pin Mapping](pinout.md) | ✅ Complete | 2026-05-30 |
| [Assembly Guide](assembly-guide.md) | ✅ Complete | 2026-05-30 |
| [Power Budget](power-budget.md) | ✅ Complete | 2026-05-30 |
| [Cost Analysis](cost-analysis.md) | ✅ Complete | 2026-05-30 |
| [Build Variants](build-variants.md) | ✅ Complete | 2026-05-30 |
| [PCB Design](../hardware/pcb/README.md) | ✅ Complete | 2026-05-30 |
| [Schematics](../hardware/schematics/README.md) | ✅ Complete | 2026-05-30 |
| [Enclosure](../hardware/enclosure/README.md) | ✅ Complete | 2026-05-30 |

**Legend:** ✅ Complete | 🚧 In Progress | 📋 Planned