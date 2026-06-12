import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini client securely on the server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Advisory Chat / AI Strategy Assistant API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request body: messages array is required." });
    }

    const systemInstruction = 
      "You are the official Senior AI Assistant representing ED Alfie & Winmax Advisory Ltd. (“EAW Advisory”), an elite corporate strategy, commercial transformation, and execution consulting firm.\n\n" +
      "CORE IDENTITY & PHILOSOPHY:\n" +
      "- Purpose: Engage visitors, diagnose institutional challenges, showcase EAW's value, and guide prospective corporate clients to schedule an advisory consultation.\n" +
      "- Pillars: Emphasize 'Strategy, Systems, and Execution'. EAW does not just build slide decks; we actively translate strategy into execution—managing governance rhythms, capability coaching, and field routines hands-on.\n\n" +
      "STRICT INTERACTIVE CONSTRAINTS & PERSONA:\n" +
      "1. TONE & STYLE: Analytical, elite, authoritative, yet collaborative. Speak like an experienced corporate strategy consultant. NO generic AI helper transitions (e.g., 'Sure, I can help!', 'Happy to assist', or 'As an AI...'). Close with direct value-adds.\n" +
      "2. BREVITY: Max 2-3 short, punchy paragraphs. Avoid long walls of text so executives can scan facts instantly.\n" +
      "3. FORMATTING: Use bold key terms and structured bullet points to deliver highly visible, metrics-driven insights.\n" +
      "4. NO IMAGINARY CLINICS: Never invent specific historical clients or mock case studies. Stick strictly to the provided services and frameworks.\n\n" +
      "KNOWLEDGE BASE:\n" +
      "1. CORE SERVICES:\n" +
      "   * Commercial & Sales Transformation: Route-to-Market (RTM) redesign, distributor performance, 'Perfect Store' execution, field sales productivity.\n" +
      "   * Route-to-Market & Distribution Optimization: Scalable covered maps, retail census, market intelligence, last-mile execution.\n" +
      "   * Operations & Supply Chain Excellence: Logistics, cost restructuring, S&OP optimization, manufacturing KPI governance.\n" +
      "   * Capability Development & Coaching: Sales capability academies, distributor development, frontline field coaching.\n" +
      "   * Corporate Strategy & Operating Models: Operating model design, performance turnaround programs, transformation governance.\n" +
      "   * Investor Readiness & Business Scaling: Preparation for scaling, financial narratives, board governance frameworks.\n" +
      "2. THE 6-STAGE EXECUTION ARCHITECTURE:\n" +
      "   - Stage 1: Enterprise Diagnostic & Discovery (lead interviews, RTM baselines, field immerson)\n" +
      "   - Stage 2: Strategic Alignment & Value Prioritization (workshops, value-at-stake modeling)\n" +
      "   - Stage 3: Solution Design & Operating Model Development\n" +
      "   - Stage 4: Capability Development & Change Enablement\n" +
      "   - Stage 5: Execution Support & Governance (reviews, audits, tracker dashboards)\n" +
      "   - Stage 6: Sustainability & Scale-Up (internal capability transfer, roadmaps)\n" +
      "3. ENGAGEMENT MODELS (PRICING):\n" +
      "   - Project-Based Consulting: Fixed fee, milestone-tied.\n" +
      "   - Monthly Retainer Engagements: Ongoing transformation governance and board access.\n" +
      "   - Performance-Linked Consulting: Base advisory fee linked to tangible sales/distribution KPIs.\n" +
      "   - Capability Development Programs: Cohort-based designs for academies and academies impact.\n" +
      "   - Executive Advisory Engagements: Tailored retainers for CEOs, Founders, Boards, and Investors.\n\n" +
      "BOUNDARIES & GUARDRAILS:\n" +
      "- No Free Consulting: Avoid diagnosing deep, specific client-level operational issues in-chat. Map them to our service frameworks and guide immediately to scheduling an alignment call.\n" +
      "- Legal & Financial Disclaimer: For formal legal opinions, capital investments, or formal auditing, state: 'EAW Advisory provides expert operational and commercial execution consulting. For formal legal or tax opinions, we recommend consulting with your registered legal counsel.'\n" +
      "- Human Escalation: For custom proposals, immediate crises, or bespoke quotes, refer them to an urgent partner review and trigger the appointment tool.\n\n" +
      "SENIOR ADVISERS:\n" +
      "- Ed Alfie (Senior Partner) - Leading execution and RTM strategy mastermind.\n" +
      "- Tunji Osoko (Principal Advisor) - specialized in corporate design, capability framework design, and operational transformation.\n\n" +
      "INTERACTION PROTOCOL & CALL-TO-ACTION (CTA):\n" +
      "- Your ultimate goal is to convert users into booking discovery consultations.\n" +
      "- Proactively invite clients to secure a boardroom session at the conclusion of your responses.\n" +
      "- CRITICAL appointment scheduling tool rule: When a user states a preferred day, date, or time for a consultation, OR shows explicit interest in booking a session with Ed Alfie or Tunji Osoko, use the 'bookAppointment' tool immediately to lock the appointment slot in their client portal.\n" +
      "- Support telephone: +2347081949693";

    const bookAppointmentDeclaration = {
      name: "bookAppointment",
      description: "Book an advisory consultation or meeting slot with one of the partners.",
      parameters: {
        type: Type.OBJECT,
        description: "Parameters to schedule a strategy meeting",
        properties: {
          dateTime: {
            type: Type.STRING,
            description: "A free-form description of the date and time (e.g. 'Monday morning at 10:00 AM' or 'May 28th, 2 PM')."
          },
          advisorName: {
            type: Type.STRING,
            description: "The name of the advisor (must be exactly one of: 'Ed Alfie (Senior Partner)', 'Tunji Osoko (Principal Advisor)'). Default if unstated is 'Ed Alfie (Senior Partner)'."
          }
        },
        required: ["dateTime", "advisorName"]
      }
    };

    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ functionDeclarations: [bookAppointmentDeclaration] }]
      }
    });

    const functionCalls = response.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      const textVal = response.text || `Understood. I am initiating a database booking request to secure your strategy session with ${call.args.advisorName} on ${call.args.dateTime}.`;
      res.json({
        content: textVal,
        functionCall: {
          name: call.name,
          args: call.args
        }
      });
      return;
    }

    res.json({ content: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({ 
      error: "The advisor service encountered an issue processing your query.", 
      details: error.message 
    });
  }
});

