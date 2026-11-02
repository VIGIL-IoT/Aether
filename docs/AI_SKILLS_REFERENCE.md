# AI skills and specialized tool reference

**Inventory date:** 2026-11-02

This registry records skills and repositories referenced by the supplied master prompt. External repositories were not installed into Aether. A referenced skill is not evidence that it was invoked. Public repository endpoints were checked where possible; names that could not be verified are left without an invented URL.

## Spatial visualization, frontend, and diagrams

### Anatomy

- **Repository:** [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy)
- **Purpose and domain:** Interactive isometric technical figures, especially useful when physical or spatial relationships improve understanding.
- **Trigger and avoid:** Consider for hardware assemblies or physical workflows. Avoid when exact geometry and component identity are unknown or when it would suggest an unbuilt system is operational.
- **Installation and invocation:** The prompt supplies `npx skills add wheresryan22/anatomy -g -a codex` and `$anatomy` invocation.
- **Availability and use:** The local Anatomy skill is available. It was evaluated for this project but not invoked to generate a figure.
- **Artifacts and validation:** No Anatomy artifact. The carrier is unbuilt, radio breakout dimensions and MPNs are unspecified, and existing 2D diagrams already show the system boundary. An illustrative assembly could imply unverified fit.

### Taste Skill

- **Repository:** [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
- **Purpose and domain:** Art direction and frontend quality for public-facing web pages and application screens.
- **Trigger and avoid:** Use when designing or reviewing the simulator UI. Avoid applying marketing-page patterns that reduce clarity in an interactive model.
- **Installation and invocation:** No repository installation command is recorded here. The local Codex skill is `design-taste-frontend`.
- **Availability and use:** The local skill was available and used during the earlier simulator design work. This update added accessible data and status semantics while preserving the selected Aether palette.
- **Artifacts and validation:** The existing UI and `docs/web-ui-design.md` are the design artifacts. The local simulator was reviewed in a browser; no separate screenshot artifact was generated for this update.

### Diagram Design

- **Repository:** [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)
- **Purpose and domain:** Branded architecture, flow, system, and data diagrams.
- **Trigger and avoid:** Use when a diagram explains a non-trivial system boundary or process. Avoid duplicate diagrams that add no new information.
- **Installation and invocation:** The prompt gives `npx skills add cathrynlavery/diagram-design`. The local Codex skill is `diagram-design`.
- **Availability and use:** Available locally and used for the existing current-system HTML architecture diagram. The README Mermaid map is also retained.
- **Artifacts and validation:** The HTML diagram's structural self-check passed. Browser screenshot inspection was previously blocked for the local `file://` document. Mermaid source was reviewed but not rendered by a separate Mermaid tool.

### ManimGX

- **Repository:** [academa-labs/manimgx](https://github.com/academa-labs/manimgx)
- **Purpose and domain:** Animated mathematical and technical explanations.
- **Trigger and avoid:** Use when motion clarifies a supported process or measured time series. Avoid animation without data or where the interactive simulator already provides the useful time progression.
- **Installation and invocation:** No install or invocation was performed.
- **Availability and use:** Repository endpoint was verified; the tool is not installed in the project workflow and was not used.
- **Artifacts and validation:** No animation or generated media. There is no measured series to animate, and the browser already steps through the deterministic model.

## README and technical writing references

### adewale/good-readme

- **Repository:** [adewale/good-readme](https://github.com/adewale/good-readme)
- **Purpose and domain:** README review and evidence-based project documentation.
- **Trigger and avoid:** Use for a project README review. Avoid applying a generic template without checking repository contents.
- **Installation and invocation:** No command was supplied in the prompt and none was run.
- **Availability and use:** Public repository endpoint verified; not installed or invoked as a local skill. The master prompt's README requirements guided the existing README edits.
- **Artifacts and validation:** No skill-generated artifact. Local Markdown link checks cover the edited README's file targets.

### indubitably-ai/readme-writing

- **Repository:** Prompt names `indubitably-ai/readme-writing`; a public repository URL could not be verified, so none is inferred.
- **Purpose and domain:** README structure, presentation, navigation, and open-source onboarding.
- **Trigger and avoid:** Use for a first-time visitor README review. Avoid repetitive content and unsupported project claims.
- **Installation and invocation:** No verified command or invocation.
- **Availability and use:** Not available as a local skill and not directly used. Equivalent responsibilities were applied from the supplied master prompt.
- **Artifacts and validation:** No direct skill output. README changes were checked by the repository documentation validator.

### JayRHa readme-generator

- **Repository:** [JayRHa/agent-skills](https://github.com/JayRHa/agent-skills), subdirectory `readme-generator` as named in the prompt.
- **Purpose and domain:** Project README sections, quick start, usage, configuration, contribution, licensing, and navigation.
- **Trigger and avoid:** Use when creating or substantially reorganizing a project README. Avoid generating sections without repository evidence.
- **Installation and invocation:** No exact skill install or invocation command was supplied or run.
- **Availability and use:** Repository endpoint verified; subdirectory was not installed as a Codex skill. The prompt's content requirements were used as guidance.
- **Artifacts and validation:** No direct skill output. README paths are covered by local link verification.

### JayRHa technical-writer

- **Repository:** [JayRHa/agent-skills](https://github.com/JayRHa/agent-skills), subdirectory `technical-writer` as named in the prompt.
- **Purpose and domain:** Precise technical guides, API explanations, setup instructions, and release notes.
- **Trigger and avoid:** Use for technical documentation. Avoid describing a proposed capability as implemented.
- **Installation and invocation:** No exact skill install or invocation command was supplied or run.
- **Availability and use:** Repository endpoint verified; not installed or invoked directly. The master prompt's evidence rules were followed.
- **Artifacts and validation:** No direct skill output. New local links and the no-em-dash rule are checked by `npm run verify`.

### riekelt/technical-writer

- **Repository:** [riekelt/technical-writer](https://github.com/riekelt/technical-writer)
- **Purpose and domain:** Source-grounded technical writing that distinguishes implemented, experimental, planned, and unsupported work.
- **Trigger and avoid:** Use when writing technical explanations. Avoid claims that cannot be mapped to code or evidence.
- **Installation and invocation:** No local install or invocation was performed.
- **Availability and use:** Public repository endpoint verified; not installed. Its stated responsibilities match the evidence discipline used here, but no skill-specific output is attributed to it.
- **Artifacts and validation:** No direct skill output. Claims are mapped in `docs/engineering-evidence.md` and the repository audit.

### Shpigford/readme

- **Repository:** Prompt names `Shpigford/readme`; public repository endpoint could not be verified, so no URL is inferred.
- **Purpose and domain:** Comprehensive README guidance.
- **Trigger and avoid:** Use only if a deeper README treatment is justified. Avoid duplicate or bloated project documentation.
- **Installation and invocation:** No verified command or invocation.
- **Availability and use:** Not available as a local skill and not directly used.
- **Artifacts and validation:** No direct skill output. Current README structure follows the repository scope and link checks.

### matt-riley/writing-and-editing

- **Repository:** Prompt names `matt-riley/writing-and-editing`; public repository endpoint could not be verified, so no URL is inferred.
- **Purpose and domain:** Editorial review for grammar, clarity, consistency, and hierarchy.
- **Trigger and avoid:** Use for a final editorial pass. Avoid altering technical meaning for style.
- **Installation and invocation:** No verified command or invocation.
- **Availability and use:** Not available as a local skill and not directly used. This registry and new documentation received a plain-language consistency review.
- **Artifacts and validation:** No direct skill output. Local paths and punctuation are checked by the repository verifier.

### boffti/github-profile-readme

- **Repository:** [boffti/github-profile-readme](https://github.com/boffti/github-profile-readme)
- **Purpose and domain:** GitHub user profile README content.
- **Trigger and avoid:** Use only for a GitHub profile README. Do not apply profile conventions to this project README.
- **Installation and invocation:** No command or invocation was used.
- **Availability and use:** Public repository endpoint verified; not applicable to this repository task.
- **Artifacts and validation:** No artifact.

## KiCad and PCB references

These five repositories were read as review references for the existing Carrier R1. No repository was installed as a plugin or MCP server, and no `.kicad_sch` or `.kicad_pcb` file was changed in the documentation workstream.

### kicad-happy

- **Repository:** [aklofas/kicad-happy](https://github.com/aklofas/kicad-happy)
- **Purpose and domain:** KiCad schematic and PCB review, datasheet cross-checking, EMC pre-checks, and fabrication readiness.
- **Trigger and avoid:** Use for general KiCad design review. Avoid treating automated estimates or CAD checks as physical sign-off.
- **Installation and invocation:** The upstream README points Codex users to the skill installer. It was not installed.
- **Availability and use:** Public repository and README were read. Review criteria informed the MPN, power, and physical-validation gaps recorded here; no upstream skill was invoked.
- **Artifacts and validation:** No direct output. Existing carrier README records KiCad CLI results; physical fit and DFM remain unverified.

### AI-PCB-layout

- **Repository:** [ChengminLi/AI-PCB-layout](https://github.com/ChengminLi/AI-PCB-layout)
- **Purpose and domain:** Human-gated design and review of power-electronics PCB layouts, current paths, clearances, copper, and verification evidence.
- **Trigger and avoid:** Use for switching power-electronics layouts. Carrier R1 is a low-voltage socket carrier, not a power converter, so its topology-specific workflow was not applied.
- **Installation and invocation:** The upstream README describes copying `power-pcb-design` into an agent skill folder. Not installed.
- **Availability and use:** Public README was read as a reference. No skill workflow or approval gates were executed.
- **Artifacts and validation:** No direct output. Manufacturer power limits and absent module identities are recorded in hardware references and assumptions.

### KiCad MCP Pro

- **Repository:** [oaslananka/kicad-mcp-pro](https://github.com/oaslananka/kicad-mcp-pro)
- **Purpose and domain:** MCP-based KiCad inspection, ERC/DRC, DFM, BOM, and manufacturing workflows.
- **Trigger and avoid:** Consider when repeated MCP-based KiCad editing or review materially helps. Avoid adding a new external server for a documentation-only workstream with an existing local KiCad CLI path.
- **Installation and invocation:** No server or package was installed or invoked.
- **Availability and use:** Public README was read. It distinguishes first-pass estimates from KiCad-engine checks and human-gated manufacturing handoff; those limits are reflected in the project evidence.
- **Artifacts and validation:** No direct output. Existing CLI results are cited from the carrier README and were not rerun here.

### KiStack

- **Repository:** The prompt's [American-Embedded/KiStack](https://github.com/American-Embedded/KiStack) endpoint redirects to [BackplaneWorks/kistack](https://github.com/BackplaneWorks/kistack).
- **Purpose and domain:** Human-written KiCad skills for schematic, PCB, BOM, export, and Gerber review.
- **Trigger and avoid:** Use when those KiCad-specific tasks are performed. Avoid claiming Gerber validation when no Gerber files exist.
- **Installation and invocation:** The upstream README gives `npx skills add American-Embedded/kistack`. Not installed.
- **Availability and use:** Redirect and README verified. Read as a reference; no skill was invoked and no manufacturing output was generated.
- **Artifacts and validation:** No direct output. R1 contains no Gerbers or assembly drawings.

### circuit-skills

- **Repository:** [punkfab/circuit-skills](https://github.com/punkfab/circuit-skills)
- **Purpose and domain:** Code-driven circuit simulation, KiCad layout, enclosure fit, and 3D rendering.
- **Trigger and avoid:** Use when a reproducible SPICE deck, code-driven board layout, enclosure co-design, or PCB render is useful. Avoid converting a native, unbuilt KiCad proposal to another design flow without a concrete need.
- **Installation and invocation:** Upstream describes copying skills or adding its Codex plugin; neither was installed.
- **Availability and use:** Public README was read. No circuit simulation or enclosure fit was performed because the exact mating modules are unknown.
- **Artifacts and validation:** No direct output. Existing KiCad source and recorded CLI checks remain the design evidence.

## Research and general visualization tools

### Crawl4AI

- **Repository:** [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)
- **Purpose and domain:** Browser-based extraction for research and web source retrieval.
- **Trigger and avoid:** Use for relevant external technical sources when it can retrieve authoritative pages. Avoid archiving raw scraped pages or treating extraction output as the source of record.
- **Installation and invocation:** Crawl4AI 0.9.5 was already installed in the environment and used for this review. It was not added to the repository.
- **Availability and use:** Available and used to retrieve the Espressif guide and official GitHub Action pages.
- **Artifacts and validation:** No raw crawl artifact was committed. The normative source pages are linked in `docs/research-sources.md`. W3C edge protection and Nordic PDF extraction were worked around with direct source access.

### Mermaid, Matplotlib, Plotly, and R/ggplot2

- **Purpose and domain:** Mermaid supports source-based repository diagrams; Matplotlib, Plotly, and ggplot2 are quantitative plotting tools referenced by the prompt.
- **Trigger and avoid:** Mermaid was suitable for the architecture overview. Quantitative plotting libraries were not needed because no measured dataset or experiment results exist.
- **Installation and invocation:** Mermaid is rendered by GitHub Markdown. No plotting library was installed for this task.
- **Availability and use:** Existing Mermaid source is retained. No new quantitative plot was created.
- **Artifacts and validation:** The Mermaid source was reviewed but not independently rendered in this task. No data figure exists.

## Repository skill applicability summary

| Capability | Local availability | Used here | Artifact or validation |
| --- | --- | --- | --- |
| Taste frontend design | `design-taste-frontend` available locally | Yes in earlier UI work; this change preserves that direction and improves accessibility | `docs/web-ui-design.md`; local browser review |
| Diagram design | `diagram-design` available locally | Yes in earlier architecture work | HTML diagram structural check passed; screenshot check remains unavailable |
| Anatomy | `anatomy` available locally | Evaluated, no figure generated | Skipped for unknown physical geometry and unbuilt hardware |
| Crawl4AI | Version 0.9.5 already installed | Used | Source URLs and method recorded in `docs/research-sources.md` |
| README and writing repos | Mostly public references, not installed; three prompt names could not be verified | No direct invocation; the prompt's writing requirements were applied | README and docs link checks |
| KiCad and PCB skill repos | Public references read, not installed | Review criteria consulted; no upstream skill tool was invoked and no KiCad file changed | No new KiCad artifact; known constraints recorded in hardware/evidence docs |
| ManimGX | Public repository reference, not installed | No | No measured series or animation artifact |

## Token-efficient agent stack

These tools were referenced in the user-supplied agent-stack instructions. Official GitHub pages were checked on 2026-11-02. The session's exposed MCP tools and local skill directories were checked before deciding whether any tool could be invoked. No package, plugin, or MCP server was installed or configured for this update.

### Ponytail

- **Repository:** [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)
- **Purpose and domain:** Agent skill and plugin for minimizing unnecessary implementation, with review and repository audit commands.
- **Trigger and avoid:** Consider for substantive implementation reviews and repository audits. Preserve validation, security, accessibility, and tests when reducing code.
- **Client support and availability:** The upstream README documents a Codex plugin. It is not installed or exposed in this session.
- **Use in Aether:** Its minimal-change principles were applied manually. Ponytail commands were not invoked, and its plugin was not installed.
- **Artifacts and validation:** No Ponytail-generated artifact or benchmark was produced. Repository verification remains documented in `docs/testing-methodology.md`.

### skill-search

- **Repository:** [sowhan/skill-search](https://github.com/sowhan/skill-search)
- **Purpose and domain:** Semantic, on-demand retrieval of skill descriptions.
- **Trigger and avoid:** Consider when a large skill catalog makes native skill discovery costly. Avoid adding a second retrieval layer when native discovery is cheaper.
- **Client support and availability:** The upstream repository describes a Claude Code integration. It is not installed or exposed in this Codex session.
- **Use in Aether:** Not invoked. Native skill discovery was sufficient for the earlier design work, and no skill retrieval was needed for this documentation update.
- **Artifacts and validation:** No artifact or skill-search benchmark was produced.

### Lean Coding Agent

- **Repository:** [JeremyFaubert/lean-coding-agent-skill](https://github.com/JeremyFaubert/lean-coding-agent-skill)
- **Purpose and domain:** Cross-compatible coding skill for reducing context reads, tool calls, verbose output, and unrelated edits while maintaining a correctness floor.
- **Trigger and avoid:** Use its just-in-time retrieval and risk-based verification approach for coding tasks. Keep broader inspection for changes whose dependencies or impact require it.
- **Client support and availability:** The upstream README documents Codex and Claude Code support. The skill is not installed in this environment.
- **Use in Aether:** The supplied instructions were applied directly: bounded repository reads, no subagents, scoped documentation validation, and a clean stop after the requested workflow policy was recorded.
- **Artifacts and validation:** No upstream files were copied or installed. This registry update passed the repository documentation checker.

### Serena

- **Repository:** [oraios/serena](https://github.com/oraios/serena)
- **Purpose and domain:** MCP coding toolkit for semantic retrieval and editing, including symbol-level navigation.
- **Trigger and avoid:** Consider for cross-file code navigation or refactoring where symbol references and call relationships matter. Avoid for a small known documentation edit.
- **Client support and availability:** The project describes an MCP toolkit. No Serena MCP tools or local installation were available in this session.
- **Use in Aether:** Not invoked. The current change only edits the skill registry, so symbol-level retrieval was unnecessary.
- **Artifacts and validation:** No server configuration or generated artifact was added.

### Token Optimizer MCP

- **Repository:** [ooples/token-optimizer-mcp](https://github.com/ooples/token-optimizer-mcp)
- **Purpose and domain:** MCP tools for measuring token savings and optimizing large context payloads.
- **Trigger and avoid:** Consider for large logs, API responses, repeated search output, or other payloads where compression provides a measurable benefit. Avoid compressing small results or evidence needed for debugging.
- **Client support and availability:** The upstream describes an MCP server. No matching MCP tools or local installation were available in this session.
- **Use in Aether:** Not invoked. Bounded command output and short summaries were used for this small update.
- **Artifacts and validation:** No server configuration, compressed artifact, or token-savings benchmark was produced.
