document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("sage-chat-form");
  const userInput = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  if (!chatForm || !userInput || !chatLog) {
    console.warn("Ask Sage UI elements not found.");
    return;
  }

  function appendMessage(sender, message) {
    const div = document.createElement("div");
    div.textContent = `${sender}: ${message}`;
    chatLog.appendChild(div);
  }

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const prompt = userInput.value.trim();
    if (!prompt) return;

    appendMessage("You", prompt);
    userInput.value = "";
    appendMessage("Sage", "Thinking...");

    try {
      const response = await fetch("/api/ask-sage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      const result = data.choices?.[0]?.message?.content || "[No response]";
      chatLog.lastChild.textContent = `Sage: ${result}`;
    } catch (err) {
      chatLog.lastChild.textContent = "Sage: [Something went wrong]";
      console.error("Ask Sage error:", err);
    }
  });
});
