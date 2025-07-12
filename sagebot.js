(function () {
  const cfg = window.SageBotConfig || {
    containerId: "sage-chat-container",
    greetMessage: "Hi! Ask your legal question below.",
    placeholder:  "Ask Sage…",
    voice: false,
    theme: "light"
  };

  document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById(cfg.containerId);

    // 🔧 Create container if missing
    if (!container) {
      container = document.createElement("div");
      container.id = cfg.containerId;
      Object.assign(container.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "350px",
        height: "500px",
        zIndex: "1000"
      });
      document.body.appendChild(container);
    }

    // 🧠 Use your own local page
    const iframe = document.createElement("iframe");
    iframe.src =
      "ask-sage.html?" +
      `theme=${cfg.theme}&voice=${cfg.voice}` +
      `&greet=${encodeURIComponent(cfg.greetMessage)}` +
      `&placeholder=${encodeURIComponent(cfg.placeholder)}`;

    Object.assign(iframe.style, {
      width: "100%",
      height: "100%",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    });

    container.appendChild(iframe);
  });
})();
