(function () {
  const config = window.SageBotConfig || {
    voice: true,
    greetMessage: "Hi! I'm Sage. Ask me anything legal — from DSS to due process.",
    placeholder: "Ask Sage something...",
    theme: "dark"
  };

  const iframe = document.createElement("iframe");
  iframe.src = "ask-sage.html";
  iframe.id = "sage-bot";
  iframe.title = "Ask Sage Chatbot";
  iframe.style.position = "fixed";
  iframe.style.bottom = "100px";
  iframe.style.left = "20px";
  iframe.style.width = "300px";
  iframe.style.height = "420px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.borderRadius = "12px";
  iframe.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  iframe.style.backgroundColor = config.theme === "dark" ? "#111" : "#fff";

  document.body.appendChild(iframe);
})();
