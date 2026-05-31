# Schematics

## Purpose

This directory contains circuit schematics, component selection rationale, and electrical design documentation for the Aether RF platform.

## Schematic Overview

### System Architecture

The Aether schematic is organized into functional blocks that reflect the dual-radio architecture:

```
Power Management → ESP32 Controller → Dual SPI Interface → NRF24L01+ Radios
       ↓                ↓                    ↓                    ↓
   Battery System    GPIO Control      HSPI/VSPI Buses      RF Front-End
```

### Schematic Hierarchy

1. **Power Supply Block**
   - Battery management and charging
   - Voltage regulation and distribution
   - Power switching and monitoring

2. **Microcontroller Block**
   - ESP32-WROOM-32 module
   - Programming interface
   - GPIO assignments and pull-ups

3. **Radio Interface Block**
   - Dual SPI bus configuration
   - NRF24L01+ module connections
   - RF signal routing

4. **User Interface Block**
   - Status indicators
   - Control switches
   - Debug interfaces

## Detailed Circuit Analysis

### Power Supply Circuit

#### Battery Management

```
18650 Li-ion Cell (3.7V, 2500mAh)
    │
    ├─ Slide Switch (SPDT, power disconnect)
    │
    └─ TP4056 Charge Controller
        ├─ USB-C Input (5V charging)
        ├─ Charge Status LEDs
        └─ Battery Protection (OVP, UVP, OCP)
```

**Component Selection:**
- **TP4056:** Industry-standard Li-ion charge controller
  - Constant current/constant voltage charging
  - 1A maximum charge current
  - Thermal regulation and safety timer
  - Status indication (charging/complete)

- **18650 Cell:** High-capacity, reliable power source
  - Nominal voltage: 3.7V
  - Capacity: 2000-3500mAh typical
  - Discharge rate: 2C continuous (safe for Aether)
  - Protection: Built-in or external PCB recommended

#### Voltage Regulation

```
TP4056 Output (3.0-4.2V variable)
    │
    └─ AMS1117-3.3 LDO Regulator
        ├─ Input Capacitor (10µF)
        ├─ Output Capacitor (22µF)
        └─ 3.3V Regulated Output
            ├─ ESP32 VIN
            ├─ NRF24 #1 VCC
            ├─ NRF24 #2 VCC
            └─ Status LED
```

**Design Rationale:**
- **AMS1117-3.3:** Low-cost, adequate performance LDO
  - Output voltage: 3.3V ±2%
  - Maximum current: 1A (sufficient for Aether)
  - Dropout voltage: 1.2V (requires 4.5V minimum input)
  - Thermal shutdown and current limiting

- **Input/Output Capacitors:** Stability and transient response
  - Input: 10µF tantalum (low ESR for stability)
  - Output: 22µF ceramic (fast transient response)
  - Additional 100µF at NRF24 modules for current spikes

### ESP32 Controller Circuit

#### Module Configuration

```
ESP32-WROOM-32 Module
├─ Power Supply (3.3V)
├─ Programming Interface
│   ├─ UART0 (GPIO1/GPIO3)
│   ├─ Boot Mode (GPIO0)
│   └─ Reset (EN pin)
├─ SPI Interfaces
│   ├─ HSPI Bus (GPIO 12,13,14,15,16)
│   └─ VSPI Bus (GPIO 18,19,21,22,23)
└─ User GPIO
    ├─ Status LED (GPIO2)
    └─ User Switch (GPIO33)
```

**Pin Assignment Strategy:**
- **HSPI/VSPI:** Hardware SPI controllers for maximum performance
- **Boot pins:** Accessible for programming and debug
- **User GPIO:** Available pins for expansion and control
- **Power pins:** Proper decoupling and power distribution

#### Programming Interface

```
USB-to-Serial Converter (External)
    ├─ DTR → GPIO0 (Boot mode selection)
    ├─ RTS → EN (Reset control)
    ├─ TXD → GPIO3 (UART RX)
    └─ RXD → GPIO1 (UART TX)
```

**Auto-Programming Circuit:**
- Capacitive coupling for DTR/RTS signals
- Automatic boot mode selection during programming
- Manual reset and boot buttons for debug

### Dual Radio Interface

#### HSPI Bus (Radio #1)

```
ESP32 HSPI Controller
├─ GPIO14 (HSPI_SCK) → NRF24 #1 Pin 5 (SCK)
├─ GPIO12 (HSPI_MISO) ← NRF24 #1 Pin 7 (MISO)
├─ GPIO13 (HSPI_MOSI) → NRF24 #1 Pin 6 (MOSI)
├─ GPIO15 (HSPI_CSN) → NRF24 #1 Pin 4 (CSN)
└─ GPIO16 (HSPI_CE) → NRF24 #1 Pin 3 (CE)
```

