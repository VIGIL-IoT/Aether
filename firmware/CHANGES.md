# Firmware provenance and status

The source files under firmware/ are legacy sketches. They are not part of the browser simulator, have not been validated on physical hardware, and do not match the pin map in carrier R1.

Some source comments attribute code to the Ble-jammer repository. That attribution has not been independently verified against a known upstream revision. The former per-file change descriptions were empty placeholders and did not establish which changes were made. This repository does not claim a verified change history or complete firmware license audit.

Files present:

- firmware/esp32/custom_channel_hopping.ino
- firmware/esp32/dual_radio_hopping.ino
- firmware/esp32/hspi_single_radio.ino
- firmware/esp32/vspi_single_radio.ino
- firmware/nrf24/rf24_driver.cpp

Some sketches contain transmitter-capable or constant-carrier routines. They are not reviewed deployment firmware. Do not use them with carrier R1 without a separate code, pin-map, safety, and licensing review.

The repository-level license files have not been changed. Before redistributing firmware, verify the upstream source, exact revision, applicable notices, and license obligations.
