# Hardware references

This file records manufacturer evidence relevant to the proposed Carrier R1. The BOM currently identifies board families and generic breakout modules, not procurement-ready manufacturer part numbers. References to chip specifications must not be treated as module-level validation.

| Component or interface | Exact MPN | Manufacturer | Reference and revision | Relevant constraints | Used in |
| --- | --- | --- | --- | --- | --- |
| ESP32 development board | Not specified; reference type is ESP32-DevKitC V4 | Espressif for the reference design | [User Guide](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32/esp32-devkitc/user_guide.html), [dimensions](https://dl.espressif.com/dl/schematics/esp32_devkitc_v4_dimensions.pdf), [schematic](https://dl.espressif.com/dl/schematics/esp32_devkitc_v4_sch.pdf); V4 | Reference board outline is 48.26 x 27.94 mm, with 2.54 mm pitch and 25.40 mm row spacing. Espressif describes mutually exclusive power input options. Clone dimensions and available 3V3 current are not established. | Carrier J1 socket, USB power path, pin map |
| nRF24L01+ radio IC | nRF24L01+ family; breakout MPN not specified | Nordic Semiconductor for the IC | [Product Specification](https://devzone.nordicsemi.com/cfs-file/__key/communityserver-discussions-components-files/4/nRF24L01P_5F00_PS_5F00_v1.0.pdf), revision 1.0 | IC supply range 1.9 to 3.6 V. Typical current includes 11.3 mA TX at 0 dBm and 13.5 mA RX at 2 Mbps. Datasheet decoupling guidance applies to the IC reference design. | Carrier J2 and J3 sockets, model terminology |
| nRF24 breakout modules | Not specified | Not specified | No module-specific datasheet or drawing is in the repository | The carrier assumes a conventional 2x4, 2.54 mm header and 3V3 supply. Breakouts can add regulators or PA/LNA stages and can change pin labels, current draw, outline, and orientation. | Carrier J2 and J3 mating parts |
| Local radio decoupling capacitors | Not specified | Not specified | Values in the R1 BOM and schematic only | C1/C3 are 10 uF 1206 and C2/C4 are 100 nF 0805. These are prototype design values, not measured power-integrity results or verified module-specific recommendations. | One pair beside each radio socket |
| Carrier board | Aether Carrier R1; PCB manufacturer not selected | Aether project design | KiCad project and BOM in `hardware/kicad/aether-carrier-r1/` | Two copper layers, 73.66 x 71.12 mm outline, project-local socket footprints. No fabrication release or exact mating-part fit check. | Carrier R1 proposal |

## Design constraints and evidence boundary

- The carrier is intended to receive power through the ESP32 DevKitC USB input. Do not treat its 3V3 rail as an independent input while the DevKit is powered through another mutually exclusive input option.
- The reference DevKitC drawing supports the nominal geometry for the V4 reference board. It does not guarantee that a clone or a particular header stack fits.
- Nordic chip current figures are not a valid current budget for an unspecified breakout. Confirm exact module identity and measure supply behavior before claiming sufficient margin.
- The BOM lacks manufacturer part numbers for the DevKitC, both radio modules, and passive components. It is not ready for purchasing or manufacturing.
- The design makes no claim of regulatory compliance, EMC margin, antenna performance, thermal margin, power integrity, or safe operation with legacy firmware.

The [research sources ledger](research-sources.md) contains source authority, access date, and further limitations. The carrier README contains the recorded KiCad CLI ERC/DRC and schematic-parity results. Those CAD checks do not demonstrate physical fit or operation.
