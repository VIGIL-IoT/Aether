# Aether System Architecture

## Purpose

This document describes the hardware and firmware architecture of Aether, including the dual-SPI topology, power distribution, signal flow, and design rationale.

## System Overview

Aether uses a dual-radio architecture to enable simultaneous transmission and reception across independent 2.4 GHz channels. The ESP32 acts as the central controller, managing two NRF24L01+ transceivers via separate SPI buses.

```
┌────────────────────────────────────────────────────┐
│                     ESP32                          │
│  ┌──────────────┐              ┌──────────────┐    │
│  │   HSPI       │              │   VSPI       │    │
│  │  Master      │              │  Master      │    │
│  └──────┬───────┘              └──────┬───────┘    │
│         │                             │            │
└─────────┼─────────────────────────────┼────────────┘
          │                             │
          │                             │
    ┌─────▼──────┐               ┌──────▼─────┐
    │  NRF24 #1  │               │  NRF24 #2  │
    │  (HSPI)    │               │  (VSPI)    │
    │            │               │            │
    │  Ch 0-125  │               │  Ch 0-125  │
    └────────────┘               └────────────┘
```

## Hardware Topology

### Microcontroller: ESP32-WROOM-32

**Selection Rationale:**
- Dual-core Xtensa LX6 @ 240 MHz (sufficient for real-time RF control)
- Two independent hardware SPI controllers (HSPI and VSPI)
- 520 KB SRAM (adequate for packet buffering and telemetry)
- Integrated WiFi/BT (can be disabled to reduce interference)
- 3.3V I/O (direct interface with NRF24L01+)
- Mature Arduino ecosystem with RF24 library support

**Alternatives Considered:**
- STM32F4: Better real-time performance, but less community support for NRF24
- ESP8266: Single SPI bus, insufficient for dual-radio architecture
- Arduino Mega: 5V I/O requires level shifting, slower clock

### RF Transceivers: NRF24L01+

**Selection Rationale:**
- 2.4 GHz ISM band (globally unlicensed)
- 126 channels @ 1 MHz spacing (2.400-2.525 GHz)
- Configurable data rates: 250 kbps, 1 Mbps, 2 Mbps
- Configurable TX power: -18 dBm to +0 dBm (PA+LNA modules extend to +20 dBm)
- SPI interface (simple integration)
- Low cost (~$1-3 per module)
- Extensive documentation and community support

**Limitations Accepted:**
- No frequency hopping in hardware (must be implemented in firmware)
- Limited TX power compared to WiFi modules
- Susceptible to interference from WiFi/BT in same band

## Dual-SPI Architecture

### Why Dual SPI?

**Problem:** Single SPI bus with multiple devices requires time-division multiplexing. During radio A transmission, radio B cannot be accessed. This prevents true simultaneous operation.

**Solution:** ESP32 provides two independent hardware SPI controllers (HSPI and VSPI), each with dedicated MOSI/MISO/SCK lines. This eliminates bus contention and enables:
- Simultaneous TX on radio A and RX on radio B
- Independent channel sweeps on both radios
- Parallel packet transmission for interference studies

### Pin Assignments

