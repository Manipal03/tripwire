console.log("Tripwire loaded");

chrome.runtime.sendMessage({ type: "SCAN_RESULT", url: window.location.href })
  .catch((error) => console.error("Tripwire: could not send scan result", error));
