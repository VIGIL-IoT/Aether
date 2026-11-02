# Aether RF channel model

The web app is a deterministic teaching model for the channel-selection logic of two nRF24 radios. It shows each radio's RF_CH position, maps the 126 channel centres from 2400 to 2525 MHz, and records modelled channel selections over a session.

It does not transmit RF, measure signal power, generate Wi-Fi or BLE traffic, simulate packets, or report RSSI, battery voltage, or temperature. Wi-Fi and BLE marks are frequency references only.

## Run locally

```sh
npm ci
npm run dev
```

Run the repository documentation checks, dependency audit, model tests, type check, and production build with:

```sh
npm run verify
```

The app uses React 18, TypeScript, and Vite. Use Node.js 24, matching the repository `.nvmrc`, package engine, and CI runtime. GitHub Actions runs a clean install and this same verification command.

## Model controls

- **Sequential:** both radios advance one channel per step and wrap at RF_CH 125.
- **Seeded random:** a fixed seed produces repeatable channel selections.
- **Fixed separation:** Radio 2 follows Radio 1 at a 32-channel offset.
- **Hop interval:** advances simulated time and sets the delay between model steps.

The frequency mapping follows `f (MHz) = 2400 + RF_CH`. The plot marks Wi-Fi 2.4 GHz channels 1, 6, and 11, and Bluetooth LE advertising channel centres 37, 38, and 39.
