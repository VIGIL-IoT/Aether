# Schematic design status

The current electrical design is [Aether-Carrier-R1.kicad_sch](../kicad/aether-carrier-r1/Aether-Carrier-R1.kicad_sch). Its project and matching PCB are in [hardware/kicad/aether-carrier-r1](../kicad/aether-carrier-r1/).

The file [Aether Iteration 1.1.kicad_sch](Aether%20Iteration%201.1.kicad_sch) is legacy material. It has not been reconciled with carrier R1 or verified as an implemented circuit. Do not rely on the previous prose in this folder for a battery charger, regulator, RF power, compliance, or assembly specification.

Carrier R1 uses the ESP32 DevKit's USB power input and 3V3 output; it adds sockets for two radio breakouts and local capacitors. See the current project's README for pin assignment and assumptions. The carrier has not been assembled or physically validated.
