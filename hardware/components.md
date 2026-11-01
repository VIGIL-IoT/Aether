# Hardware components and assumptions

Carrier R1 is a socket carrier design, not a complete assembled device. Its current parts list is [BOM.csv](kicad/aether-carrier-r1/BOM.csv).

The design expects:

- One ESP32-DevKitC V4 development board with a 2×19 header arrangement documented in the carrier README.
- Two nRF24L01+ breakout modules using the standard numbered 2×4 header, subject to verification against the exact modules selected.
- Two 10 µF 1206 capacitors and two 100 nF 0805 capacitors on the carrier.
- Two copper layers and a 73.66 × 71.12 mm board outline.

No battery, battery holder, charger, regulator, USB connector, antenna connector, display, switch, enclosure fastener, or priced production part is included in R1. Verify exact manufacturer documentation and mechanical dimensions before fabrication.
