# Implementation methodology

This document describes what the current implementation computes, how it is checked, and which physical or empirical procedures are not implemented.

## Software model

The model is a pure JavaScript state transition in `web/src/domain/rfModel.mjs`. `createInitialModel()` starts both radios at RF_CH 12 and 44, respectively, with a default channel range of 0–125, a 250 ms hop interval, and seed `0xA37E`. `stepModel()` returns a new state rather than mutating the prior state.

Each valid RF channel is an integer from 0 through 125. The displayed model frequency is `2400 + RF_CH` MHz, yielding the model range 2400–2525 MHz. This formula is part of the simulator contract; the app does not query or measure a radio.

The model implements three selection rules:

- **Sequential:** each radio advances one channel and wraps to the configured minimum after the maximum.
- **Seeded random:** a xorshift32 state generates two successive values, one for each radio. Each maps to an integer bucket over the inclusive configured range. The state and results are repeatable from a fixed seed.
- **Fixed offset:** Radio 1 advances sequentially. Radio 2 is selected by adding 32 to Radio 1's offset from the configured minimum, modulo the configured range length.

Each step increments both selected channels' visit counters, increments `steps`, and adds the configured hop interval to `elapsedMs`. This elapsed value is simulated time, not wall-clock measurement.

## Browser execution

The React interface sends controls to an in-memory store. While running, `useSimulationEngine.ts` schedules calls to the store with `window.setInterval`. The store invokes the pure model and notifies subscribed components, which render channel state and history. Browser scheduling can drift or pause; the app does not claim real-time behavior. State is not persisted to a server or connected to radio hardware.

## Hardware design method and boundary

Carrier R1 is an independent KiCad proposal for an ESP32 DevKitC V4 plus two nRF24 breakout sockets. Its schematic and two-layer board connect the modeled idea to a possible physical carrier, but the browser model does not drive that board. The firmware tree is legacy material and has not been reconciled or hardware-tested against R1.

The CAD method and recorded ERC/DRC checks are described in the [carrier README](../hardware/kicad/aether-carrier-r1/README.md). They do not constitute a fabrication, assembly, fit, electrical, RF, thermal, or compliance test.

## Verification method

From `web/`, `npm run verify` checks local Markdown file links and the repository punctuation rule, audits the locked npm dependency graph, runs Node's built-in model tests, and performs the TypeScript and Vite production build. The model suite exercises frequency mapping, invalid channel values and ranges, sequential wrap, custom-range entry, fixed offset, seeded repeatability, and visit counts. CI runs this same command after a clean lockfile install. These checks do not exercise radio hardware. A manual browser accessibility review is recorded separately and is not an automated cross-browser test. See the [validation record](testing-methodology.md), [traceability matrix](traceability.md), and [engineering evidence](engineering-evidence.md).

## Experimental method

No physical experiment has been run or reported in this repository. There is no RF acquisition path, instrument record, raw measurement dataset, or statistical analysis. The experiment folders are proposals. A future physical study should first define the question, device and firmware revisions, setup, variables, controls, repetitions, instruments and calibration, safety/regulatory review, raw-data format, analysis, and limitations. No result should be inferred from the deterministic browser output.
