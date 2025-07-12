(function () {
  const cfg = window.SageBotConfig || {
    containerId: "sage-chat-container",
    greetMessage: "Hi! Ask your legal question below.",
    placeholder: "Ask Sage…",
    voice: false,
    theme: "dark"
  };

  document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById(cfg.containerId);

    if (!container) {
      container = document.createElement("div");
      container.id = cfg.containerId;
      Object.assign(container.style, {
        position: "fixed",
        bottom: "15px",
        right: "15px",
        width: "280px",
        height: "420px",
        zIndex: "1000",
        transition: "opacity 0.3s ease-in-out"
      });
      document.body.appendChild(container);
    }

    const iframe = document.createElement("iframe");
iframe.src = `https://app.integrityexists.com/sage-chatbot.html?` +
  `theme=${cfg.theme}&voice=${cfg.voice}` +
  `&greet=${encodeURIComponent(cfg.greetMessage)}` +
  `&placeholder=${encodeURIComponent(cfg.placeholder)}`;

        
        
    Object.assign(iframe.style, {
      width: "100%",
      height: "100%",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      opacity: "0.92",
      pointerEvents: "auto"
    });

    container.appendChild(iframe);
  });
})();
