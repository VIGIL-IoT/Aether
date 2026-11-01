# RF terminology and model boundaries

## What this repository models

The browser app models an integer RF_CH value for two abstract radios and maps each value to a display frequency using:

    frequency in MHz = 2400 + RF_CH

The UI covers RF_CH 0–125. This mapping is used by the software model; it is not a spectrum measurement. The app does not model modulation, occupied bandwidth, packet timing, reception, collisions, propagation, interference, power, or coexistence.

Wi-Fi channels 1, 6, and 11 and Bluetooth LE advertising channel centres are drawn as static frequency references. They do not indicate activity at the user's location.

## Terms

- **Channel selection:** choosing an integer channel value in the model.
- **Hop:** a model step that changes the selected value.
- **Visit count:** number of model steps that selected a given value.
- **Reference marker:** a static frequency label included to help compare positions on the chart.

These terms describe the simulator only unless accompanied by independent hardware evidence.

## RF theory and future work

General radio theory can help motivate future educational content, but values such as measured range, wall attenuation, packet error, receiver sensitivity in a particular setup, or interference impact require sourced specifications or documented measurements. No such Aether measurement dataset is included.

The simulator must not be described as a spectrum analyzer, RF monitor, packet simulator, coexistence test, or measurement instrument. See [experiments](../experiments/README.md) for the status of proposed physical studies and [safety status](legal-and-safety.md) for the hardware/firmware boundary.
