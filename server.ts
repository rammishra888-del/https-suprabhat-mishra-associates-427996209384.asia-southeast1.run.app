import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client, prevents startup crashes if API key is not yet set
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined!");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API for general health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// AI Chatbot endpoint proxying Gemini API requests safely
app.post("/api/chat", async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message input is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not defined. Please add your GEMINI_API_KEY in the Settings > Secrets panel of Google AI Studio.",
        isConfigError: true
      });
    }

    const ai = getGeminiClient();

    // Set up legal system instruction
    const systemInstruction = `You are the digital AI assistant of "Suprabhat Mishra & Associates Legal Solutions" (Kanpur, India). The firm is led by Advocate Suprabhat Mishra (B.A. LL.B), practicing active civil, criminal, family, corporate, property, and legal drafting law from Chamber No. 7, Second Floor, New Adhivakta Building, Collectorate Court, Kanpur.
Your job is to answer the user's legal questions, describe standard Indian legal procedures (IPC, CrPC, CPC, Family Courts Act, Transfer of Property Act, Contract Act etc.), and provide informative guidance on documentation or stamp duty.
Always communicate with deep professionalism, legal poise, and absolute helpfulness. Use markdown formatting to make your letters, guides, or laws look well-structured with clear bullet points.
CRITICAL: Always append a short, polite legal disclaimer at the very end of your response, reminding the user that your response is for informational purposes only under Indian law and they should consult with Adv. Suprabhat Mishra (Tel: 9450365729) in Chamber 7, Kanpur Collectorate for official representation.`;

    // Map history to contents for Gemini API if provided
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to formulate a response at this time.";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({
      error: error.message || "An error occurred while contacting the AI consultation engine."
    });
  }
});

// Vite middleware setup or product build serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log(`Chamber: New Adhivakta Building, Collectorate Court Kanpur Nagar`);
  });
}

setupServer().catch((error) => {
  console.error("Failed to start server:", error);
});
