# Aether Carrier R1

A two-layer socket carrier for one ESP32-DevKitC V4 and two nRF24L01+ breakout modules. This is a KiCad design proposal; it has not been fabricated, assembled, or physically fit-checked.

## Files

- `Aether-Carrier-R1.kicad_pro` — KiCad project settings
- `Aether-Carrier-R1.kicad_sch` — electrical schematic
- `Aether-Carrier-R1.kicad_pcb` — routed carrier board
- `Aether.pretty/` — custom socket footprints
- `BOM.csv` — connector, passive, and mating-module list

Open the project with KiCad 10 or later. The custom footprints are loaded from the project-local `Aether.pretty` library.

## Electrical design

The carrier is powered through the ESP32 DevKit's own USB connector. The DevKit's 3V3 pin supplies both radio sockets. The carrier contains no battery, charger, USB connector, or voltage regulator. Do not power the carrier by applying an external supply to its 3V3 rail while the DevKit is connected to USB. Espressif documents the DevKitC V4 power-input options and their mutual-exclusion requirements in its [official guide](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32/esp32-devkitc/user_guide.html).

| Radio | Bus | SCK | MOSI | MISO | CE | CSN |
|---|---|---:|---:|---:|---:|---:|
| J2 | HSPI | GPIO25 | GPIO26 | GPIO35 | GPIO32 | GPIO27 |
| J3 | VSPI | GPIO18 | GPIO23 | GPIO19 | GPIO22 | GPIO21 |

J1 uses an ESP32-DevKitC V4 2×19 header viewed from above with USB at the top: odd-numbered pins are on the left and even-numbered pins are on the right. Unused DevKit pins have explicit no-connect markers. J1 pins 1, 2, 14, and 27 provide 3V3/GND connections as shown in the schematic.

J2 and J3 use the common numbered nRF24L01+ 2×4 module header:

| Pin | Signal | Pin | Signal |
|---:|---|---:|---|
| 1 | GND | 2 | VCC (3V3) |
| 3 | CE | 4 | CSN |
| 5 | SCK | 6 | MOSI |
| 7 | MISO | 8 | IRQ (NC) |

The socket footprints mark pin 1 with a square pad. Module and adapter vendors can change the board layout or labels; verify the specific mating module's pinout and orientation before inserting it or applying power. Pin 8 IRQ is intentionally unconnected because the carrier's current signal map does not use radio interrupts. The [RF24 library documentation](https://github.com/nRF24/RF24/blob/master/docs/main_page.md) lists the conventional module header signals.

C1/C3 are 10 µF 1206 capacitors and C2/C4 are 100 nF 0805 capacitors, one pair beside each radio socket. Their values and placement are design choices for this untested prototype, not measured power-integrity results.

## Board and fabrication notes

- Outline: 73.66 × 71.12 mm
- Two copper layers; bottom GND zone and local ground stitching
- Signal tracks: 0.30 mm; 3V3/GND tracks: 0.50 mm
- Plated vias: 0.60 mm pad / 0.30 mm drill
- Custom ESP32 socket assumes 2.54 mm pin pitch and 25.4 mm row spacing
- Radio sockets assume a 2×4, 2.54 mm male header

The ESP32 socket assumes a DevKitC V4-sized board and matching male headers. Clones can differ in header spacing, USB connector placement, and board outline. The 3D preview does not model the mating DevKit or radio modules. Check the exact parts, underside clearance, connector height, enclosure, and socket fit before ordering a board. No Gerbers, assembly drawings, or manufacturing outputs are included in this revision.

## Checks run

Using KiCad CLI 10.0.7:

```sh
kicad-cli sch erc --exit-code-violations --output erc.rpt Aether-Carrier-R1.kicad_sch
kicad-cli pcb drc --refill-zones --save-board --all-track-errors --schematic-parity --output drc.rpt Aether-Carrier-R1.kicad_pcb
```

The checked-in design reported 0 ERC violations, 0 PCB DRC violations, 0 unconnected items, and 0 schematic-parity issues. These checks cover KiCad's electrical/routing rules; they do not verify connector fit, thermal performance, signal integrity, radio behavior, or regulatory compliance.

## BOM

See [BOM.csv](BOM.csv). The mating development boards and radio breakouts are not fitted to the carrier PCB.
