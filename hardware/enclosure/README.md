# Enclosure Design

## Purpose

This directory contains mechanical design files, 3D models, and fabrication instructions for Aether's protective enclosure and mounting systems.

## Design Overview

### Enclosure Philosophy

**Educational Accessibility:**
- Clear visibility of internal components for learning
- Easy assembly without specialized tools
- Modular design for different configurations
- Cost-effective materials and manufacturing

**Functional Requirements:**
- Protection from handling damage
- Access to programming and charging ports
- Antenna mounting and orientation
- Heat dissipation for continuous operation

**Aesthetic Goals:**
- Professional appearance for demonstrations
- Clean lines reflecting RF engineering precision
- Modular expansion capability
- Branding and labeling areas

## Enclosure Variants

### Variant 1: Open Frame (Development)

**Target Use:** Breadboard prototypes, development, debugging

```
┌─────────────────────────────────┐
│  ┌─────┐    ┌─────┐    ┌─────┐  │ ← Acrylic base plate
│  │ESP32│    │Power│    │NRF24│  │
│  └─────┘    └─────┘    └─────┘  │
└─────────────────────────────────┘
      ↑            ↑            ↑
   Standoffs   Battery     Antenna
              Holder      Mounts
```

**Features:**
- Transparent acrylic base (3mm thickness)
- Brass standoffs for component mounting
- No top cover (full access to components)
- Integrated antenna mounting posts

**Materials:**
- Base: Clear acrylic (PMMA), laser-cut
- Standoffs: M3 brass, 10mm height
- Fasteners: M3 × 6mm screws, stainless steel

**Cost:** ~$8 per unit (small quantities)

### Variant 2: Protective Case (Portable)

**Target Use:** Field experiments, classroom use, demonstrations

```
    ┌─────────────────────────────┐ ← Top cover (removable)
    │  ○ LED    USB○    ○ Switch │
    ├─────────────────────────────┤
    │ ┌─────┐  ┌─────┐  ┌─────┐  │ ← Internal components
    │ │ESP32│  │Power│  │NRF24│  │
    │ └─────┘  └─────┘  └─────┘  │
    └─────────────────────────────┘ ← Bottom case
         ↑        ↑        ↑
    Antenna   Battery   Antenna
    Connector  Access   Connector
```

**Features:**
- Two-piece clamshell design
- Snap-fit assembly (no screws required)
- Cutouts for all connectors and indicators
- Integrated antenna strain relief

**Materials:**
- Case: ABS plastic, 3D printed or injection molded
- Gasket: Silicone O-ring (optional weather sealing)
- Hardware: Captive screws for battery access

**Cost:** ~$15 per unit (3D printed), ~$5 per unit (injection molded, 1000+ qty)

### Variant 3: Laboratory Enclosure (Professional)

**Target Use:** Research installations, permanent setups, advanced users

```
┌───────────────────────────────────┐ ← Aluminum top plate
│ ┌─┐ ┌─┐  [OLED]  ┌─┐ ┌─┐ ┌─┐ ┌─┐ │ ← Status display
│ │A│ │B│  Status   │1│ │2│ │3│ │4│ │ ← Control buttons
├───────────────────────────────────┤
│                                   │ ← Internal volume
│  ┌─────────────────────────────┐  │
│  │        PCB Assembly         │  │ ← Custom PCB
│  └─────────────────────────────┘  │
│                                   │
└───────────────────────────────────┘ ← Aluminum base
    ↑     ↑     ↑     ↑     ↑
  Feet  Vent  Power  USB  Antenna
```

**Features:**
- Machined aluminum construction
- Integrated heat sinks and ventilation
- Professional connectors (SMA, USB-B)
- OLED status display and control buttons
- Rack-mount compatibility (optional)

**Materials:**
- Enclosure: 6061-T6 aluminum, CNC machined
- Gaskets: Silicone, IP54 rating
- Connectors: Professional grade (Amphenol, etc.)
- Display: 128×64 OLED with protective lens

**Cost:** ~$75 per unit (machined), ~$150 per unit (with display/controls)

## Mechanical Specifications

### Dimensional Requirements

#### PCB Clearances

| Dimension | Minimum | Preferred | Notes |
|-----------|---------|-----------|-------|
| **Height above PCB** | 15mm | 20mm | Component clearance |
| **Height below PCB** | 5mm | 8mm | Connector access |
| **Side clearance** | 3mm | 5mm | Assembly tolerance |
| **Antenna clearance** | 10mm | 15mm | RF performance |

#### Thermal Considerations

| Component | Heat Generation | Cooling Requirement |
|-----------|-----------------|-------------------|
| **ESP32** | 0.5W typical | Natural convection |
| **AMS1117** | 0.9W @ full load | Heat sink or ventilation |
| **NRF24L01+** | 0.1W @ max power | Natural convection |
| **Total** | 1.5W maximum | Forced air if continuous |

