# Build configurations

Only two current artifacts are described as builds, and neither is a validated RF device.

| Artifact | Current status | What it includes |
| --- | --- | --- |
| Browser simulator | Implemented | Static React/Vite app that models channel selection without RF |
| Carrier R1 | Unbuilt proposal | KiCad schematic and two-layer carrier for one ESP32 DevKitC V4 and two radio breakouts |
| Legacy firmware sketches | Unvalidated source | Older Arduino-style code, not reconciled with carrier R1 |

The former breadboard, battery-powered, professional PCB, single-radio, and high-power variants were not backed by verified designs, assemblies, prices, or performance measurements. They are withdrawn as supported build options.

For current software setup, see [setup-guide.md](setup-guide.md). For board assumptions and pre-fabrication checks, see the [carrier README](../hardware/kicad/aether-carrier-r1/README.md) and [assembly readiness](assembly-guide.md).
