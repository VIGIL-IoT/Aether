# Build Variants

## Purpose

This document describes different Aether hardware configurations optimized for specific use cases, skill levels, and budget constraints.

## Variant Overview

| Variant | Target User | Complexity | Cost | Build Time | Key Features |
|---------|-------------|------------|------|------------|--------------|
| **Breadboard Basic** | Beginners | Low | $35 | 2 hours | No soldering, easy modification |
| **Breadboard Advanced** | Students | Medium | $50 | 3 hours | Full features, external antennas |
| **PCB Standard** | Makers | Medium | $40 | 4 hours | Compact, reliable, portable |
| **PCB Professional** | Researchers | High | $65 | 6 hours | Optimized performance, test points |
| **Single Radio** | Budget builds | Low | $25 | 1.5 hours | Simplified, cost-optimized |
| **High Power** | Range testing | High | $75 | 5 hours | External PA, advanced cooling |

## Detailed Variant Specifications

### Variant 1: Breadboard Basic

**Target Audience:** First-time builders, classroom demonstrations, concept validation

**Key Features:**
- Single NRF24L01+ module for simplicity
- ESP32 development board (no custom PCB)
- Basic power system (USB powered)
- Onboard PCB trace antenna
- Minimal component count

**Component List:**
```
ESP32 Dev Board (1)           $8.50
NRF24L01+ Module (1)          $4.25
100µF Capacitor (1)           $0.25
Breadboard                    $3.00
Jumper Wires                  $5.00
Total:                        $21.00
```

**Advantages:**
- Lowest cost entry point
- No soldering required
- Quick assembly (30 minutes)
- Easy to modify and experiment

**Limitations:**
- USB power only (not portable)
- Single radio (no simultaneous TX/RX)
- Limited range with PCB antenna
- Less reliable breadboard connections

**Firmware:** `hspi_single_radio.ino`

### Variant 2: Breadboard Advanced

**Target Audience:** RF engineering students, hobbyists, educational labs

**Key Features:**
- Dual NRF24L01+ modules (full Aether capability)
- Battery power with charging circuit
- External RP-SMA antennas
- Status LED and power switch
- Complete feature set on breadboard

**Component List:**
```
ESP32 Dev Board (1)           $8.50
NRF24L01+ Module (2)          $8.50
18650 Battery + Holder        $7.50
TP4056 Charge Module          $2.50
100µF Capacitor (2)           $0.50
RP-SMA Antenna (2)            $7.00
Breadboard + Components       $8.00
Total:                        $42.50
```

**Advantages:**
- Full Aether functionality
- Portable battery operation
- External antennas for better range
- Educational value (visible connections)

**Limitations:**
- Larger physical footprint
- Breadboard reliability issues
- More complex wiring

**Firmware:** `dual_radio_hopping.ino`

### Variant 3: PCB Standard

**Target Audience:** Makers, permanent installations, portable applications

**Key Features:**
- Custom 2-layer PCB design
- Integrated ESP32 module (not dev board)
- Optimized component placement
- Compact form factor (50mm × 75mm)
- Professional appearance

**Component List:**
```
Custom PCB                    $5.00
ESP32-WROOM-32 Module         $3.50
NRF24L01+ Module (2)          $7.50
Power System Components       $4.00
Passive Components            $2.00
Connectors & Mechanical       $6.00
18650 Battery                 $6.00
RP-SMA Antennas (2)           $7.00
Total:                        $41.00
```

**Advantages:**
- Reliable solder connections
- Compact and portable
- Professional appearance
- Good signal integrity

**Limitations:**
- Requires PCB fabrication
- SMD soldering skills needed
- Less flexible for modifications

**Assembly Time:** 3-4 hours (experienced builder)

### Variant 4: PCB Professional

**Target Audience:** Research labs, advanced users, performance-critical applications

**Key Features:**
- 4-layer PCB with controlled impedance
- Test points for all critical signals
- Enhanced power distribution
- RF shielding considerations
- Optional external PA interface

**Component List:**
```
4-Layer PCB                   $12.00
ESP32-WROOM-32 Module         $3.50
NRF24L01+ Module (2)          $7.50
Enhanced Power System         $8.00
Test Points & Connectors      $5.00
RF Components                 $3.00
Mechanical Components         $8.00
18650 Battery                 $6.00
High-Gain Antennas (2)        $12.00
Total:                        $65.00
```

**Advantages:**
- Optimized RF performance
- Comprehensive test access
- Research-grade reliability
- Expansion capabilities

**Limitations:**
- Higher cost and complexity
- Requires advanced assembly skills
- Longer build time

**Special Features:**
- SMA test connectors for spectrum analyzer
- GPIO breakout for custom sensors
- External PA/LNA interface
- Temperature monitoring

### Variant 5: Single Radio (Budget)

**Target Audience:** Cost-sensitive applications, basic RF learning

**Key Features:**
- Single NRF24L01+ module
- Simplified firmware
- Reduced component count
- Educational focus on SPI communication

**Component List:**
```
ESP32 Dev Board               $8.50
NRF24L01+ Module (1)          $4.25
Basic Power Components        $3.00
Minimal Passive Components    $1.25
Breadboard & Wires           $8.00
Total:                        $25.00
```

**Applications:**
- SPI communication learning
- Basic RF concepts
- Protocol analysis (receive-only)
- Range testing (transmit-only)

**Firmware Modifications:**
- Remove dual-SPI initialization
- Simplified channel hopping
- Focus on single-radio operations

