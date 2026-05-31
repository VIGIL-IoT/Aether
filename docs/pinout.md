# ESP32 Pin Mapping and Connections

## Purpose

This document defines the GPIO pin assignments for Aether's dual-SPI architecture and provides connection diagrams for hardware assembly.

## ESP32 GPIO Assignments

### HSPI Bus (Radio #1)

| ESP32 Pin | Function | NRF24 Pin | Signal | Notes |
|-----------|----------|-----------|--------|-------|
| GPIO 14 | HSPI_SCK | 5 | Serial Clock | 16 MHz SPI clock |
| GPIO 12 | HSPI_MISO | 7 | Master In, Slave Out | Data from NRF24 to ESP32 |
| GPIO 13 | HSPI_MOSI | 6 | Master Out, Slave In | Data from ESP32 to NRF24 |
| GPIO 15 | HSPI_CSN | 4 | Chip Select (active low) | SPI device selection |
| GPIO 16 | HSPI_CE | 3 | Chip Enable | TX/RX mode control |

### VSPI Bus (Radio #2)

| ESP32 Pin | Function | NRF24 Pin | Signal | Notes |
|-----------|----------|-----------|--------|-------|
| GPIO 18 | VSPI_SCK | 5 | Serial Clock | 16 MHz SPI clock |
| GPIO 19 | VSPI_MISO | 7 | Master In, Slave Out | Data from NRF24 to ESP32 |
| GPIO 23 | VSPI_MOSI | 6 | Master Out, Slave In | Data from ESP32 to NRF24 |
| GPIO 21 | VSPI_CSN | 4 | Chip Select (active low) | SPI device selection |
| GPIO 22 | VSPI_CE | 3 | Chip Enable | TX/RX mode control |

### Power and Control

| ESP32 Pin | Function | Connection | Notes |
|-----------|----------|------------|-------|
| 3.3V | Power Supply | NRF24 VCC (both) | Regulated 3.3V output |
| GND | Ground | NRF24 GND (both) | Common ground |
| GPIO 33 | User Input | Toggle Switch | Internal pull-up enabled |
| GPIO 2 | Status LED | Power LED | Built-in LED (optional) |

### Reserved/Unused Pins

| ESP32 Pin | Status | Reason |
|-----------|--------|--------|
| GPIO 0 | Reserved | Boot mode selection |
| GPIO 1 | Reserved | UART0 TX (programming) |
| GPIO 3 | Reserved | UART0 RX (programming) |
| GPIO 6-11 | Reserved | Connected to SPI flash |

## NRF24L01+ Pin Configuration

### Standard NRF24L01+ Pinout

```
    ┌─────────────┐
    │  1  2  3  4 │  ← Top view
    │  5  6  7  8 │
    └─────────────┘

Pin 1: GND     (Ground)
Pin 2: VCC     (3.3V Power)
Pin 3: CE      (Chip Enable)
Pin 4: CSN     (Chip Select, active low)
Pin 5: SCK     (SPI Clock)
Pin 6: MOSI    (Master Out, Slave In)
Pin 7: MISO    (Master In, Slave Out)
Pin 8: IRQ     (Interrupt, not used)
```

### Connection Diagram

```
ESP32 HSPI          NRF24 #1
┌─────────────┐     ┌─────────────┐
│ GPIO 14 SCK │────▶│ Pin 5 SCK   │
│ GPIO 12 MISO│◀────│ Pin 7 MISO  │
│ GPIO 13 MOSI│────▶│ Pin 6 MOSI  │
│ GPIO 15 CSN │────▶│ Pin 4 CSN   │
│ GPIO 16 CE  │────▶│ Pin 3 CE    │
│ 3.3V        │────▶│ Pin 2 VCC   │
│ GND         │────▶│ Pin 1 GND   │
└─────────────┘     └─────────────┘

ESP32 VSPI          NRF24 #2
┌─────────────┐     ┌─────────────┐
│ GPIO 18 SCK │────▶│ Pin 5 SCK   │
│ GPIO 19 MISO│◀────│ Pin 7 MISO  │
│ GPIO 23 MOSI│────▶│ Pin 6 MOSI  │
│ GPIO 21 CSN │────▶│ Pin 4 CSN   │
│ GPIO 22 CE  │────▶│ Pin 3 CE    │
│ 3.3V        │────▶│ Pin 2 VCC   │
│ GND         │────▶│ Pin 1 GND   │
└─────────────┘     └─────────────┘
```

