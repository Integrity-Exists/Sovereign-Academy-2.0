try {
  const response = await fetch("/api/ask-sage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  // Clone the response so we can safely try both .json() and .text()
  const resClone = response.clone();

  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    const text = await resClone.text(); // use clone here
    console.error("Not JSON:", text);
    updateLastSageMessage(`⚠️ Error: ${text}`);
    return;
  }

  updateLastSageMessage(data.response || "[No response]");

} catch (error) {
  console.error("Request Error:", error);
  updateLastSageMessage("⚠️ Something went wrong. Please try again.");
}
