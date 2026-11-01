# Aether architecture

## Current system

Aether currently has two separate parts: a browser-only channel-selection model and a KiCad carrier design. The browser app does not communicate with the hardware or firmware.

### Browser model

The Vite application renders controls and visualizations in a browser. Its simulation hook advances the in-memory store on an interval. The pure model function selects the next RF_CH values, updates elapsed simulated time and visit counts, and returns state to the UI.

The model uses the mapping 2400 MHz + RF_CH for RF_CH 0–125. Wi-Fi and BLE markers are static frequency references. They do not represent traffic, occupancy, interference, or packet reception.

The application contains no device connection, network API, telemetry collector, persistent database, or RF hardware interface.

### Hardware and firmware boundary

Carrier R1 is a standalone KiCad proposal for an ESP32 DevKitC V4 and two nRF24 breakout sockets. It routes selected GPIO, power, and ground signals. It has not been fabricated or fit-checked.

The legacy firmware under firmware/ is not wired into the browser application and has not been reconciled with the R1 pin map. Some files contain transmitter-capable code. The repository does not establish successful radio initialization, measured RF behavior, or a working end-to-end system.

### Deployment

The Vite app is deployed as a static site through Vercel. The configured Vercel project root is web/. The project configuration in that folder runs the package build and serves the generated dist/ directory.

## Data path

1. The user selects a mode and hop interval in the UI.
2. UI actions update the in-memory simulation store.
3. While running, a browser timer invokes one model step at the selected interval.
4. The deterministic model updates the two channel values, elapsed simulated time, and per-channel visit counts.
5. React components render the updated values and history.

Nothing in this path reads or writes radio hardware.

## Technology

- React 18 and TypeScript for the interface
- Vite for local development and static production builds
- A small pure JavaScript RF_CH model
- Node's built-in test runner for model tests
- KiCad for the separate carrier proposal
- Vercel for static hosting

See [project scope](project-scope.md), [limitations](limitations.md), and the [validation record](testing-methodology.md) for capability and evidence boundaries.
