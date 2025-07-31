// File: api/ask-sage.js 
import fetch from 'node-fetch'; 
export default async function handler(req, res) { 
if (req.method !== 'POST') { 
return res.status(405).json({ error: 'Method Not Allowed' }); 
} 
const { prompt } = req.body; 
if (!prompt || typeof prompt !== 'string') { 
return res.status(400).json({ error: 'Prompt is required.' }); 
} 
// Debug logs to help us troubleshoot 
console.log("�� Incoming prompt:", prompt); 
console.log("�� API Key exists?", !!process.env.OPENAI_API_KEY); 
try { 
const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", 
headers: { 
"Content-Type": "application/json", 
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}` 
}, 
body: JSON.stringify({ 
model: "gpt-4", 
messages: [{ role: "user", content: prompt }] 
}) 
}); 
const data = await response.json(); 
const result = data.choices?.[0]?.message?.content || "[No response]"; res.status(200).json({ response: result }); 
} catch (error) { 
console.error("❌ Ask Sage Error:", error.stack || error.message || error); res.status(500).json({ error: error.stack || error.message || "Something went wrong." }); } 
}
