# Security policy

## Project security state

The browser application is a static React/Vite site. It has no server-side API, account system, or project database. Its model state is local to the browser.

The repository also contains legacy ESP32/nRF24 firmware and an unbuilt carrier proposal. Some firmware files contain transmitter-capable code and have not been reviewed for deployment. Do not treat them as validated or safe.

## Reporting a concern

Report security issues through [GitHub's private vulnerability reporting for VIGIL-IoT/Aether](https://github.com/VIGIL-IoT/Aether/security/advisories/new). Include the affected file or commit and a concise impact description. Do not include secrets or personal data in a public issue.

No response-time commitment is currently established. If private reporting is unavailable, contact the maintainers through the repository's listed GitHub channels without publishing exploit details.

## Review scope and limitations

Relevant assets include the source code, static deployment, KiCad files, and legacy firmware. The static web application has no authentication boundary or backend. The firmware and physical hardware boundary is not validated. Dependency vulnerability status and firmware provenance have not been fully audited.

This policy does not claim a security certification or a completed threat assessment.
