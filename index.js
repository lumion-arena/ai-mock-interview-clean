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

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `You are an interview coach. Ask one interview question for a ${role} role.`,
    });

    const text =
      response.output?.[0]?.content?.[0]?.text ||
      "No question generated";

    res.json({ question: text });
  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
