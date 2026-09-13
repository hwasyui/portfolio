import { GoogleGenAI } from "@google/genai";
import skills from "../../../data/skills.json";
import educations from "../../../data/educations.json";
import experiences from "../../../data/experiences.json";
import projects from "../../../data/projects.json";
import contact from "../../../data/contact.json";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const trimmedProjects = projects.map(({ title, year, categories, projectType, summary, tech, gitrepo, url }) => ({
  title, year, categories, projectType, summary, tech, gitrepo, url,
}));

const DETAIL_KEYWORDS = /contribut|in detail|explain|how (did|was|were)|what did she (do|build|make|work)|elaborate|break.?down|walk.?me.?through|tell me more|deep.?dive/i;

function buildSystemPrompt(history) {
  const recentContext = history.slice(-6).map(m => m.content).join(" ");
  const isDetailRequest = DETAIL_KEYWORDS.test(recentContext);

  let projectsData = trimmedProjects;

  if (isDetailRequest) {
    const mentioned = projects.find(p => {
      const keywords = p.title.toLowerCase().split(/[\s\W]+/).filter(w => w.length > 3);
      return keywords.some(kw => recentContext.toLowerCase().includes(kw));
    });
    if (mentioned) {
      projectsData = trimmedProjects.map(t => t.title === mentioned.title ? mentioned : t);
    }
  }

  return `
You are a concise portfolio assistant for Angelica Suti Whiharto.

Rules:
- Always refer to Angelica in third person (she/her/Angelica). Never use "I", "my", or "me" as if you are her.
- Answer from the data below. If something truly isn't there, say "I don't have that info."
- You CAN evaluate, compare, and give opinions based on the data. For questions like "best project" or "strongest skill", reason from the data and give a real answer.
- When giving a subjective opinion (e.g. best/favorite), note that Angelica herself doesn't rank them, then share your take based on what stands out.
- Keep every response under 130 words.
- Use bullet points for any list of 2+ items (skills, projects, experiences, etc.).
- Bold (**text**) key names, titles, and technologies.
- Never write long paragraphs. Prefer short sentences and bullets.
- Never use em dashes (—). Use a comma, colon, or rewrite the sentence instead.
- Be direct. Skip filler phrases like "Based on the data" or "According to the information".
- Speak warmly, like you know her personally.
- If a question is not about Angelica (her skills, projects, experience, education, or contact), respond with exactly: "I can only answer questions related to Angelica, feel free to ask about her skills, projects, or experience!" Do not answer off-topic questions under any circumstance.

Angelica's Data:
Skills: ${JSON.stringify(skills)}
Education: ${JSON.stringify(educations)}
Experience: ${JSON.stringify(experiences)}
Projects: ${JSON.stringify(projectsData)}
Contact and Social: ${JSON.stringify(contact)}
`.trim();
}

export async function POST(req) {
  try {
    const { history } = await req.json();
    const systemPrompt = buildSystemPrompt(history);

    const contents = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 800,
        thinkingConfig: { thinkingLevel: "low" },
      },
    });

    const text = response.text || "No response.";
    return Response.json({ text });
  } catch (err) {
    console.error("[chat/route] Gemini error:", err);
    return Response.json({ error: true }, { status: 500 });
  }
}
