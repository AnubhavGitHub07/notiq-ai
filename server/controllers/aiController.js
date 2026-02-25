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

Generate ONLY 5 short technical tags (single words or short phrases) based on this note.

Strict Rules:
- Return ONLY the tags.
- Use comma separation.
- No introductory text (NO "Here are the tags", NO "Based on the note...").
- No closing text.
- lowercase only.

Title: ${title || "Untitled"}
Content: ${content}
`;

    const result = await generateAIResponse(prompt);

    // Robust parsing: strip introductory conversational lines and extract tags
    const cleanResult = result
      .replace(/^(here are|based on|tags for|this note).*/gi, '') // Remove obvious intro lines
      .replace(/^(tags|technical tags):/gi, '') // Remove "Tags:" or "Technical Tags:"
      .trim();

    const tags = cleanResult
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0 && tag.length < 30); // Basic validation

    res.status(200).json({ tags: tags.slice(0, 5) });
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
