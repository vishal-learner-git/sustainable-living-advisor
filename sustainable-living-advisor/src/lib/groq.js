import Groq from "groq-sdk";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const generateSustainabilityInsight = async (data) => {
    if (!API_KEY) {
        throw new Error("Missing Groq API Key");
    }

    const groq = new Groq({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true // Required for client-side usage
    });

    const prompt = `
    You are an expert Sustainability Advisor. Analyze the user's daily habits and provide a structured assessment.
    
    User Data:
    - Electricity: Fan ${data.electricity.fanHours}h, AC ${data.electricity.acHours}h, Lights ${data.electricity.lightHours}h.
    - Water: Bathing ${data.water.bathingDuration}, Washing ${data.water.washingFrequency}, Wastage: ${data.water.wastage}.
    - Food: ${data.food.diet}, ${data.food.mealsPerDay} meals/day, Wastage: ${data.food.wastage}.
    - Transport: ${data.transport.mode}, ${data.transport.distance} km/day.

    Return ONLY a valid JSON object with this exact structure (no markdown formatting, no explanatory text):
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
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a JSON-only response bot. You must return valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama3-8b-8192",
            temperature: 0.5,
            response_format: { type: "json_object" }
        });

        const text = completion.choices[0]?.message?.content || "";
        return JSON.parse(text);
    } catch (error) {
        console.error("Groq AI Error:", error);
        throw error;
    }
};
