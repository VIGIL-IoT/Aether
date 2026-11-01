# Carrier R1 pin map

This is the pin map in the current KiCad proposal. It describes board routing only; it is not a validated firmware configuration.

| Carrier socket | Bus label | nRF24 signal | ESP32 DevKitC V4 GPIO |
| --- | --- | --- | ---: |
| J2 | HSPI | SCK | 25 |
| J2 | HSPI | MOSI | 26 |
| J2 | HSPI | MISO | 35 |
| J2 | HSPI | CE | 32 |
| J2 | HSPI | CSN | 27 |
| J3 | VSPI | SCK | 18 |
| J3 | VSPI | MOSI | 23 |
| J3 | VSPI | MISO | 19 |
| J3 | VSPI | CE | 22 |
| J3 | VSPI | CSN | 21 |

The carrier's J1 socket assumes an ESP32-DevKitC V4 viewed from above with USB at the top, odd-numbered pins on the left and even-numbered pins on the right. See the carrier README and schematic for all connector details.

The radio sockets use this numbered header convention:

| nRF24 header pin | Signal |
| ---: | --- |
| 1 | GND |
| 2 | VCC (3V3) |
| 3 | CE |
| 4 | CSN |
| 5 | SCK |
| 6 | MOSI |
| 7 | MISO |
| 8 | IRQ, not connected |

Breakout vendors may change footprint orientation or labeling. Verify the exact module before mating it.

The older sketches use different pin assignments. No firmware configuration in this repository is verified against R1. Do not copy an older sketch pin map onto this board without a reviewed firmware update.