### Material Selection

#### Plastic Options

1. **ABS (Acrylonitrile Butadiene Styrene)**
   - **Pros:** Easy to 3D print, good impact resistance, paintable
   - **Cons:** UV degradation, moderate temperature range
   - **Use case:** Prototypes, indoor use, cost-sensitive applications

2. **PETG (Polyethylene Terephthalate Glycol)**
   - **Pros:** Chemical resistance, clarity, food-safe
   - **Cons:** More difficult to print, higher cost
   - **Use case:** Transparent cases, chemical environments

3. **Nylon (PA12)**
   - **Pros:** Excellent durability, chemical resistance, professional finish
   - **Cons:** Requires advanced 3D printer, higher cost
   - **Use case:** Professional applications, high-stress environments

#### Metal Options

1. **Aluminum 6061-T6**
   - **Pros:** Excellent heat dissipation, EMI shielding, professional appearance
   - **Cons:** Requires machining, higher cost, weight
   - **Use case:** Laboratory equipment, heat-sensitive applications

2. **Steel (Powder Coated)**
   - **Pros:** Maximum durability, EMI shielding, cost-effective for volume
   - **Cons:** Weight, corrosion potential, requires coating
   - **Use case:** Industrial applications, permanent installations

## Design Files and Manufacturing

### 3D Printing Specifications

#### Recommended Settings (ABS)

```
Layer Height: 0.2mm (balance of speed and quality)
Infill: 20% (adequate strength, material efficiency)
Perimeters: 3 (smooth surface finish)
Support: Minimal (design for printability)
Bed Temperature: 100°C (ABS adhesion)
Extruder Temperature: 240°C (ABS processing)
Print Speed: 50mm/s (quality over speed)
```

#### Post-Processing

1. **Support Removal**
   - Use dissolvable supports for complex geometries
   - Manual removal with flush cutters
   - Sand smooth with 220-grit sandpaper

2. **Surface Finishing**
   - Acetone vapor smoothing (ABS only)
   - Primer and paint for professional appearance
   - Clear coat for UV protection (outdoor use)

3. **Hardware Installation**
   - Heat-set inserts for threaded connections
   - Ultrasonic welding for permanent assembly
   - Adhesive bonding for non-removable joints

### CNC Machining Specifications

#### Aluminum Enclosure

