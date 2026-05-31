# Power Budget Analysis

## Purpose

This document analyzes Aether's power consumption characteristics, battery life estimates, and optimization strategies for extended operation.

## Power System Overview

### Power Flow Architecture

```
18650 Li-ion (3.7V nominal, 2500mAh typical)
        │
        ▼
   Slide Switch (mechanical disconnect)
        │
        ▼
   TP4056 Charge Controller
        │
        ▼
   AMS1117-3.3 LDO Regulator (3.3V, 1A max)
        │
        ▼ (3.3V regulated)
        ├──────────────┬──────────────┬──────────────┐
        │              │              │              │
    ESP32-WROOM    NRF24 #1      NRF24 #2      Status LED
     (80-240MHz)   (2.4GHz TX)   (2.4GHz RX)    (3mA)
```

### Voltage Regulation Efficiency

| Input Voltage | Output Voltage | Efficiency | Quiescent Current |
|---------------|----------------|------------|-------------------|
| 4.2V (full)   | 3.3V          | 78.6%      | 5mA              |
| 3.7V (nominal)| 3.3V          | 89.2%      | 5mA              |
| 3.0V (empty)  | 3.3V          | N/A        | Dropout          |

**Dropout Voltage:** AMS1117-3.3 requires minimum 4.5V input for regulation. Below this threshold, output voltage follows input voltage minus dropout (~1.2V).

## Component Power Consumption

### ESP32-WROOM-32

| Operating Mode | CPU Frequency | Current Draw | Power (3.3V) | Notes |
|----------------|---------------|--------------|--------------|-------|
| Active (dual-core) | 240 MHz | 160-260 mA | 528-858 mW | Both cores active, WiFi/BT disabled |
| Active (single-core) | 240 MHz | 80-120 mA | 264-396 mW | One core active |
| Active (reduced) | 80 MHz | 40-60 mA | 132-198 mW | Power-optimized frequency |
| Light sleep | - | 0.8-1.2 mA | 2.6-4.0 mW | RAM retained, peripherals off |
| Deep sleep | - | 10-150 µA | 0.03-0.5 mW | RTC only, wake on GPIO/timer |

**Aether Configuration:** Single-core operation at 80 MHz for power optimization while maintaining adequate SPI performance.

### NRF24L01+ Transceivers

| Operating Mode | Current Draw | Power (3.3V) | Duration | Notes |
|----------------|--------------|--------------|----------|-------|
| Power Down | 0.9 µA | 3.0 µW | Continuous | Lowest power state |
| Standby-I | 26 µA | 86 µW | Continuous | Crystal oscillator on |
| Standby-II | 320 µA | 1.1 mW | Continuous | PLL active, fast startup |
| RX Mode | 13.5 mA | 44.6 mW | Continuous | Receiving packets |
| TX Mode (-18 dBm) | 7 mA | 23.1 mW | Per packet | Minimum power transmission |
| TX Mode (0 dBm) | 11.5 mA | 38.0 mW | Per packet | Default power level |
| TX Mode (+7 dBm) | 20 mA | 66.0 mW | Per packet | Maximum power with PA |

**Peak Current Spikes:** During PA ramp-up, current can spike to 160 mA for microseconds. This is why 100µF decoupling capacitors are mandatory.

### Auxiliary Components

| Component | Current Draw | Power (3.3V) | Notes |
|-----------|--------------|--------------|-------|
| Status LED | 3 mA | 9.9 mW | With 330Ω current limiting resistor |
| TP4056 (standby) | 50 µA | - | Quiescent current when not charging |
| AMS1117-3.3 | 5 mA | - | Regulator quiescent current |

## Operating Scenarios

### Scenario 1: Continuous Dual-Radio Operation

**Configuration:**
- ESP32: 80 MHz, single core
- Radio #1: Continuous TX at 0 dBm, 1 packet/second
- Radio #2: Continuous RX mode
- Status LED: On

**Current Calculation:**
```
ESP32 (80 MHz):           50 mA
NRF24 #1 (TX standby):    0.32 mA
NRF24 #1 (TX burst):      11.5 mA × 1ms × 1Hz = 0.0115 mA average
NRF24 #2 (RX mode):       13.5 mA
Status LED:               3 mA
Regulator quiescent:      5 mA
Total:                    72.8 mA
```

**Battery Life (2500mAh):**
- Theoretical: 2500mAh ÷ 72.8mA = 34.3 hours
- Practical (80% efficiency): 27.4 hours

### Scenario 2: Intermittent Operation

**Configuration:**
- ESP32: 80 MHz, 10% duty cycle (sleep between measurements)
- Radios: 1-second burst every 10 seconds
- Status LED: Off

