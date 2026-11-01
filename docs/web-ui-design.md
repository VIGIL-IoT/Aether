# Web simulator design record

## Screen question

How do two nRF24 radios move across the RF_CH channel range as they hop?

## Design direction

The Taste app-screen direction selected was `data-terminal` (seed `1866165593`): a dark research screen, restrained data marks, and flat panels. The Aether identity keeps its deep navy ground with cyan and mint radio marks; amber and pale slate distinguish Wi-Fi and BLE reference markers. The frequency position plot and 126-channel visit history are the screen's defining objects.

## Data and limits

All displayed channel values come from the deterministic model in `web/src/domain/rfModel.mjs`. The app distinguishes modelled selections from measured RF activity. It does not claim packet delivery, signal strength, occupied bandwidth, energy detection, or regulatory compliance.

## Review

The Taste source lint reported no banned patterns. Its browser inspector reviewed 1440 px, 768 px, and 390 px viewports with no findings and no page-level horizontal overflow. The frequency plot and history have their own horizontal scroll areas on narrow screens. Model tests cover channel mapping, wraparound, offset behavior, reproducibility, and visit totals.
