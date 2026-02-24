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
          content: "You are an expert software engineering assistant. Always provide structured responses using proper Markdown syntax. Use level 3 headers (### Header - with a space after the hashes) for sections, bullet points for lists, and bold text for emphasis. Do not use hashes unless they are part of a valid Markdown header. Ensure your output is clean and professional.",
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