**Current Calculation:**
```
Active period (1 second every 10 seconds):
ESP32 active:             50 mA × 0.1 = 5 mA average
NRF24 operation:          25 mA × 0.1 = 2.5 mA average
Sleep period (9 seconds every 10 seconds):
ESP32 light sleep:        1 mA × 0.9 = 0.9 mA average
NRF24 power down:         0.001 mA × 0.9 = 0.0009 mA average
Regulator quiescent:      5 mA
Total:                    13.4 mA
```

**Battery Life (2500mAh):**
- Theoretical: 2500mAh ÷ 13.4mA = 186.6 hours (7.8 days)
- Practical (80% efficiency): 149.3 hours (6.2 days)

### Scenario 3: Deep Sleep with Periodic Wake

**Configuration:**
- ESP32: Deep sleep, wake every 5 minutes for 10-second measurement
- Radios: Power down between measurements

**Current Calculation:**
```
Active period (10 seconds every 300 seconds):
ESP32 + radios:           75 mA × (10/300) = 2.5 mA average
Sleep period (290 seconds every 300 seconds):
ESP32 deep sleep:         0.1 mA × (290/300) = 0.097 mA average
NRF24 power down:         0.001 mA × (290/300) = 0.001 mA average
Regulator quiescent:      5 mA
Total:                    7.6 mA
```

**Battery Life (2500mAh):**
- Theoretical: 2500mAh ÷ 7.6mA = 329 hours (13.7 days)
- Practical (80% efficiency): 263 hours (11.0 days)

## Power Optimization Strategies

### Software Optimizations

1. **CPU Frequency Scaling**
   ```cpp
   // Reduce CPU frequency for power savings
   setCpuFrequencyMhz(80);  // Down from 240 MHz default
   ```

2. **Sleep Mode Implementation**
   ```cpp
   // Light sleep between measurements
   esp_sleep_enable_timer_wakeup(1000000);  // 1 second
   esp_light_sleep_start();
   
   // Deep sleep for long intervals
   esp_sleep_enable_timer_wakeup(300000000);  // 5 minutes
   esp_deep_sleep_start();
   ```

3. **Radio Power Management**
   ```cpp
   // Power down radios when not in use
   radio1.powerDown();
   radio2.powerDown();
   
   // Use minimum necessary TX power
   radio1.setPALevel(RF24_PA_LOW);  // -18 dBm instead of +7 dBm
   ```

### Hardware Optimizations

1. **Component Selection**
   - Use low-dropout regulator (LDO) with lower quiescent current
   - Consider switching regulator for better efficiency at high currents
   - Select NRF24L01+ modules with verified low sleep current

2. **Power Switching**
   - Add MOSFET switches to completely disconnect unused components
   - Implement software-controlled power domains
   - Use load switches for auxiliary components

3. **Battery Optimization**
   - Use higher capacity cells (3500mAh 18650s available)
   - Consider parallel battery configuration for extended operation
   - Implement battery voltage monitoring for low-battery warnings

## Battery Life Monitoring

### Voltage-Based Estimation

| Battery Voltage | Charge Level | Estimated Remaining |
|-----------------|--------------|-------------------|
| 4.2V | 100% | Full capacity |
| 4.0V | 85% | 85% of calculated life |
| 3.8V | 65% | 65% of calculated life |
| 3.6V | 40% | 40% of calculated life |
| 3.4V | 20% | 20% of calculated life |
| 3.2V | 5% | Critical - recharge soon |
| 3.0V | 0% | Empty - immediate recharge |

### Implementation

```cpp
// Battery voltage monitoring
float batteryVoltage = analogRead(A0) * (3.3 / 4095.0) * 2.0;  // Voltage divider
int batteryPercent = map(batteryVoltage * 100, 300, 420, 0, 100);

// Low battery warning
if (batteryPercent < 20) {
    // Reduce transmission power
    radio1.setPALevel(RF24_PA_LOW);
    radio2.setPALevel(RF24_PA_LOW);
    
    // Increase sleep intervals
    sleepInterval *= 2;
}
```

## Thermal Considerations

### Heat Generation Sources

1. **Voltage Regulator**
   - Power dissipation: (Vin - Vout) × Iout
   - At 4.2V input, 100mA load: (4.2 - 3.3) × 0.1 = 90mW
   - Requires adequate thermal relief on PCB

2. **ESP32 Module**
   - Primarily from CPU activity
   - Minimal at 80 MHz operation
   - Consider heat sink for continuous high-power operation

3. **NRF24L01+ PA Stage**
   - Significant heat at +7 dBm output power
   - Duty cycle limitations may apply
   - Monitor module temperature during extended transmission

### Thermal Management

- Ensure adequate copper area for heat spreading
- Use thermal vias to connect top and bottom copper layers
- Consider forced air cooling for continuous high-power operation
- Monitor component temperatures during testing

## Related Documents

- [Assembly Guide](assembly-guide.md) - Hardware assembly and power connections
- [Pin Mapping](pinout.md) - Power distribution connections
- [BOM](../hardware/BOM.md) - Component specifications and power ratings
- [Architecture](architecture.md) - System power flow overview