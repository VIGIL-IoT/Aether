# Cost Analysis

## Purpose

This document provides detailed cost breakdowns for different Aether build configurations, sourcing strategies, and cost optimization approaches.

## Build Configuration Costs

### Configuration 1: Breadboard Prototype

**Target Use:** Learning, experimentation, proof-of-concept

| Component | Quantity | Unit Cost | Total Cost | Supplier | Notes |
|-----------|----------|-----------|------------|----------|-------|
| ESP32-WROOM-32 Dev Board | 1 | $8.50 | $8.50 | Adafruit, SparkFun | Includes USB, regulator, headers |
| NRF24L01+ Module (PA+LNA) | 2 | $4.25 | $8.50 | AliExpress, Amazon | Verify PA+LNA variant |
| 18650 Li-ion Battery | 1 | $6.00 | $6.00 | Samsung, Panasonic | Avoid unknown brands |
| TP4056 Charge Module | 1 | $2.50 | $2.50 | Generic suppliers | USB-C variant preferred |
| 100µF Electrolytic Capacitor | 2 | $0.25 | $0.50 | Digikey, Mouser | 16V minimum rating |
| Breadboard (830 points) | 1 | $3.00 | $3.00 | Generic suppliers | Half-size adequate |
| Jumper Wire Kit | 1 | $5.00 | $5.00 | Generic suppliers | Male-to-male, various lengths |
| RP-SMA Antenna (2.4GHz) | 2 | $3.50 | $7.00 | Generic suppliers | 2-5 dBi gain typical |
| Slide Switch (SPDT) | 1 | $0.75 | $0.75 | Digikey, Mouser | Through-hole mounting |
| Status LED + Resistor | 1 | $0.50 | $0.50 | Generic suppliers | 3mm red LED, 330Ω resistor |
| **Subtotal** | | | **$42.25** | | |
| Shipping (estimated) | | | $8.00 | | Varies by supplier |
| **Total** | | | **$50.25** | | |

**Cost per Unit (10 units):** ~$45 (shipping amortized)

### Configuration 2: Custom PCB (Small Batch)

**Target Use:** Permanent installation, portable operation, improved reliability

| Component | Quantity | Unit Cost | Total Cost | Supplier | Notes |
|-----------|----------|-----------|------------|----------|-------|
| Custom PCB (5 pcs minimum) | 1 | $5.00 | $5.00 | JLCPCB, PCBWay | 2-layer, 1.6mm FR4 |
| ESP32-WROOM-32 Module | 1 | $3.50 | $3.50 | Digikey, Mouser | Surface mount, no dev board |
| NRF24L01+ Module | 2 | $3.75 | $7.50 | Digikey, Mouser | Verified authentic parts |
| AMS1117-3.3 Regulator | 1 | $0.45 | $0.45 | LCSC, Digikey | SOT-223 package |
| 100µF Capacitor (SMD) | 2 | $0.35 | $0.70 | LCSC, Digikey | Tantalum or ceramic |
| Passive Components (R, C) | 10 | $0.05 | $0.50 | LCSC, Digikey | 0603 package |
| RP-SMA Connector | 2 | $1.25 | $2.50 | Digikey, Mouser | PCB mount, 50Ω |
| 18650 Battery Holder | 1 | $1.50 | $1.50 | Generic suppliers | PCB mount with tabs |
| Micro-USB Connector | 1 | $0.75 | $0.75 | LCSC, Digikey | Through-hole or SMD |
| Slide Switch (SMD) | 1 | $0.85 | $0.85 | Digikey, Mouser | Low-profile package |
| **Subtotal (PCB populated)** | | | **$22.75** | | |
| 18650 Battery | 1 | $6.00 | $6.00 | Samsung, Panasonic | Same as breadboard version |
| RP-SMA Antennas | 2 | $3.50 | $7.00 | Generic suppliers | Same as breadboard version |
| **Total per Unit** | | | **$35.75** | | |

**Cost per Unit (25 units):** ~$28 (PCB cost amortized, volume discounts)

### Configuration 3: Production Ready (100+ units)

**Target Use:** Educational kits, research lab deployment, commercial applications

| Component Category | Cost per Unit | Notes |
|-------------------|---------------|-------|
| PCB (4-layer, optimized) | $3.50 | Improved signal integrity, smaller size |
| Components (volume pricing) | $18.00 | 30-40% discount on electronic components |
| Mechanical (battery, antennas) | $9.50 | Bulk purchasing, direct from manufacturers |
| Assembly (automated) | $4.00 | Pick-and-place, reflow, testing |
| **Manufacturing Cost** | **$35.00** | |
| Testing and QA | $2.00 | Automated test fixtures |
| Packaging | $1.50 | Anti-static bags, documentation |
| **Total Cost** | **$38.50** | |

**Retail Price Estimate:** $75-95 (100% markup typical for educational products)

## Cost Optimization Strategies

### Component Selection

1. **ESP32 Variants**
   - ESP32-WROOM-32: Standard choice, good availability
   - ESP32-C3: Lower cost, single core, adequate for Aether
   - ESP32-S2: No Bluetooth, slightly lower cost
   - **Recommendation:** Stick with WROOM-32 for compatibility

2. **NRF24L01+ Sources**
   - **Authentic Nordic:** $3.75 each, guaranteed specifications
   - **Chinese clones:** $1.50 each, variable quality
   - **Recommendation:** Use authentic for production, clones acceptable for learning

