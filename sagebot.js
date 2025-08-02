document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("sage-chat-form");
  const userInput = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const prompt = userInput.value.trim();
    if (!prompt) return;

    appendMessage("user", prompt);
    userInput.value = "";
    appendMessage("sage", "Thinking...");

try {
  const response = await fetch("/api/ask-sage"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const text = await response.text();
    updateLastSageMessage(`⚠️ Server error: ${text}`);
    return;
  }

  const data = await response.json();
  updateLastSageMessage(data.response || "[No response]");
} catch (err) {
  console.error(err);
  updateLastSageMessage("⚠️ Something went wrong. Please try again.");
 });
}

  });
});