#### VSPI Bus (Radio #2)

```
ESP32 VSPI Controller
├─ GPIO18 (VSPI_SCK) → NRF24 #2 Pin 5 (SCK)
├─ GPIO19 (VSPI_MISO) ← NRF24 #2 Pin 7 (MISO)
├─ GPIO23 (VSPI_MOSI) → NRF24 #2 Pin 6 (MOSI)
├─ GPIO21 (VSPI_CSN) → NRF24 #2 Pin 4 (CSN)
└─ GPIO22 (VSPI_CE) → NRF24 #2 Pin 3 (CE)
```

**Signal Integrity Considerations:**
- **Trace impedance:** 50Ω controlled impedance for SPI signals
- **Length matching:** Clock and data traces matched within 2mm
- **Termination:** Series termination resistors (33Ω) for EMI reduction
- **Isolation:** Separate ground returns for each SPI bus

### NRF24L01+ Radio Circuits

#### Power Supply Decoupling

```
3.3V Rail
    │
    ├─ 100µF Electrolytic Capacitor (bulk storage)
    ├─ 10µF Ceramic Capacitor (medium frequency)
    └─ 0.1µF Ceramic Capacitor (high frequency)
        │
        └─ NRF24L01+ VCC Pin
```

**Decoupling Strategy:**
- **100µF Electrolytic:** Handles transmission current spikes (160mA)
- **10µF Ceramic:** Medium frequency noise filtering
- **0.1µF Ceramic:** High frequency decoupling (standard practice)
- **Placement:** All capacitors within 5mm of VCC pin

#### RF Interface

```
NRF24L01+ Module
├─ Internal PA/LNA
├─ Balun and Matching Network
└─ Antenna Connection
    ├─ PCB Trace Antenna (basic)
    └─ RP-SMA Connector (external antenna)
```

**Antenna Selection:**
- **PCB Trace:** 2.4GHz meandered monopole, 2dBi gain
- **External RP-SMA:** Removable antennas, 2-5dBi gain
- **Impedance:** 50Ω throughout RF path
- **Connector:** RP-SMA female (antenna has male connector)

## Component Selection Rationale

### Critical Components

#### ESP32-WROOM-32 Module

**Selection Criteria:**
- **Dual SPI controllers:** Essential for simultaneous radio operation
- **Processing power:** 240MHz dual-core sufficient for real-time RF
- **Memory:** 520KB SRAM adequate for packet buffering
- **Ecosystem:** Mature Arduino/ESP-IDF support
- **Cost:** Reasonable for educational applications

**Alternatives Considered:**
- ESP32-C3: Single core, lower cost, adequate for basic applications
- ESP32-S2: No Bluetooth, slightly lower cost
- STM32F4: More complex development, higher cost

#### NRF24L01+ Transceiver

**Selection Criteria:**
- **Frequency range:** 2.400-2.525 GHz (full ISM band)
- **Data rates:** 250kbps, 1Mbps, 2Mbps (educational flexibility)
- **Power levels:** -18 to +7 dBm (range testing capability)
- **SPI interface:** Simple integration with ESP32
- **Cost:** Very low cost for educational use

**Alternatives Considered:**
- ESP32 built-in WiFi: More complex, limited educational value
- CC2500: Similar performance, less common, higher cost
- RFM69: Different frequency band, more complex protocol

#### Power Management ICs

**AMS1117-3.3 LDO Regulator:**
- **Pros:** Low cost, simple implementation, adequate performance
- **Cons:** Poor efficiency, heat generation, dropout voltage
- **Alternatives:** Switching regulators (higher cost, complexity)

**TP4056 Charge Controller:**
- **Pros:** Industry standard, integrated protection, status LEDs
- **Cons:** Fixed 1A charge rate, basic feature set
- **Alternatives:** BQ24xxx series (higher cost, more features)

### Passive Components

#### Capacitors

| Value | Type | Purpose | Placement |
|-------|------|---------|-----------|
| 100µF | Electrolytic | NRF24 current spike storage | At each NRF24 VCC |
| 22µF | Ceramic | Regulator output filtering | At AMS1117 output |
| 10µF | Tantalum | Regulator input filtering | At AMS1117 input |
| 0.1µF | Ceramic | High-frequency decoupling | At each IC VCC |

