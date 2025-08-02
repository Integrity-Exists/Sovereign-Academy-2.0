document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("sage-chat-form");
  const input = document.getElementById("user-input");
  const log = document.getElementById("chat-log");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;

    // Display user input
    log.innerHTML += `<div><strong>You:</strong> ${prompt}</div>`;

    try {
      const res = await fetch("/api/ask-sage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log("Sage says:", data); // <== log for debugging

      const reply = data.response || "[No response]";
      log.innerHTML += `<div><strong>Sage:</strong> ${reply}</div>`;
    } catch (err) {
      console.error("Error talking to Sage:", err);
      log.innerHTML += `<div><strong>Sage:</strong> Sorry, something went wrong.</div>`;
    }

    input.value = "";
  });
});
