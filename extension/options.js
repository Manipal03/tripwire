const defaults = {
  ollamaUrl: "http://localhost:11434",
  model: "gpt-oss:20b"
};

const form = document.getElementById("options-form");
const urlInput = document.getElementById("ollama-url");
const modelInput = document.getElementById("model");
const saveButton = document.getElementById("save");
const status = document.getElementById("status");

async function loadOptions() {
  try {
    const settings = await chrome.storage.local.get(defaults);
    urlInput.value = settings.ollamaUrl;
    modelInput.value = settings.model;
    saveButton.disabled = false;
  } catch (error) {
    status.textContent = "Could not load settings. Please reopen this page.";
    console.error("Tripwire: could not load settings", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  saveButton.disabled = true;
  status.textContent = "";

  try {
    await chrome.storage.local.set({
      ollamaUrl: urlInput.value.trim(),
      model: modelInput.value.trim()
    });
    status.textContent = "Settings saved.";
  } catch (error) {
    status.textContent = "Could not save settings. Please try again.";
    console.error("Tripwire: could not save settings", error);
  } finally {
    saveButton.disabled = false;
  }
});

loadOptions();