#### Resistors

| Value | Purpose | Location |
|-------|---------|----------|
| 330Ω | LED current limiting | Status LED circuit |
| 10kΩ | Pull-up resistors | GPIO0, EN pins |
| 33Ω | Series termination | SPI signal lines (optional) |

## Signal Integrity Analysis

### SPI Bus Performance

#### Timing Requirements

| Parameter | NRF24L01+ Spec | ESP32 Capability | Design Margin |
|-----------|----------------|------------------|---------------|
| **Clock Frequency** | 10 MHz max | 80 MHz max | 8× margin |
| **Setup Time** | 2ns min | 5ns typical | 2.5× margin |
| **Hold Time** | 2ns min | 5ns typical | 2.5× margin |
| **CSN Pulse Width** | 50ns min | 125ns @ 8MHz | 2.5× margin |

#### Trace Impedance

For 2-layer PCB with standard stackup:
- **Target impedance:** 50Ω ±10%
- **Trace width:** 0.15mm (6 mil)
- **Trace spacing:** 0.3mm (12 mil) minimum
- **Via impedance:** Minimize via count on critical signals

### Power Distribution Network

#### Current Requirements

| Component | Idle Current | Peak Current | Duration |
|-----------|--------------|--------------|----------|
| ESP32 | 50mA | 200mA | Continuous |
| NRF24 #1 | 26µA | 20mA | 1ms bursts |
| NRF24 #2 | 26µA | 20mA | 1ms bursts |
| **Total** | **50mA** | **240mA** | **Mixed** |

#### Power Supply Impedance

Target impedance from battery to load:
- **DC resistance:** <100mΩ (minimize I²R losses)
- **AC impedance:** <10mΩ @ 1MHz (transient response)
- **Bulk capacitance:** 100µF minimum at each NRF24
- **ESR:** <1Ω for electrolytic capacitors

## Design Verification

### Simulation Results

#### Power Supply Stability

- **Load regulation:** <2% from no-load to full-load
- **Line regulation:** <1% over battery voltage range
- **Transient response:** <50mV overshoot for 100mA step
- **Ripple:** <10mV RMS at full load

#### Signal Integrity

- **SPI eye diagrams:** Clean transitions, adequate margins
- **Crosstalk:** <5% between adjacent SPI signals
- **EMI:** Compliant with FCC Part 15 Class B limits
- **Ground bounce:** <100mV during switching events

### Test Points and Debug Features

#### Critical Test Points

| Designator | Signal | Purpose |
|------------|--------|---------|
| TP1 | VBAT | Battery voltage monitoring |
| TP2 | 3V3 | Regulated voltage verification |
| TP3 | HSPI_SCK | HSPI bus activity |
| TP4 | VSPI_SCK | VSPI bus activity |
| TP5 | NRF1_VCC | Radio #1 power supply |
| TP6 | NRF2_VCC | Radio #2 power supply |

#### Debug Headers

- **UART:** Programming and debug console
- **JTAG:** Advanced debugging (optional)
- **GPIO:** Expansion connector for sensors/actuators

## Compliance and Safety

### Regulatory Considerations

#### FCC Part 15 (USA)

- **Frequency range:** 2.400-2.483.5 GHz (ISM band)
- **Power limit:** 1W EIRP maximum (30 dBm)
- **Aether compliance:** <100mW EIRP (20 dBm) typical
- **Antenna gain:** 2-5 dBi typical (within limits)

#### ETSI EN 300 328 (Europe)

- **Frequency range:** 2.400-2.4835 GHz
- **Power limit:** 100mW EIRP maximum (20 dBm)
- **Duty cycle:** No restrictions for <10mW average
- **Aether compliance:** Typically <10mW average power

### Safety Features

#### Electrical Safety

- **Overcurrent protection:** TP4056 charge controller
- **Overvoltage protection:** Built into charge controller
- **Thermal protection:** AMS1117 thermal shutdown
- **ESD protection:** TVS diodes on exposed connectors

#### RF Safety

- **Power limits:** Software-configurable, default to safe levels
- **Antenna restrictions:** Designed for specific antenna types
- **Exposure calculations:** SAR compliance for handheld use
- **User guidelines:** Clear documentation of safe operation

## Related Documents

- [PCB Design](../pcb/README.md) - Physical layout and routing
- [BOM](../BOM.md) - Component specifications and sourcing
- [Pin Mapping](../../docs/pinout.md) - Signal assignments and connections
- [Assembly Guide](../../docs/assembly-guide.md) - Build instructions and testing
