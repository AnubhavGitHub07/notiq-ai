import { generateAIResponse } from "../services/aiService.js";

export const generateQuestions = async (req, res, next) => {
  try {
    const { content, title } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Note content required" });
    }

    const prompt = `
You are a senior software engineer interviewer.

Generate 5 technical interview questions based on the note below.

Title: ${title || "Untitled"}
Content: ${content}

Return only questions in numbered format.
`;

    const result = await generateAIResponse(prompt);

    res.status(200).json({
      questions: result,
    });
  } catch (err) {
    next(err);
  }
};

export const summarizeNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Note content required" });
    }

    const prompt = `
You are a senior software engineering mentor.

Summarize the following note into:
- Clear revision points
- Short and interview-focused explanation
- Bullet points only

Title: ${title || "Untitled"}
Content: ${content}
`;

    const result = await generateAIResponse(prompt);

    res.status(200).json({
      summary: result,
    });
  } catch (err) {
    next(err);
  }
};

export const generateTags = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Note content required" });
    }

    const prompt = `
You are an expert software engineer.

Generate ONLY 5 short technical tags (single words or short phrases)
based on this note.

Rules:
- lowercase
- no explanations
- return comma separated tags only

Title: ${title || "Untitled"}
Content: ${content}
`;

    const result = await generateAIResponse(prompt);

    const tags = result
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    res.status(200).json({ tags });
  } catch (err) {
    next(err);
  }
};

export const chatWithNote = async (req, res, next) => {
  try {
    const { title, content, messages } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Note context (content) required" });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Chat messages required" });
    }

    const systemMessage = {
      role: "system",
      content: `You are an AI assistant helping a student understand their notes. 
      Context of current note:
      Title: ${title || "Untitled"}
      Content: ${content}
      
      Answer questions strictly based on the provided note context. If the user asks something outside the note context, politely remind them that you are there to help with this specific note.`
    };

    const apiMessages = [systemMessage, ...messages];

    const result = await generateAIResponse(apiMessages);

    res.status(200).json({
      reply: result,
    });
  } catch (err) {
    next(err);
  }
};
