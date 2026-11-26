# Tripwire
Chrome MV3 extension that detects prompt-injection attacks targeting browser AI agents.
- Plain JS, no build step, no frameworks.
- Folders: extension/, test-pages/, eval/
- Keep detection logic in extension/detector.js as pure functions (testable in Node).
- OpenAI calls only from the background service worker. API key read from chrome.storage.local, never hardcoded.
- Every change: update README if behavior changes.