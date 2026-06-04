import Groq from "groq-sdk";
import skills from "../../../data/skills.json";
import educations from "../../../data/educations.json";
import experiences from "../../../data/experiences.json";
import projects from "../../../data/projects.json";
import contact from "../../../data/contact.json";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompt = `
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
- Be direct. Skip filler phrases like "Based on the data" or "According to the information".
- Speak warmly, like you know her personally.

Angelica's Data:
Skills: ${JSON.stringify(skills)}
Education: ${JSON.stringify(educations)}
Experience: ${JSON.stringify(experiences)}
Projects: ${JSON.stringify(projects)}
Contact and Social: ${JSON.stringify(contact)}
`.trim();

export async function POST(req) {
  try {
    const { history } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const text = completion.choices[0]?.message?.content || "No response.";
    return Response.json({ text });
  } catch (err) {
    console.error("[chat/route] Groq error:", err);
    return Response.json({ error: true }, { status: 500 });
  }
}
