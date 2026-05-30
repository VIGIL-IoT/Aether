# Aether Development Roadmap

## Purpose

This document tracks the evolution of Aether from breadboard prototype to mature RF research platform. It serves as a planning document for hardware revisions, firmware features, and experimental capabilities.

---

## Version History

### v1.0 - Breadboard Prototype (Current)

**Status:** Complete

**Hardware:**
- ESP32 dev board
- 2× NRF24L01+ modules on breadboard
- External 100µF capacitors
- USB power only
- No enclosure

**Firmware:**
- Basic dual-SPI initialization
- Channel hopping patterns (sequential, random, coordinated)
- Constant carrier mode
- Toggle switch control

**Limitations:**
- Fragile breadboard connections
- No battery power
- No telemetry logging
- No RSSI measurement
- Manual channel selection only

**Lessons Learned:**
- 100µF capacitors are absolutely critical
- 16 MHz SPI works reliably
- Dual-SPI eliminates bus contention as expected
- Need better mechanical stability

---

## v2.0 - Custom PCB (In Progress)

**Target Date:** Q2 2024

**Hardware Goals:**
- Custom 2-layer PCB integrating ESP32 and NRF24 modules
- Onboard TP4056 charge controller
- 3.7V Li-ion battery support with slide switch
- RP-SMA connectors for external antennas
- Power LED indicator
- Proper ground plane and decoupling
- Compact form factor (~60mm × 80mm)

**Firmware Goals:**
- Battery voltage monitoring via ADC
- Low-power sleep modes
- Telemetry data structure
- Serial logging with timestamps
- Configurable hop patterns via serial commands

**PCB Design Priorities:**
1. Minimize trace inductance to NRF24 VCC pins
2. Solid ground plane under RF sections
3. Keep antenna traces away from digital signals
4. Add test points for SPI signals
5. Include UART header for debugging

**Open Questions:**
- Should we integrate the NRF24 modules or use sockets?
- What battery capacity? (18650 vs. smaller form factor)
- Include OLED display on v2.0 or wait for v3.0?

---

## v3.0 - Advanced Features (Planned)

**Target Date:** Q4 2024

**Hardware Additions:**
- 128×64 OLED display (I2C)
- SD card slot for data logging
- External LNA module for RSSI measurement
- Rotary encoder for menu navigation
- Additional GPIO breakout for sensors

**Firmware Features:**
- Real-time RSSI display
- CSV data logging to SD card
- Experiment mode selection via OLED menu
- Bluetooth LE scanning capability
- Zigbee frame detection
- Multi-node synchronization protocol

**Protocol Extensions:**
- Define Aether mesh protocol
- Implement time-synchronized hopping
- Add packet acknowledgment system
- Support for multiple node IDs

**Experimental Capabilities:**
- Automated distance vs. RSSI mapping
- Interference pattern visualization
- Channel occupancy heatmaps
- Multi-node coordination experiments

---

## Future Considerations (v4.0+)

### Hardware
- Upgrade to ESP32-S3 (better ADC, more GPIO)
- Add GPS module for outdoor experiments
- Include IMU for orientation tracking
- Support for 5 GHz band (ESP32 + additional transceiver)
- Solar charging option

### Firmware
- Web interface for configuration
- Real-time spectrum waterfall display
- Machine learning for protocol classification
- Integration with GNU Radio
- Remote experiment control

### Research Directions
- Cognitive radio experiments
- Dynamic spectrum access algorithms
- Interference mitigation techniques
- Mesh network routing protocols
- RF fingerprinting and device identification

---

## Completed Milestones

- [x] Dual-SPI architecture proof-of-concept
- [x] Basic channel hopping implementation
- [x] Constant carrier mode validation
- [x] Documentation framework established
- [x] Repository structure defined

---

## Current Sprint (v2.0 PCB Design)

### In Progress
- [ ] Schematic capture in KiCad
- [ ] Component selection and BOM
- [ ] PCB layout with ground plane
- [ ] Design rule check (DRC)
- [ ] Generate Gerber files

### Blocked
- [ ] PCB fabrication (waiting on design completion)
- [ ] Component procurement (waiting on BOM finalization)

### Next Up
- [ ] Firmware refactoring for v2.0 hardware
- [ ] Battery monitoring implementation
- [ ] Serial command parser

---

## Long-Term Vision

Aether should become:
1. **Educational Platform:** Used in university RF courses and maker workshops
2. **Research Tool:** Cited in academic papers on wireless coexistence
3. **Open Standard:** Aether protocol adopted by other projects
4. **Community Project:** Active contributors and experiment sharing

**Success Metrics:**
- 100+ GitHub stars
- 10+ community-contributed experiments
- 5+ derivative projects
- 1+ academic citation

---

## Contributing to Roadmap

If you want to influence Aether's direction:
1. Open an issue describing your use case
2. Propose experiments that would benefit from new features
3. Share hardware modifications you've made
4. Document lessons learned from your builds

See CONTRIBUTING.md for details.

---

## References

- ESP32 Hardware Design Guidelines (Espressif)
- KiCad PCB Design Best Practices
- RF PCB Layout Considerations (Texas Instruments)
- Open Source Hardware Association (OSHWA) Guidelines