## Power Distribution

### Power Flow Diagram

```
18650 Battery (3.7V)
        │
        ▼
   Slide Switch
        │
        ▼
   TP4056 Module
        │
        ▼
  AMS1117-3.3 LDO
        │
        ▼ (3.3V Regulated)
        ├──────────────┬──────────────┬──────────────┐
        │              │              │              │
    ESP32 VIN    NRF24 #1 VCC   NRF24 #2 VCC   Power LED
                      │              │
                 100µF Cap      100µF Cap
```

### Critical Connections

1. **100µF Decoupling Capacitors**
   - **Location:** Directly at each NRF24 VCC pin
   - **Type:** Electrolytic, 16V minimum
   - **ESR:** <1Ω for best performance
   - **Lead length:** <2cm to minimize inductance

2. **Ground Plane**
   - All GND connections must be low-impedance
   - Use thick traces or ground plane on PCB
   - Star ground configuration preferred

## SPI Configuration

### Timing Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Clock Speed | 16 MHz | Increased from default 10 MHz |
| Clock Mode | SPI_MODE0 | CPOL=0, CPHA=0 |
| Bit Order | MSB First | Standard SPI convention |
| CS Polarity | Active Low | CSN pulled low to select device |

### Signal Integrity

**Trace Length Guidelines:**
- Keep SPI traces <10cm on breadboard
- Match trace lengths within 1cm
- Avoid running traces parallel to power lines
- Use ground plane on PCB designs

**Termination:**
- No termination required for <10cm traces
- 33Ω series resistors optional for EMI reduction

## Firmware Pin Definitions

### Arduino Code Constants

```cpp
// HSPI Bus (Radio #1)
#define HSPI_SCK  14
#define HSPI_MISO 12
#define HSPI_MOSI 13
#define HSPI_CSN  15
#define HSPI_CE   16

// VSPI Bus (Radio #2)
#define VSPI_SCK  18
#define VSPI_MISO 19
#define VSPI_MOSI 23
#define VSPI_CSN  21
#define VSPI_CE   22

// Control Pins
#define TOGGLE_SWITCH 33
#define STATUS_LED    2
```

### SPI Initialization

```cpp
// Initialize HSPI
SPIClass *hspi = new SPIClass(HSPI);
hspi->begin(HSPI_SCK, HSPI_MISO, HSPI_MOSI, HSPI_CSN);

// Initialize VSPI
SPIClass *vspi = new SPIClass(VSPI);
vspi->begin(VSPI_SCK, VSPI_MISO, VSPI_MOSI, VSPI_CSN);

// Initialize RF24 instances
RF24 radio1(HSPI_CE, HSPI_CSN, 16000000);  // 16 MHz SPI
RF24 radio2(VSPI_CE, VSPI_CSN, 16000000);  // 16 MHz SPI
```

## Troubleshooting

### Common Connection Issues

1. **SPI Communication Failure**
   - Check CSN and CE pin connections
   - Verify 3.3V power supply
   - Ensure 100µF capacitors are installed
   - Test with logic analyzer

2. **Intermittent Operation**
   - Usually indicates insufficient decoupling
   - Check capacitor ESR and placement
   - Verify ground connections

3. **One Radio Works, Other Doesn't**
   - Swap NRF24 modules to isolate hardware vs. wiring
   - Check for solder bridges on pins
   - Verify SPI bus initialization in firmware

### Debug Procedures

1. **Power Rail Check**
   ```
   Measure with multimeter:
   - Battery voltage: 3.0-4.2V
   - Regulated 3.3V: 3.15-3.45V
   - NRF24 VCC: 3.15-3.45V (both modules)
   ```

2. **SPI Signal Verification**
   ```
   Use logic analyzer to verify:
   - Clock signal present on SCK
   - Data transitions on MOSI/MISO
   - CSN pulses low during transactions
   - CE control signals
   ```

## Related Documents

- [Architecture](architecture.md) - System topology overview
- [Assembly Guide](assembly-guide.md) - Step-by-step hardware assembly
- [Power Budget](power-budget.md) - Current consumption analysis
- [BOM](../hardware/BOM.md) - Component specifications