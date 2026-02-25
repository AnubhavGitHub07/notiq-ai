import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generateAIResponse = async (messagesOrPrompt) => {
  const messages =
    typeof messagesOrPrompt === "string"
      ? [
        {
          role: "system",
          content: "You are an expert software engineering assistant. Always provide structured responses using proper Markdown syntax. Use level 3 headers (### Header) for sections. CRITICAL: For technical generation tasks (like tags or questions), return ONLY the requested data. DO NOT provide introductory text, explanations, or conversational filler unless explicitly asked for a conversational response.",
        },
        {
          role: "user",
          content: messagesOrPrompt,
        },
      ]
      : messagesOrPrompt;

  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3-8b-instruct",
    messages: messages,
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
};
