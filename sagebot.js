(function () {
  const botWindow = document.createElement("iframe");
  botWindow.id = "sageChatWindow";
  botWindow.src = "sage-chatbot.html"; // or full URL if preferred
  botWindow.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 340px;
    height: 500px;
    border: none;
    z-index: 9999;
    border-radius: 10px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  `;
  document.body.appendChild(botWindow);
})();
