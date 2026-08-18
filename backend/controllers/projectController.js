const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const searchProjects = async (req, res) => {
  try {
    const {
      query,
      category = "All",
      difficulty = "All",
    } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter what you want to build.",
      });
    }

    const prompt = `
You are a professional software project idea generator for a platform called ProjectHub.

Generate 6 unique and practical software project ideas based on:

User request:
${query}

Category:
${category}

Difficulty:
${difficulty}

Requirements:
- Projects should be realistic and suitable for students/developers.
- Avoid generic ideas.
- Match the requested technology/category.
- Provide different ideas rather than variations of the same project.
- If difficulty is "All", use a suitable mixture of difficulties.
- Keep descriptions concise.
- Suggest realistic technologies.

Return ONLY valid JSON in this exact structure:

{
  "projects": [
    {
      "title": "Project title",
      "description": "Short project description",
      "category": "Web Development",
      "difficulty": "Intermediate",
      "technologies": ["React", "Node.js", "MongoDB"],
      "features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ],
      "learningOutcomes": [
        "Learning outcome 1",
        "Learning outcome 2"
      ]
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text);

    res.status(200).json({
      success: true,
      projects: result.projects || [],
    });

  } catch (error) {
    console.error("Project Search Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to generate project ideas.",
    });
  }
};

module.exports = {
  searchProjects,
};
