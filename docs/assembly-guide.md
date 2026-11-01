# Hardware assembly readiness

## Status

Aether does not currently have a validated assembly procedure. Carrier R1 is an unbuilt KiCad design proposal, not a tested kit. This page is a readiness checklist and must not be read as evidence that the hardware has been assembled.

The current carrier uses an ESP32 DevKitC V4 board and two nRF24 breakout modules as mating parts. It is powered through the DevKit's USB input; the carrier itself has no battery, charger, regulator, or USB connector.

## Before fabrication

1. Compare the exact development board and radio breakouts with the connector footprints and pin numbering in the [carrier README](../hardware/kicad/aether-carrier-r1/README.md).
2. Check board outline, header spacing, connector heights, USB access, component clearance, enclosure clearance, and underside clearance.
3. Review schematic/ERC and board/DRC outputs for the final revision.
4. Obtain a qualified hardware review of power, pin assignments, and the chosen mating modules.
5. Generate and inspect fabrication outputs only after the above review.
6. Record revision, supplier part numbers, and measured fit before calling the design buildable.

## Before powering an assembled board

- Verify the exact DevKit and breakout pinouts against their vendor documentation.
- Check for shorts and verify the 3V3/GND orientation with the board unpowered.
- Confirm the DevKit power-input configuration in its official documentation.
- Do not connect an external supply to the carrier 3V3 rail while the DevKit is powered through USB.
- Do not use the unvalidated legacy firmware as a first-power test.

Any future powered-radio validation requires a separate firmware review and an appropriately authorized test setup. This repository does not provide an operational RF test procedure.