**Material:** 6061-T6 Aluminum
**Finish:** Clear anodize (Type II, 0.0002" thickness)
**Tolerances:** ±0.005" general, ±0.002" critical dimensions

**Machining Operations:**
1. **Rough milling:** Remove bulk material
2. **Semi-finish:** Establish critical dimensions
3. **Finish milling:** Final surface quality
4. **Drilling/tapping:** Mounting holes and threads
5. **Deburring:** Remove sharp edges
6. **Anodizing:** Corrosion protection and appearance

### File Structure

```
hardware/enclosure/
├── 3d-models/
│   ├── aether-case-bottom.step    # Bottom case half
│   ├── aether-case-top.step       # Top case half
│   ├── aether-frame-base.step     # Open frame base
│   └── aether-lab-enclosure.step  # Professional enclosure
├── drawings/
│   ├── case-assembly.pdf          # Assembly instructions
│   ├── case-dimensions.pdf        # Critical dimensions
│   └── machining-notes.pdf        # Manufacturing notes
├── stl-files/                     # 3D printing files
│   ├── case-bottom-v1.0.stl
│   ├── case-top-v1.0.stl
│   └── frame-base-v1.0.stl
└── fabrication/
    ├── laser-cutting/             # 2D cutting files
    ├── cnc-programs/              # G-code for machining
    └── assembly-jigs/             # Manufacturing aids
```

## Assembly Instructions

### Open Frame Assembly

**Required Tools:**
- M3 hex key (2.5mm)
- Small Phillips screwdriver
- Anti-static wrist strap (recommended)

**Assembly Sequence:**
1. Install brass standoffs in acrylic base
2. Mount PCB to standoffs with M3 screws
3. Install battery holder and connect wiring
4. Mount antenna connectors to designated posts
5. Connect antennas and verify clearances

**Time Required:** 15 minutes

### Protective Case Assembly

**Required Tools:**
- Small Phillips screwdriver
- Plastic prying tools (optional)

**Assembly Sequence:**
1. Install PCB in bottom case half
2. Route cables through designated channels
3. Install battery in dedicated compartment
4. Verify all connectors align with case cutouts
5. Install top case half with snap-fit connections
6. Test all external connections and indicators

**Time Required:** 20 minutes

### Laboratory Enclosure Assembly

**Required Tools:**
- M3 and M4 hex keys
- Torque wrench (2-5 Nm range)
- Thermal compound (for heat sinks)

**Assembly Sequence:**
1. Install heat sinks on aluminum base with thermal compound
2. Mount PCB assembly to heat sinks
3. Connect all internal wiring and verify routing
4. Install OLED display and control buttons (if equipped)
5. Apply gasket to mating surfaces
6. Install top plate and torque fasteners to specification
7. Perform leak test (if weather sealing required)

**Time Required:** 45 minutes

## Thermal Management

### Heat Dissipation Analysis

#### Natural Convection (Plastic Enclosure)

**Assumptions:**
- Ambient temperature: 25°C
- Internal heat generation: 1.5W
- Enclosure volume: 200 cm³

**Calculations:**
```
Temperature rise = Power / (Thermal conductance)
ΔT = 1.5W / 0.02 W/°C = 75°C rise
Internal temperature = 25°C + 75°C = 100°C
```

**Conclusion:** Natural convection insufficient for continuous operation in plastic enclosure.

#### Forced Convection (Ventilation)

**Fan Specifications:**
- Size: 25mm × 25mm × 10mm
- Airflow: 5 CFM minimum
- Power: <0.5W (from 3.3V supply)
- Noise: <30 dB (quiet operation)

**Thermal Performance:**
```
With 5 CFM airflow:
ΔT = 1.5W / 0.1 W/°C = 15°C rise
Internal temperature = 25°C + 15°C = 40°C
```

**Conclusion:** Small fan enables continuous operation in plastic enclosure.

#### Aluminum Heat Sink

**Heat Sink Specifications:**
- Material: 6061-T6 aluminum
- Fin area: 50 cm² effective
- Thermal resistance: 5°C/W (natural convection)

**Thermal Performance:**
```
With aluminum heat sink:
ΔT = 1.5W × 5°C/W = 7.5°C rise
Internal temperature = 25°C + 7.5°C = 32.5°C
```

**Conclusion:** Aluminum enclosure with heat sink enables continuous operation without fan.

## Environmental Protection

### Ingress Protection (IP) Ratings

#### IP20 (Basic Protection)
- **Solid objects:** >12.5mm diameter
- **Liquids:** No protection
- **Use case:** Indoor laboratory use
- **Implementation:** Basic plastic case with loose-fitting joints

#### IP54 (Dust and Splash Protection)
- **Solid objects:** Dust protected (limited ingress)
- **Liquids:** Splash protection from any direction
- **Use case:** Field experiments, outdoor demonstrations
- **Implementation:** Gasket seals, sealed connectors

#### IP65 (Dust-tight and Jet Protection)
- **Solid objects:** Dust-tight (no ingress)
- **Liquids:** Water jets from any direction
- **Use case:** Permanent outdoor installations
- **Implementation:** O-ring seals, IP-rated connectors, pressure equalization

### Sealing Methods

1. **Compression Gaskets**
   - Material: Silicone rubber, Shore A 50-70
   - Groove design: 2mm wide × 1.5mm deep
   - Compression: 25-30% of gasket thickness

2. **O-Ring Seals**
   - Standard: AS568 (American Standard)
   - Material: Nitrile (NBR) for general use
   - Groove: Standard O-ring groove dimensions

3. **Ultrasonic Welding**
   - Permanent seal for non-serviceable units
   - Requires compatible thermoplastic materials
   - Professional equipment and expertise required

## Cost Analysis

### Manufacturing Costs (Per Unit)

| Enclosure Type | Material Cost | Labor Cost | Tooling Cost | Total Cost |
|----------------|---------------|------------|--------------|------------|
| **3D Printed ABS** | $3 | $2 | $0 | $5 |
| **Injection Molded** | $1 | $0.50 | $15,000 | $1.50* |
| **Machined Aluminum** | $25 | $35 | $500 | $60 |
| **Sheet Metal** | $8 | $12 | $2,000 | $20* |

*Amortized over 1000+ units

### Volume Pricing

| Quantity | 3D Printed | Injection Molded | Machined | Sheet Metal |
|----------|------------|------------------|----------|-------------|
| 1-10 | $5 | N/A | $60 | N/A |
| 10-100 | $4 | N/A | $45 | N/A |
| 100-1000 | $3 | $8 | $35 | $25 |
| 1000+ | $2.50 | $1.50 | $30 | $15 |

## Related Documents

- [PCB Design](../pcb/README.md) - PCB dimensions and mounting requirements
- [Assembly Guide](../../docs/assembly-guide.md) - Complete build instructions
- [Cost Analysis](../../docs/cost-analysis.md) - Economic considerations
- [Build Variants](../../docs/build-variants.md) - Different configuration options
