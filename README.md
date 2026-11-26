<div align="center">

# Tripwire

### A page is data. Not an instruction.

A Chrome extension exploring prompt-injection detection for browser AI agents.

![Manifest V3](https://img.shields.io/badge/Chrome-Manifest_V3-86f7c5?style=flat-square&labelColor=101e30)
![Version](https://img.shields.io/badge/version-0.1.0-99adc4?style=flat-square&labelColor=101e30)
![Stage](https://img.shields.io/badge/stage-early_prototype-ffca85?style=flat-square&labelColor=101e30)
![JavaScript](https://img.shields.io/badge/JavaScript-no_build_step-f7df1e?style=flat-square&labelColor=101e30)

[Get started](#get-started) · [What works today](#what-works-today) · [Roadmap](#roadmap) · [Contribute](#contribute)

![Animated Tripwire concept: a page scan reveals an instruction override and a secret-exfiltration request. This illustrates planned functionality.](docs/assets/tripwire-preview.gif)

**Spot the instruction behind the information.**

</div>

> **Project status:** Tripwire is an early MV3 scaffold. The animation illustrates the intended experience; detection and analysis are not implemented yet. The current green `OK` badge and “No threats detected” popup are placeholders, not security verdicts.

## Why Tripwire?

Browser agents read pages to complete tasks. Those pages can also contain attacker-written instructions: abandon the task, disclose a secret, or send information somewhere else.

Tripwire's goal is to surface those instructions with evidence and context so users can understand what deserves scrutiny.

| What a page contains | What Tripwire aims to surface |
| --- | --- |
| “Ignore your previous instructions…” | An attempt to override the assigned task |
| Text pretending to be a system or developer message | An attempt to impersonate a trusted authority |
| Instructions to extract secrets and send them elsewhere | A possible exfiltration attempt |

These are planned detection categories. Quoted examples, educational material, and ordinary instructions also need context to avoid false alarms.

## What works today

- **Chrome MV3 foundation:** module service worker, content script, popup, and options page.
- **Message flow:** the content script sends the page URL to the background worker on load.
- **Placeholder UI:** a green `OK` badge and a compact dark popup.
- **Saved configuration:** Ollama URL and model preferences stored in `chrome.storage.local`.
- **Testable detector interface:** `scoreRules(candidates)` exposed through `globalThis` and CommonJS; currently returns `{ score: 0, hits: [] }`.

There are currently **no model requests, page-content analysis, or agent-blocking capabilities**.

## Get started

**Requirements:** Chrome and a local copy of this repository. No npm install, framework, or build step is needed.

```sh
git clone https://github.com/Manipal03/tripwire.git
cd tripwire
```

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the repository's **`extension/`** folder.
4. Open or reload a normal website, then click Tripwire in the extensions menu.

You should see the placeholder popup and `OK` badge. Chrome internal pages such as `chrome://extensions` are not scan targets.

### Configuration

Open Tripwire's **Extension options**, edit the fields, and click **Save**.

| Setting | Default | Current behavior |
| --- | --- | --- |
| Ollama URL | `http://localhost:11434` | Saved locally; no connection is made |
| Model | `gpt-oss:20b` | Saved locally; no model is called |

Ollama is **not required** to run this scaffold.

## How it fits together

```text
Web page
   │
   └─ content.js ── SCAN_RESULT { url } ──► background.js
                                               │
                                               └─► Placeholder OK badge

options.html / options.js ──► chrome.storage.local
popup.html / popup.js     ──► Placeholder status
detector.js               ──► Pure-function stub, not wired into scanning yet
```

The intended next step is bounded page extraction → explainable rule scoring → per-tab findings → evidence in the popup. Optional model analysis comes after a working, evaluated rules pipeline.

## Roadmap

- [x] Establish the MV3 extension and local settings.
- [ ] Replace placeholder verdicts with honest scan states, including failures and unsupported pages.
- [ ] Extract page candidates with source context and handle dynamically added content.
- [ ] Implement pure detection rules with evidence, severity, and stable rule IDs.
- [ ] Add a findings UI with rescan and locate-on-page actions.
- [ ] Build malicious **and benign** test fixtures; measure misses, false alarms, and latency.
- [ ] Add optional background-only Ollama analysis with timeouts and validated responses.
- [ ] Review permissions, privacy disclosures, accessibility, and release packaging.
- [ ] Explore an explicit agent integration that can wait for a scan before proceeding.

**Detection is not prevention.** Tripwire currently cannot pause an AI agent. Any future enforcement claim must be backed by a supported, tested integration.

## Privacy & permissions

The scaffold does not send data to an external service. It sends the current page URL internally to the background worker, which logs incoming messages, and stores the two configuration fields locally.

| Declared access | Current use |
| --- | --- |
| `storage` | Save the Ollama URL and model preferences |
| `<all_urls>` | Run the content script on eligible websites |
| `activeTab`, `scripting` | Reserved in the scaffold; not used by the current implementation |
| `http://localhost:11434/*` | Declared for planned local analysis; no requests yet |

Permissions should be reduced or justified before a store release. Do not rely on this prototype to determine whether a page is safe.

## Develop

```text
extension/           Chrome extension; load this folder unpacked
  manifest.json      Permissions and entry points
  content.js         Page-load message
  background.js      Message logging and placeholder badge
  detector.js        Pure scoring interface
  popup.*            Dark popup UI
  options.*          Local settings
docs/                README animation and its source generator
```

Keep detection logic in `extension/detector.js` as pure functions. Preserve both browser and Node compatibility, keep any future OpenAI calls in the background worker, and never hardcode API keys. See [AGENTS.MD](AGENTS.MD) for project conventions.

With Node installed, you can check the current detector interface:

```sh
node -e "console.log(require('./extension/detector.js').scoreRules([]))"
```

Expected output: `{ score: 0, hits: [] }`. This is a stub check, not a detection-quality test. After editing extension files, reload the extension and the website tab.

The README animation is generated with Pillow by [docs/render-preview.py](docs/render-preview.py). It uses Windows Segoe UI fonts and can be regenerated with `python docs/render-preview.py`.

## Contribute

Useful first contributions include realistic attack fixtures, benign examples that look suspicious, explainable detection rules, and tests for navigation and dynamic pages.

[Open an issue](https://github.com/Manipal03/tripwire/issues) with the behavior you want to improve and a reproducible example. Use synthetic credentials in examples and remove private browsing data.

---

<div align="center">

**Make the agentic web easier to inspect.**

Built with plain JavaScript. Designed to earn trust through evidence.

</div>
