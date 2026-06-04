import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const { systemPrompt, history } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
    ],
    temperature: 0.7,
    max_tokens: 512,
  });

  const text = completion.choices[0]?.message?.content || "No response.";
  return Response.json({ text });
}
