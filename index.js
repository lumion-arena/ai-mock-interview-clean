import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("AI Mock Interview SaaS is running 🚀");
});

app.post("/interview", async (req, res) => {
  try {
    const { role } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are an interview coach." },
        {
          role: "user",
          content: `Ask one interview question for a ${role} role.`,
        },
      ],
    });

    res.json({
      question: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
