export default async function handler(req, res) { 
if (req.method !== "POST") { 
return res.status(405).json({ error: "Method not allowed" }); 
} 
const { prompt } = req.body; 
if (!prompt || typeof prompt !== "string") { 
return res.status(400).json({ error: "Prompt is required" }); 
} 
  console.log("Received prompt:", prompt);
try { 
const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", 
headers: { 
"Content-Type": "application/json", 
Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
}, 
body: JSON.stringify({ 
model: "gpt-3.5-turbo", 
messages: [{ role: "user", content: prompt }], 
}), 
}); 
const data = await response.json(); 
const result = data.choices?.[0]?.message?.content; 
res.status(200).json({ response: result }); 
} catch (err) { 
console.error("OpenAI Error:", err); 
res.status(500).json({ error: "Something went wrong" }); 
} 
}
