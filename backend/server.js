import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/generate", async (req, res) => {
  try {
    const { code, commitType } = req.body;

    if (!code || code.trim().length === 0) {
      return res.status(400).json({ error: "No code input provided" });
    }

    const prompt = `
You are an expert software engineer who writes clean, professional commit messages and PR descriptions.

Input code or diff:
${code}

Commit type: ${commitType || "auto-detect"}

Return a JSON object ONLY with this structure:

{
  "commit": "",
  "pr_title": "",
  "pr_description": "",
  "summary": ""
}
`;

    const completion = await client.chat.completions.create({
      model: "llama3-70b-8192", 
      messages: [
        { role: "system", content: "You write excellent commit messages and PR descriptions." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    });

    const text = completion.choices[0].message.content;

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonText = text.slice(jsonStart, jsonEnd);
    const result = JSON.parse(jsonText);

    res.json(result);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "AI generation failed", detail: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`FREE Backend running at http://localhost:${process.env.PORT}`);
});
