document.addEventListener("DOMContentLoaded", function () { const chatForm = document.getElementById("sage-chat-form"); const userInput = document.getElementById("user-input"); const chatLog = document.getElementById("chat-log"); 
chatForm.addEventListener("submit", async function (e) { 
e.preventDefault(); 
const prompt = userInput.value.trim(); 
if (!prompt) return; 
appendMessage("user", prompt); 
userInput.value = ""; 
appendMessage("sage", "Thinking..."); 
try { 
const response = await fetch("/api/ask-sage", { 
method: "POST", 
headers: { 
"Content-Type": "application/json" 
}, 
body: JSON.stringify({ prompt }) 
}); 
const data = await response.json(); 
updateLastSageMessage(data.response || "[No response]"); } catch (error) { 
console.error("❌ Error:", error); 
updateLastSageMessage("⚠️ Something went wrong. Please try again."); } 
}); 
function appendMessage(sender, message) { 
const messageElement = document.createElement("div"); 
messageElement.classList.add("message", sender); 
messageElement.innerText = message; 
chatLog.appendChild(messageElement); 
chatLog.scrollTop = chatLog.scrollHeight; 
} 
function updateLastSageMessage(message) { 
const sageMessages = chatLog.querySelectorAll(".message.sage");
if (sageMessages.length) { 
sageMessages[sageMessages.length - 1].innerText = message; } 
} 
});
