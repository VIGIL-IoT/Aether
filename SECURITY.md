# Security and Ethical Use Policy

HopShift is an educational platform for studying wireless communication systems. This document outlines our responsible disclosure process, ethical use expectations, and legal compliance requirements.

---

## Responsible Disclosure

If you discover a security vulnerability in HopShift's firmware, hardware design, or documentation, please report it privately:

1. **Do not** open a public issue
2. Use GitHub's [private security advisory feature](https://github.com/[your-repo]/security/advisories/new)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will respond within 7 days and work with you to address the issue before public disclosure.

---

## Ethical Use Expectations

HopShift is designed for controlled laboratory experimentation and education. Users must:

- **Operate only in shielded or isolated environments** where RF emissions cannot interfere with live wireless infrastructure
- **Obtain explicit permission** before conducting experiments in shared spaces
- **Comply with all applicable RF regulations** in their jurisdiction (see Legal Compliance below)
- **Never deploy HopShift** near airports, hospitals, emergency services, or other critical infrastructure
- **Respect spectrum sharing norms** — the 2.4 GHz ISM band is shared by billions of devices

### Prohibited Uses

HopShift must **never** be used to:

- Disrupt, degrade, or deny wireless services without authorization
- Interfere with commercial, public, or private wireless networks
- Violate spectrum regulations or exceed permitted power levels
- Conduct surveillance or intercept communications without consent
- Circumvent access controls or authentication mechanisms

---

## Legal Compliance

### United States (FCC Part 15)

- Unlicensed operation in the 2.4 GHz ISM band is permitted under Part 15.247
- Devices must accept interference and must not cause harmful interference
- Intentional interference with licensed services is a federal crime (47 U.S.C. § 333)
- Maximum EIRP: 1W (30 dBm) for frequency-hopping systems

### European Union (ETSI EN 300 328)

- Harmonized standard for 2.4 GHz wideband transmission systems
- Adaptive frequency agility or listen-before-talk required for some power levels
- Maximum EIRP: 100mW (20 dBm) for non-adaptive systems

### Australia (ACMA)

- Governed by Radiocommunications (Low Interference Potential Devices) Class Licence 2015
- Maximum EIRP: 100mW (20 dBm) in 2.4–2.4835 GHz band

### Other Jurisdictions

Consult your local spectrum authority:
- **Canada:** ISED RSS-247
- **Japan:** ARIB STD-T66
- **China:** SRRC regulations

**General principle:** If you are unsure whether your use case is legal, assume it is not and seek expert guidance.

---

## Reporting Misuse

If you become aware of HopShift being used for unlawful interference or malicious purposes:

1. **Do not engage directly** with the individual
2. Report to the appropriate spectrum authority:
   - **US:** FCC Enforcement Bureau (https://consumercomplaints.fcc.gov)
   - **EU:** National regulatory authority in the affected country
   - **Other:** Consult local telecommunications regulator
3. Notify the HopShift maintainers via security advisory (see above)

We take misuse seriously and will cooperate with authorities investigating unlawful activity.

---

## Developer Responsibilities

If you modify HopShift's firmware or hardware:

- **Do not increase transmit power** beyond NRF24L01+ datasheet limits (0 dBm max)
- **Do not remove safety checks** (channel limits, duty cycle restrictions)
- **Document any changes** that affect RF behavior
- **Test in a shielded enclosure** before operating in open air

---

## Disclaimer

The HopShift project and its contributors are not responsible for:

- Unlawful use of the platform by third parties
- Regulatory violations resulting from user modifications
- Interference caused by improper operation or assembly
- Legal consequences of non-compliant experimentation

**You are solely responsible for ensuring your use of HopShift complies with applicable laws.**

---

## Contact

For security reports: Use GitHub's private security advisory feature

For legal or ethical questions: Open a public discussion issue (do not include details of ongoing violations)

For general questions: See [CONTRIBUTING.md](CONTRIBUTING.md)
