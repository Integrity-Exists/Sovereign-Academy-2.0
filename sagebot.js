(function () {
  const config = window.SageBotConfig || {
    containerId: "sage-chat-container",
    greetMessage: "Hi! Ask your legal question below.",
    placeholder: "Ask Sage...",
    voice: false,
    theme: "light"
  };

  const container = document.getElementById(config.containerId);
  if (!container) {
    console.warn("⚠️ SageBot container not found:", config.containerId);
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = "https://integrityexists.github.io/ask-sage-ui/?theme=" + config.theme +
               "&voice=" + config.voice +
               "&greet=" + encodeURIComponent(config.greetMessage) +
               "&placeholder=" + encodeURIComponent(config.placeholder);

  iframe.style.width = "100%";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "10px";
  iframe.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";

  container.appendChild(iframe);
})();
