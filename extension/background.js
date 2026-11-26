chrome.runtime.onMessage.addListener((message, sender) => {
  console.log("Tripwire received message", message);

  if (sender.tab?.id === undefined) return;

  const tabId = sender.tab.id;
  Promise.all([
    chrome.action.setBadgeText({ text: "OK", tabId }),
    chrome.action.setBadgeBackgroundColor({ color: "#16803c", tabId })
  ]).catch((error) => console.error("Tripwire: could not update badge", error));
});
