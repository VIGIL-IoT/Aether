![License](https://img.shields.io/badge/license-GPL--v3%20%2B%20CERN--OHL--S--v2-blue) ![Platform](https://img.shields.io/badge/platform-ESP32-green) ![RF Band](https://img.shields.io/badge/RF-2.4%20GHz-orange) ![Status](https://img.shields.io/badge/status-experimental-yellow) ![Build](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-v1.0-blue)

# Aether

![Aether Cover Image](assets/images/Aether%20Cover%20Image.png)

> **Open RF Learning Platform** - Dual NRF24L01+ transceivers on ESP32 for 2.4 GHz wireless experimentation

**Aether** is a portable RF research platform that transforms abstract wireless theory into hands-on experiments. Built around an ESP32 and dual NRF24L01+ transceivers, it enables controlled study of frequency hopping, protocol coexistence, and signal propagation in the 2.4 GHz ISM band.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/shaxntanu/Aether.git
cd Aether

# Open firmware in Arduino IDE
# Install ESP32 board package and RF24 library
# Upload firmware/esp32/dual_radio_hopping.ino
```

📖 **[Complete Setup Guide](docs/setup-guide.md)** | 🔧 **[Assembly Instructions](docs/assembly-guide.md)** | 📋 **[Documentation Hub](docs/index.md)**

## What is Aether?

Aether is an educational platform for understanding how WiFi, Bluetooth, and other 2.4 GHz protocols coexist without mutual interference. It provides:

- **Dual-radio architecture** for simultaneous TX/RX operations
- **126 channel coverage** across 2.400-2.525 GHz spectrum  
- **Configurable power levels** and data rates for range testing
- **Battery-powered portability** for field experiments
- **Open hardware design** with complete schematics and PCB files

**Perfect for:** RF engineering students, wireless protocol researchers, embedded systems learners, and makers exploring the invisible electromagnetic world around us.

## Key Features

| Feature | Specification | Purpose |
|---------|---------------|---------|
| **Dual SPI buses** | HSPI + VSPI | Eliminate bus contention, enable simultaneous operation |
| **Frequency range** | 2.400-2.525 GHz | Full ISM band coverage, 126 channels @ 1 MHz spacing |
| **Data rates** | 250kbps, 1Mbps, 2Mbps | Study rate vs. range tradeoffs |
| **TX power** | -18 to +7 dBm | Configurable for interference and range studies |
| **Battery life** | 8-12 hours | Portable operation for field experiments |
| **External antennas** | RP-SMA connectors | Controlled radiation patterns, directional studies |

## Hardware Overview

```
ESP32 ←→ NRF24 #1 (HSPI) ←→ Antenna #1
  ↓
  ↓    ←→ NRF24 #2 (VSPI) ←→ Antenna #2
  ↓
Li-ion Battery + Charging Circuit
```

**Core Components:**
- ESP32-WROOM-32 (dual-core, dual SPI)
- 2× NRF24L01+ transceivers with PA+LNA
- 18650 Li-ion battery with TP4056 charging
- 2× 100µF decoupling capacitors (mandatory)
- Custom PCB with optimized power distribution

> **Critical Design Note:** The 100µF capacitors are not optional. NRF24L01+ modules draw 160mA current spikes during transmission. Without local energy storage, voltage droop corrupts SPI communication and causes transmission failures.

## Research Applications

Aether enables hands-on exploration of:

**Protocol Coexistence:**
- WiFi channel overlap with Bluetooth frequency hopping
- Zigbee adaptive frequency agility in crowded spectrum
- Packet collision probability in multi-protocol environments

**RF Propagation:**
- Path loss vs. distance in different environments
- Attenuation through common materials (walls, water, human tissue)
- Antenna pattern effects on signal strength and interference

**Embedded Systems:**
- Dual SPI bus management and timing constraints
- Power optimization for battery-powered RF devices
- Real-time protocol implementation in embedded C++

## Repository Structure

```
aether/
├── docs/                    # 📚 Complete documentation
│   ├── setup-guide.md      # Toolchain and assembly instructions
│   ├── architecture.md     # System design and signal flow
│   ├── rf-notes.md         # 2.4 GHz theory and propagation
│   └── experiments/        # Research methodology and results
├── firmware/
│   ├── esp32/              # Arduino sketches for ESP32
│   └── nrf24/              # NRF24L01+ driver code
├── hardware/
│   ├── schematics/         # Circuit diagrams and netlists
│   ├── pcb/                # PCB layout and fabrication files
│   └── enclosure/          # 3D printable case design
├── experiments/            # Structured RF research protocols
└── tools/                  # Analysis scripts and utilities
```

## Getting Started

### Prerequisites
- Arduino IDE with ESP32 board package
- RF24 library by TMRh20
- Basic electronics knowledge (breadboard, multimeter)

### Hardware Assembly
1. **Power system:** Connect 18650 battery through TP4056 to 3.3V regulator
2. **NRF24 modules:** Wire to ESP32 HSPI/VSPI with 100µF decoupling capacitors
3. **Antennas:** Attach RP-SMA antennas for improved range and directionality

### First Experiment
```cpp
// Load firmware/esp32/dual_radio_hopping.ino
// Radio #1 transmits on channels 0-62
// Radio #2 receives on channels 63-125
// Observe packet success rate vs. channel separation
```

**Next Steps:**
- 📖 Read the [Architecture Guide](docs/architecture.md) to understand dual-SPI topology
- 🔬 Try [Channel Overlap Experiment](experiments/exp01-channel-overlap/README.md)
- 🛠️ Build the [Custom PCB](hardware/pcb/README.md) for permanent installation

## Legal and Safety

> [!WARNING]
> **Educational Use Only:** Aether is designed for controlled RF research in laboratory environments. All experimentation must comply with local spectrum regulations and RF emission limits. This project does not support unauthorized interference with commercial wireless systems.

**Compliance:** FCC Part 15, ETSI EN 300 328, IC RSS-210  
**Power Limits:** <100mW EIRP (compliant with ISM band regulations)  
**Intended Use:** Educational research, protocol analysis, RF learning

## Credits

**Firmware Foundation:** Derived from [Ble-jammer](https://github.com/smoochiee/Ble-jammer) by smoochiee (GPL v3)  
**Hardware & Documentation:** Original work by Shantanu (CERN-OHL-S v2)  
**Modifications:** See [firmware/CHANGES.md](firmware/CHANGES.md) for detailed changelog

## License

**Dual License Structure:**
- **Firmware:** GPL v3 (derivative work, maintains original licensing)
- **Hardware:** CERN-OHL-S v2 (schematics, PCB, enclosure)
- **Documentation:** CERN-OHL-S v2 (experiments, guides, analysis)

## Contributing

We welcome contributions that enhance Aether's educational value:
- 🐛 Bug fixes and firmware improvements
- 📊 New experiment protocols and analysis tools  
- 🔧 Hardware design optimizations
- 📚 Documentation and tutorial enhancements

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and coding standards.

---

**[📋 Documentation Hub](docs/index.md)** • **[🔧 Setup Guide](docs/setup-guide.md)** • **[🏗️ Architecture](docs/architecture.md)** • **[🔬 Experiments](experiments/README.md)** • **[💾 Firmware](firmware/esp32/README.md)** • **[⚡ Hardware](hardware/BOM.md)**
