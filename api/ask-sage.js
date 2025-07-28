// File: api/ask-sage.js 
export default async function handler(req, res) { 
if (req.method !== 'POST') { 
return res.status(405).json({ error: 'Method Not Allowed' }); 
} 
const { prompt } = req.body;

if (!prompt || typeof prompt !== "string") {
  return res.status(400).json({ error: "Prompt is required." });
}

try { 
const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", 
headers: { 
"Content-Type": "application/json", 
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }, 
body: JSON.stringify({ 
model: "gpt-4", 
messages: [{ role: "user", content: prompt }] 
}) 
}); 
const data = await response.json(); 
const result = data.choices?.[0]?.message?.content || "[No response]"; 
res.status(200).json({ response: result }); 
} catch (error) { 
console.error("Ask Sage Error:", error); 
res.status(500).json({ error: "Something went wrong. Try again later." }); } 
}
