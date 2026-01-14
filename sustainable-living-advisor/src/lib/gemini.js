import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateSustainabilityInsight = async (data) => {
    if (!API_KEY) {
        throw new Error("Missing Gemini API Key");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an expert Sustainability Advisor. Analyze the user's daily habits and provide a structured assessment.
    
    User Data:
    - Electricity: ${data.electricity.acHours}h AC, ${data.electricity.lightHours}h Lights.
    - Water: ${data.water.bathingMethod} bath, Wastage: ${data.water.wastage}.
    - Food: ${data.food.diet} diet, Meat frequency: ${data.food.frequency}, Wastage: ${data.food.wastage}.
    - Transport: ${data.transport.mode}.

    Return ONLY a valid JSON object with this exact structure (no markdown formatting):
    {
      "score": <number 0-100 based on habits>,
      "level": "<Low | Medium | High>",
      "observations": ["<observation 1>", "<observation 2>", "<observation 3>"],
      "recommendations": ["<rec 1>", "<rec 2>", "<rec 3>", "<rec 4>", "<rec 5>"],
      "impactExplanation": "<A short paragraph explaining their environmental impact>",
      "manifesto": "<A short, inspiring 2-sentence motto for them>"
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up if the model returns markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw error;
    }
};
