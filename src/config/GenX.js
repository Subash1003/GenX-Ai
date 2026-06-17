async function runChat(prompt, conversationHistory = []) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant, Your name is GenX-Ai. Respond with a numbered list for some cases and with bullet points for other cases. Use markdown formatting."
        },
        ...conversationHistory,  
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Groq error:", data);
    throw new Error(data.error?.message || "API failed");
  }

  return data.choices[0].message.content;
}

export default runChat;