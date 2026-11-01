# Project scope and requirements

## Identity and purpose

Aether is a learning-oriented software and hardware repository. Its implemented software demonstrates deterministic channel-selection logic for two model nRF24 radios. A separate KiCad proposal documents a carrier board for an ESP32 DevKitC V4 and two nRF24 breakout modules.

## Problem

Channel selection and hopping are easier to inspect when the state and sequence are visible. The browser model makes those state changes visible without requiring radio hardware. The current model does not attempt to answer empirical questions about spectrum occupancy, interference, propagation, packet delivery, or RF power.

## Users and use

The current target users are developers and learners who want to inspect the modeled channel-selection sequence. The KiCad project is for review of a proposed carrier layout by hardware developers; it is not a fabrication-ready or validated product.

## Objectives and measurable criteria

| ID | Objective | Evidence |
| --- | --- | --- |
| O-1 | Map each integer RF_CH value 0–125 to the model frequency 2400 + RF_CH MHz. | Automated model tests cover the endpoints and mapping. |
| O-2 | Provide sequential, seeded-random, and fixed-offset selection modes. | Automated tests cover advancement, configured-range wrap, fixed offset, and seeded repeatability. |
| O-3 | Show model selections and per-channel visit history in the browser. | Implemented in the React UI; browser-level behavior has not been automated. |
| O-4 | Keep simulation outputs distinct from physical RF measurements. | UI copy and project documentation state that no RF is transmitted or measured. |
| O-5 | Keep the carrier design reviewable with schematic/PCB checks and an explicit fit caveat. | KiCad ERC/DRC results are recorded in the carrier README; no physical validation exists. |

## Scope

Implemented:

- Browser rendering of two model radios and channel selection history.
- Deterministic sequential, fixed-offset, and seeded-random model modes.
- Local Node test suite for the pure model.
- KiCad schematic and two-layer board proposal for carrier R1.

Out of scope or not implemented:

- Radio control, RF transmission or reception from the web app.
- Packet or channel-occupancy simulation.
- Wi-Fi/Bluetooth traffic generation or detection.
- RSSI, power, temperature, battery, or range measurement.
- Validated embedded firmware, assembled device, or measured experiments.
- Regulatory review, certification, or production release.

## Success criteria

The software is successful for its current narrow purpose when the deterministic model remains within RF_CH 0–125, gives repeatable output for a fixed seed, updates visit counts consistently, and clearly labels all results as simulated. The carrier proposal is reviewable when the schematic/board checks pass and exact mating-part fit is verified before fabrication; that physical fit criterion remains open.

## Assumptions and constraints

- The web app is a standalone static site.
- The channel-frequency formula describes the model's mapping and is not a measurement.
- Hardware connector footprints assume the specific dimensions documented in the carrier README.
- No physical device or lab measurement evidence is currently included.
- Firmware provenance and licenses require a separate audit before release claims.