### Variant 6: High Power (Range Testing)

**Target Audience:** Range testing, outdoor experiments, research applications

**Key Features:**
- External power amplifier (PA)
- Enhanced cooling system
- High-gain directional antennas
- Power monitoring and control
- Extended battery capacity

**Component List:**
```
PCB Professional Base         $65.00
External PA Module            $25.00
Directional Antennas (2)      $30.00
Cooling System                $8.00
Extended Battery Pack         $15.00
Power Monitoring              $5.00
Total:                        $148.00
```

**Performance Specifications:**
- TX Power: Up to +20 dBm (100mW)
- Range: 1-2 km line-of-sight
- Antenna Gain: 8-12 dBi
- Battery Life: 4-6 hours continuous

**Safety Considerations:**
- Requires RF exposure calculations
- May need regulatory approval
- Proper heat management essential
- Antenna safety distances

## Configuration Matrix

### Feature Comparison

| Feature | Basic | Advanced | PCB Std | PCB Pro | Single | High Power |
|---------|-------|----------|---------|---------|--------|------------|
| **Dual Radio** | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Battery Power** | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **External Antennas** | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Portable** | ❌ | ⚠️ | ✅ | ✅ | ❌ | ⚠️ |
| **Test Points** | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| **RF Shielding** | ❌ | ❌ | ⚠️ | ✅ | ❌ | ✅ |
| **Expansion** | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |

**Legend:** ✅ Yes | ❌ No | ⚠️ Limited

### Performance Comparison

| Metric | Basic | Advanced | PCB Std | PCB Pro | Single | High Power |
|--------|-------|----------|---------|---------|--------|------------|
| **Range (indoor)** | 10m | 50m | 75m | 100m | 15m | 500m |
| **Range (outdoor)** | 25m | 150m | 200m | 300m | 50m | 2000m |
| **Battery Life** | N/A | 8h | 12h | 10h | N/A | 4h |
| **Assembly Time** | 0.5h | 3h | 4h | 6h | 1h | 8h |
| **Skill Level** | Beginner | Intermediate | Intermediate | Advanced | Beginner | Expert |

## Selection Guidelines

### Choose Breadboard Basic if:
- First time working with RF
- Classroom demonstration needed
- Budget under $25
- No soldering capability
- Quick proof-of-concept required

### Choose Breadboard Advanced if:
- Learning dual-radio concepts
- Need portable operation
- Want full Aether functionality
- Comfortable with breadboard wiring
- Educational environment

### Choose PCB Standard if:
- Building permanent installation
- Need reliable portable operation
- Have basic SMD soldering skills
- Want professional appearance
- Budget around $40-50

### Choose PCB Professional if:
- Research or commercial application
- Need measurement test points
- Require maximum performance
- Have advanced assembly skills
- Budget allows premium features

### Choose Single Radio if:
- Extremely cost-sensitive
- Learning SPI communication
- Simple RF experiments only
- Minimal feature requirements

### Choose High Power if:
- Long-range testing required
- Outdoor propagation studies
- Research-grade performance needed
- RF safety compliance possible
- Expert-level assembly skills

## Customization Options

### Antenna Variations

1. **PCB Trace Antennas**
   - Cost: $0 (integrated)
   - Performance: Basic (2 dBi gain)
   - Use case: Indoor, short range

2. **Whip Antennas**
   - Cost: $3 each
   - Performance: Good (3-5 dBi gain)
   - Use case: General purpose, portable

3. **Directional Antennas**
   - Cost: $15 each
   - Performance: Excellent (8-12 dBi gain)
   - Use case: Point-to-point, range testing

### Power Options

1. **USB Power Only**
   - Cost: $0 (use existing supply)
   - Portability: Tethered operation
   - Use case: Bench testing, classroom

2. **Single 18650 Cell**
   - Cost: $6-8
   - Runtime: 8-12 hours
   - Use case: Standard portable operation

3. **Dual 18650 Parallel**
   - Cost: $15-20
   - Runtime: 16-24 hours
   - Use case: Extended field operation

4. **External Power Bank**
   - Cost: $20-30
   - Runtime: 24+ hours
   - Use case: Long-term monitoring

### Enclosure Options

1. **Open PCB**
   - Cost: $0
   - Protection: None
   - Use case: Lab bench, development

2. **3D Printed Case**
   - Cost: $5-10 (material)
   - Protection: Basic
   - Use case: Portable, educational

3. **Professional Enclosure**
   - Cost: $15-25
   - Protection: IP54 rated
   - Use case: Field deployment, weather resistance

## Migration Paths

### Breadboard to PCB
1. Validate functionality on breadboard
2. Order PCB and components
3. Transfer firmware (minimal changes)
4. Assemble PCB version
5. Compare performance

### Standard to Professional
1. Identify performance limitations
2. Design 4-layer PCB upgrade
3. Add test points and monitoring
4. Enhanced firmware features
5. Comprehensive testing

### Single to Dual Radio
1. Understand single-radio limitations
2. Add second NRF24L01+ module
3. Implement dual-SPI firmware
4. Test simultaneous operation
5. Develop dual-radio experiments

## Related Documents

- [Assembly Guide](assembly-guide.md) - Build instructions for each variant
- [Cost Analysis](cost-analysis.md) - Detailed cost breakdowns
- [BOM](../hardware/BOM.md) - Component specifications
- [PCB Design](../hardware/pcb/README.md) - PCB layout considerations