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
            content: "You are an expert software engineering interview assistant.",
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
