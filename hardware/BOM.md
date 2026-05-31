# Bill of Materials (BOM)

## Core Components

| Component | Qty | Part Number | Role | Notes |
|-----------|-----|-------------|------|-------|
| ESP32-WROOM-32 | 1 | ESP32-WROOM-32 | Dual-core MCU, SPI master, application logic controller | 240 MHz, 520KB SRAM, dual SPI |
| NRF24L01+ | 2 | NRF24L01+ | Independent 2.4 GHz transceivers for simultaneous TX/RX operations | PA+LNA variant recommended |
| External antennas (RP-SMA) | 2 | 2.4GHz RP-SMA | Replaces onboard PCB trace antennas for improved range and directionality | 2 dBi gain typical |
| Decoupling capacitors | 2 | 100µF 16V | Bulk capacitance across NRF24 VCC/GND rails | **Mandatory for reliable operation** |
| TP4056 module | 1 | TP4056 | Li-ion charge controller with overcharge/overdischarge protection | 1A charge current |
| 3.7V Li-ion cell | 1 | 18650 | Primary power source | 2000-3500 mAh capacity |
| Slide switch | 1 | SS12D00G3 | Hard power cutoff for battery disconnect | SPDT, 3-pin |
| Power LED | 1 | 3mm LED | Current-limited supply rail indicator | Red, with 330Ω resistor |
| Custom PCB | 1 | - | 2-layer FR4 board integrating all components | See PCB design files |

## Power System

| Component | Qty | Part Number | Specifications | Purpose |
|-----------|-----|-------------|----------------|---------|
| AMS1117-3.3 | 1 | AMS1117-3.3 | 3.3V LDO regulator, 1A output | Main power regulation |
| Battery holder | 1 | 18650 holder | Single cell holder with solder tabs | Mechanical battery connection |
| Micro-USB connector | 1 | Micro-USB | Charging port | Integrated with TP4056 |

## Critical Design Notes

### 100µF Capacitors - Mandatory

The NRF24L01+ draws burst current spikes up to ~160mA during transmission events. Thin PCB traces and wire inductance create impedance that cannot respond instantaneously to these transients. Without bulk capacitance directly at the VCC pin, the supply voltage droops below the NRF24's minimum operating threshold, corrupting SPI transactions and causing transmission failures.

**Technical Details:**
- **Burst current:** ~160 mA peak during PA ramp-up
- **Duration:** Microseconds per transmission
- **Voltage droop:** Can exceed 300mV without decoupling
- **Minimum capacitance:** 100µF electrolytic
- **ESR requirement:** <1Ω
- **Placement:** Directly at NRF24 VCC pin, short leads

The 100µF capacitor acts as a local charge reservoir, absorbing the transient demand before it propagates back to the regulator. This is not optional - it is a hard requirement for reliable operation.

## Sourcing Information

### Recommended Suppliers
- **ESP32:** Espressif, Adafruit, SparkFun
- **NRF24L01+:** Nordic Semiconductor, various Chinese suppliers
- **Passive components:** Digikey, Mouser, LCSC
- **Battery:** Samsung, Panasonic, LG (avoid unknown brands)

### Cost Estimate (v1.0 Breadboard)
- ESP32 development board: $8-12
- 2× NRF24L01+ modules: $6-10
- Passive components: $5-8
- Battery and charging: $8-12
- **Total:** ~$30-40 USD

### Cost Estimate (v2.0 Custom PCB)
- PCB fabrication (5 pcs): $15-25
- Components (populated): $25-35
- **Total per unit:** ~$8-12 USD (in small quantities)

## Assembly Notes

1. **Solder NRF24 modules first** - easier access to pins
2. **Install decoupling capacitors immediately** - test SPI communication before proceeding
3. **Verify power rails** - 3.3V ±5% across all components
4. **Test with single radio** - before enabling dual-radio operation
5. **Antenna installation last** - avoid damage during assembly

## Related Documents

- [Assembly Guide](../docs/assembly-guide.md)
- [Power Budget Analysis](../docs/power-budget.md)
- [PCB Design](pcb/README.md)
- [Schematics](schematics/README.md)