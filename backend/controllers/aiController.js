const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt } = require("../utils/prompts");
const Question = require("../models/Question");
const { questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// generate interview ques and ans using gemini
// route POST /api/ai/generate-Questions
// access private

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicToFocus,
      numberOfQuestions,
    );
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    // extract the ai o/p
    let rawText = response.text;

    const cleanedtext = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    // consvert text into js object
    // like before  "[ { question: ..., answer: ... } ]"
    // and after [{ question: "...", answer: "..." }]
    const data = JSON.parse(cleanedtext);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate questions", error: error.message });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ message: "Missing required field: question" });
    }
    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [prompt],
    });
    // extract the ai o/p
    let rawText = response.text;

    const cleanedtext = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    // consvert text into js object
    // like before  "[ { question: ..., answer: ... } ]"
    // and after [{ question: "...", answer: "..." }]
    const data = JSON.parse(cleanedtext);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate questions", error: error.message });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
