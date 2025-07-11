
(function() {
  const config = window.SageBotConfig || {};
  const iframe = document.createElement("iframe");
  iframe.src = "https://integrityexists.com/sage-chatbot.html";
  iframe.id = "sageChatWindow";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "360px";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.borderRadius = "10px";
  iframe.allow = "microphone;";

  document.body.appendChild(iframe);

  // Message config to iframe after load
  iframe.onload = function() {
    iframe.contentWindow.postMessage({ type: "init", config }, "*");
  };
})();