3. **Passive Components**
   - **Brand name (Murata, TDK):** Higher cost, guaranteed performance
   - **Generic (LCSC house brand):** 50-70% cost reduction, adequate performance
   - **Recommendation:** Generic for non-critical components

### Sourcing Strategies

1. **Single Supplier (Digikey/Mouser)**
   - **Advantages:** Reliable supply, authentic parts, fast shipping
   - **Disadvantages:** Higher cost, limited volume discounts
   - **Best for:** Prototypes, small quantities (<10 units)

2. **Mixed Sourcing**
   - **Critical components:** Digikey/Mouser (ESP32, NRF24, regulators)
   - **Passive components:** LCSC/JLCPCB (resistors, capacitors)
   - **Mechanical:** AliExpress/Amazon (batteries, antennas, switches)
   - **Best for:** Medium quantities (10-50 units)

3. **Direct from Manufacturers**
   - **Advantages:** Lowest cost, guaranteed authenticity
   - **Disadvantages:** High minimum quantities, long lead times
   - **Best for:** Large quantities (100+ units)

### Volume Pricing Analysis

| Quantity | Cost per Unit | Total Cost | Cost Reduction |
|----------|---------------|------------|----------------|
| 1 unit | $50.25 | $50.25 | Baseline |
| 5 units | $45.00 | $225.00 | 10% |
| 10 units | $42.00 | $420.00 | 16% |
| 25 units | $35.75 | $893.75 | 29% |
| 50 units | $32.50 | $1,625.00 | 35% |
| 100 units | $28.00 | $2,800.00 | 44% |

**Break-even Analysis:**
- Custom PCB becomes cost-effective at 5+ units
- Volume component pricing significant at 25+ units
- Direct manufacturer sourcing viable at 100+ units

## Regional Cost Variations

### North America (USD)
- **Component costs:** Baseline (100%)
- **Shipping:** $5-15 for small quantities
- **Lead times:** 1-3 days (Digikey/Mouser), 1-2 weeks (China)

### Europe (EUR)
- **Component costs:** 110-120% of US prices
- **VAT:** 19-25% additional on imports
- **Shipping:** €8-20 for small quantities
- **Recommendation:** Source from European distributors (Farnell, RS)

### Asia-Pacific
- **Component costs:** 80-90% of US prices (local sourcing)
- **Shipping:** Minimal for China-sourced components
- **Lead times:** 1-3 days local, 1-2 weeks international
- **Recommendation:** Leverage local manufacturing ecosystem

## Educational Pricing Models

### Individual Student Kit
- **Target Price:** $40-50
- **Includes:** All components, basic documentation
- **Margin:** 25-30% for sustainability
- **Volume:** 50-200 units per semester

### Classroom Set (20 units)
- **Target Price:** $35 per unit ($700 total)
- **Includes:** Bulk packaging, instructor materials
- **Margin:** 20-25% (volume discount passed to customer)
- **Support:** Technical support, replacement parts

### Research Lab License
- **Target Price:** $25 per unit (minimum 50 units)
- **Includes:** PCB design files, firmware source
- **Margin:** 15-20% (cost-plus model)
- **Support:** Design consultation, customization services

## Cost Reduction Opportunities

### Design Optimizations

1. **Single-Radio Version**
   - Remove one NRF24L01+ module and associated components
   - Cost reduction: ~$8 per unit
   - Trade-off: Limited to sequential TX/RX operation

2. **Integrated Antenna Design**
   - Use PCB trace antennas instead of external connectors
   - Cost reduction: ~$10 per unit
   - Trade-off: Fixed radiation pattern, lower performance

3. **Simplified Power System**
   - Remove charging circuit, use external power supply
   - Cost reduction: ~$3 per unit
   - Trade-off: Less portable, requires external adapter

### Manufacturing Optimizations

1. **Panel Assembly**
   - Design PCB panels for efficient manufacturing
   - Reduce assembly time and handling costs
   - Cost reduction: 10-15% at volume

2. **Component Standardization**
   - Use common component values across design
   - Leverage volume pricing for fewer unique parts
   - Cost reduction: 5-10% through purchasing power

3. **Test Automation**
   - Develop automated test fixtures
   - Reduce manual testing time and errors
   - Cost reduction: Significant at 100+ units

## Return on Investment Analysis

### Educational Institution

**Initial Investment:** $2,000 (40 student kits)
**Annual Costs:** $500 (replacement parts, updates)
**Benefits:**
- Enhanced RF engineering curriculum
- Hands-on learning experiences
- Student project capabilities
- Research publication opportunities

**ROI Timeline:** 2-3 years through improved program reputation and student outcomes

### Research Laboratory

**Initial Investment:** $1,500 (50 research units)
**Annual Costs:** $300 (maintenance, upgrades)
**Benefits:**
- Rapid prototyping capability
- Protocol research platform
- Student training tool
- Publication and grant opportunities

**ROI Timeline:** 1-2 years through research productivity gains

## Related Documents

- [BOM](../hardware/BOM.md) - Detailed component specifications
- [Build Variants](build-variants.md) - Different configuration options
- [Assembly Guide](assembly-guide.md) - Build complexity and time estimates
- [Roadmap](roadmap.md) - Future cost reduction opportunities