**HSPI Bus (Radio #1):**
```
GPIO 14 → SCK  (Serial Clock)
GPIO 12 → MISO (Master In, Slave Out)
GPIO 13 → MOSI (Master Out, Slave In)
GPIO 15 → CSN  (Chip Select, active low)
GPIO 16 → CE   (Chip Enable, TX/RX control)
```

**VSPI Bus (Radio #2):**
```
GPIO 18 → SCK  (Serial Clock)
GPIO 19 → MISO (Master In, Slave Out)
GPIO 23 → MOSI (Master Out, Slave In)
GPIO 21 → CSN  (Chip Select, active low)
GPIO 22 → CE   (Chip Enable, TX/RX control)
```

**Shared Signals:**
```
3.3V → VCC (both radios)
GND  → GND (both radios)
```

### SPI Configuration

- **Clock Speed:** 16 MHz (increased from default 10 MHz for faster register access)
- **Mode:** SPI_MODE0 (CPOL=0, CPHA=0)
- **Bit Order:** MSB first
- **CS Polarity:** Active low

## Power Distribution

### Power Flow

```
┌──────────────┐
│  3.7V Li-ion │  (18650 cell, 2000-3500 mAh)
│   Battery    │
└──────┬───────┘
       │
       │ (slide switch for hard cutoff)
       │
┌──────▼───────┐
│   TP4056     │  (Li-ion charge controller)
│   Module     │  - Overcharge protection (4.2V)
│              │  - Overdischarge protection (2.5V)
│              │  - 1A charge current
└──────┬───────┘
       │
       │ 3.7V (battery voltage)
       │
┌──────▼───────┐
│  AMS1117-3.3 │  (3.3V LDO regulator)
│   or similar │  - 1A output current
│              │  - ~0.6V dropout
└──────┬───────┘
       │
       │ 3.3V (regulated)
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
   ┌───▼───┐     ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
   │ ESP32 │     │ NRF24#1 │    │ NRF24#2 │    │ Power   │
   │       │     │ + 100µF │    │ + 100µF │    │ LED     │
   └───────┘     └─────────┘    └─────────┘    └─────────┘
```

### Critical: Decoupling Capacitors

**Why 100µF is Mandatory:**

The NRF24L01+ datasheet specifies typical current draw:
- Standby: 26 µA
- RX mode: 13.5 mA
- TX mode @ 0 dBm: 11.3 mA
- **TX burst peak: ~160 mA** (during PA ramp-up)

The TX burst is a transient event lasting microseconds. PCB traces and wires have inductance (typically 10-20 nH/cm). When current changes rapidly (dI/dt), this inductance creates a voltage drop:

```
V = L × (dI/dt)
```

For a 10 cm trace with 15 nH/cm inductance:
```
L = 150 nH
dI/dt ≈ 160 mA / 1 µs = 160 A/s
V = 150 nH × 160 A/s = 24 mV
```

This seems small, but the NRF24 operates on a 3.3V rail with tight tolerances. Voltage droop below 1.9V causes SPI communication failures and corrupted register states.

**Solution:** Place a 100µF electrolytic capacitor directly at the NRF24 VCC pin. This acts as a local charge reservoir, supplying the burst current before the regulator can respond. The capacitor's ESR (equivalent series resistance) should be low (<1Ω).

**Measured Behavior:**
- Without capacitor: Random SPI timeouts, failed transmissions, radio resets
- With 100µF capacitor: Stable operation at 16 MHz SPI clock, reliable TX bursts

## Signal Flow

### Initialization Sequence

1. ESP32 boots, initializes serial console
2. Disable ESP32 WiFi and Bluetooth (reduces 2.4 GHz interference)
3. Initialize HSPI bus, configure GPIO pins
4. Initialize VSPI bus, configure GPIO pins
5. Send `NOP` command to both radios (verify SPI communication)
6. Configure radio #1 registers (channel, data rate, TX power, CRC, auto-ACK)
7. Configure radio #2 registers (independent settings)
8. Enter main control loop

### Transmission Flow (Single Radio)

1. Firmware sets channel via `setChannel(ch)` → writes to `RF_CH` register
2. Firmware writes payload to TX FIFO via SPI
3. Firmware pulses CE pin high (>10 µs) to initiate transmission
4. NRF24 PA ramps up, transmits packet
5. NRF24 sets TX_DS flag in STATUS register
6. Firmware reads STATUS register, clears flag
7. Repeat for next packet

### Constant Carrier Mode

For interference studies, Aether uses `startConstCarrier()` mode:
- Disables packet framing and CRC
- Transmits continuous unmodulated carrier
- Useful for measuring interference radius and channel occupancy
- **Warning:** Violates FCC Part 15 duty cycle limits if used outside shielded environment

## Firmware Architecture

### Layer Structure

```
┌─────────────────────────────────────────┐
│  Application Layer                      │
│  (channel hopping logic, experiment     │
│   control, telemetry)                   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  RF24 Library                           │
│  (register abstraction, SPI commands)   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  ESP32 Arduino SPI Library              │
│  (hardware SPI driver)                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  ESP-IDF SPI Driver                     │
│  (register-level hardware control)      │
└─────────────────────────────────────────┘
```

### Current Firmware Variants

See `firmware/esp32/README.md` for detailed descriptions of each sketch.

## Future Architecture Extensions

### Planned: Telemetry Layer

Add packet metadata collection:
- Timestamp (microseconds since boot)
- Channel number
- RSSI (if available via external LNA module)
- Packet count
- Error count

Store in circular buffer, export via serial or SD card.

### Planned: Mesh Protocol

Define Aether-specific packet format:
- Node ID (8 bits)
- Sequence number (16 bits)
- Payload type (4 bits)
- Payload (variable length)
- CRC-16

Enable multi-node experiments with synchronized channel hopping.

### Planned: OLED Display

Add 128x64 OLED via I2C:
- Current channel
- TX power level
- Packet count
- Battery voltage
- Experiment mode

## Performance Characteristics

### Measured Timing (v1.0 breadboard)

- SPI transaction time (single register write): ~10 µs @ 16 MHz
- Channel switch time: ~130 µs (includes SPI write + PLL settling)
- Maximum channel hop rate: ~7.7 kHz
- Dual-radio independent hop rate: ~15 kHz aggregate

### Power Consumption (estimated)

- ESP32 active (240 MHz, WiFi/BT off): ~80 mA
- NRF24 RX mode: 13.5 mA × 2 = 27 mA
- NRF24 TX mode @ 0 dBm: 11.3 mA × 2 = 22.6 mA
- Total (both radios RX): ~107 mA
- Battery life (2500 mAh cell): ~23 hours

### Range (line-of-sight, estimated)

- 0 dBm TX power: ~30 meters
- +20 dBm TX power (PA+LNA module): ~100 meters
- Actual range depends on antenna, environment, and interference

## References

- ESP32 Technical Reference Manual (Espressif Systems)
- NRF24L01+ Product Specification v1.0 (Nordic Semiconductor)
- RF24 Library Documentation (TMRh20)
- FCC Part 15 Rules for Unlicensed Devices

## Future Work

- Measure actual power consumption with multimeter
- Characterize channel switch timing with logic analyzer
- Validate SPI signal integrity at 16 MHz
- Test maximum sustainable packet rate
- Document PCB layout impact on RF performance
