require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runGeminiPrompt(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    // Remove code block formatting if it exists (e.g., ```json)
    const clean = text.replace(/```json|```/g, "").trim();
    const json = await JSON.parse(clean);
    console.log("✅ Parsed JSON:", json);
    return json;
  } catch (err) {
    //console.log("❌ Error in JSON parsing:", err);
    return { summary: text }; // Return the raw text if JSON parsing fails
  }
}

module.exports = {
  runGeminiPrompt,
};
