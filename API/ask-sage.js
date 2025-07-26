export default async function handler(req, res) { 
try { 
if (req.method !== 'POST') { 
return res.status(405).json({ message: 'Method Not Allowed' }); 
} 
const { prompt } = req.body; 
if (!prompt) { 
return res.status(400).json({ message: 'Prompt is required' }); 
} 
const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", 
headers: { 
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, 
"Content-Type": "application/json" 
}, 
body: JSON.stringify({ 
model: "gpt-4", 
messages: [{ role: "user", content: prompt }], 
temperature: 0.7 
}) 
}); 
const data = await response.json(); 
if (!response.ok) { 
console.error('OpenAI API error:', data); 
return res.status(response.status).json({ message: 'Error from OpenAI', detail: data }); } 
const message = data.choices?.[0]?.message?.content || "No response"; return res.status(200).json({ message }); 
} catch (error) { 
console.error('Server error:', error); 
return res.status(500).json({ message: 'Internal Server Error', error: error.toString() }); } 
}
