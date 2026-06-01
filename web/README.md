# Aether RF Simulator

Professional interactive digital twin of the Aether educational RF research platform.

## Features

- **Device Simulation**: ESP32 + Dual NRF24L01+ radios with independent HSPI/VSPI buses
- **RF Spectrum Visualization**: Real-time 2.4GHz spectrum with WiFi/BLE overlays
- **Channel Occupancy Heatmap**: Live visualization of frequency hopping patterns
- **Network View**: Future mesh protocol visualization
- **Telemetry Dashboard**: Real-time metrics and event logging
- **Experiment Control**: Multiple preset experiments with configurable parameters

## Tech Stack

- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Recharts
- Zustand

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Experiments

1. **Channel Hopping**: Sequential, random, and coordinated hopping modes
2. **WiFi Coexistence**: Visualize interference with WiFi channels
3. **BLE Coexistence**: Bluetooth Low Energy interference patterns
4. **Distance vs RSSI**: Signal strength analysis
5. **Body Attenuation**: Human body RF blocking effects
6. **Interference Mapping**: Comprehensive RF environment analysis
7. **Mesh Synchronization**: Future mesh protocol testing

## Architecture

The simulator uses a centralized state management system (Zustand) with a unified simulation engine. All panels subscribe to the same state, ensuring synchronized updates across:

- Device view
- Spectrum analyzer
- Occupancy heatmap
- Network topology
- Telemetry data

## Design Philosophy

Mission control aesthetic inspired by:
- Wireshark
- GNU Radio
- SDR++
- HackRF tools
- Aerospace telemetry systems

Dark engineering theme with technical precision and real-time data visualization.