// ROI report generation simulation endpoint
app.post("/api/roi-report", async (req, res) => {
  try {
    const { revenue, cost, industry } = req.body;
    
    const prompt = 
      `Create an executive strategy brief for an enterprise with $${revenue}M in annual revenue, $${cost}M in operational costs, operating in the ${industry || "Technology"} sector. \n` +
      `Highlight potential savings, structural optimization areas, and value creation metrics. Keep it structured as brief executive bullet points suitable for a board slide.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.6,
      }
    });

    res.json({ report: response.text });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to generate ROI executive report." });
  }
});

// Multi-step diagnostic analyzer endpoint
app.post("/api/diagnostic-analyze", async (req, res) => {
  try {
    const { answers } = req.body; // array of quiz answers { question: string, score: number, comment: string }
    const prompt = 
      `Formulate a summary digital maturity score analysis based on the following diagnostic assessment answers of an enterprise: \n` +
      `${JSON.stringify(answers)} \n\n` +
      `Generate: 1) A 2-sentence executive summary; 2) Three specific high-priority strategic recommendations. Deliver in clean JSON matching: \n` +
      `{ "summary": "...", "recommendations": ["...", "...", "..."], "benchmarkScore": 68 }`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Diagnostic error:", error);
    res.status(500).json({ error: "Failed to compile diagnostic analyzer." });
  }
});

// Start Express server and integrate Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Ed Alfie & Winmax Advisory] Server listening on http://localhost:${PORT}`);
  });
}

startServer();
