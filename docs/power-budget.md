# Power design status

Carrier R1 has no battery system and no measured power budget. The design expects the ESP32 DevKitC V4 to receive power through its own USB connector and to provide 3V3 to the two radio sockets.

The carrier itself contains no battery, charger, regulator, power switch, or USB connector. Do not feed an external supply into the carrier 3V3 rail while the DevKit is powered over USB. Follow the exact DevKit revision's power-input guidance.

No current draw, regulator efficiency, battery runtime, radio transmit load, or thermal result has been measured for this project. Values in the older power-budget calculations were estimates based on an obsolete circuit description and are withdrawn.

A future budget requires selected module part numbers, an explicit operating state, manufacturer data, and measurements on the assembled hardware. See [carrier R1](../hardware/kicad/aether-carrier-r1/README.md) and [limitations](limitations.md).
