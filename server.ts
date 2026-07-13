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

// Form Intake Scheduler Endpoint adjusted to catch raw frontend properties
app.post("/api/submit-form", async (req, res) => {
  const {
    contactName,
    contactEmail,      // frontend prop name
    contactCompany,    // frontend prop name
    contactPhone,      // frontend prop name
    contactRevenue,    // frontend prop name
    contactChallenge,  // frontend prop name
    selectedDate,      // frontend prop name
    selectedTime,      // frontend prop name
    contactMessage     // frontend prop name
  } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Website Intake <onboarding@resend.dev>', 
        to: 'advisors@eawadvisory.com', // <-- UPDATE THIS TO YOUR EMAIL ADDRESS
        subject: `🚨 New Briefing Scheduled: ${contactCompany || 'New Client Enterprise'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #ffffff; color: #333333;">
            <h2 style="color: #b38f53; margin-bottom: 20px; border-bottom: 2px solid #b38f53; padding-bottom: 10px;">Briefing Intake Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; font-weight: bold; width: 40%;">Contact Name:</td><td>${contactName || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Corporate Work Email:</td><td>${contactEmail || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Enterprise Name:</td><td>${contactCompany || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Telephone Number:</td><td>${contactPhone || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Monthly Revenue Size:</td><td>${contactRevenue || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Main Operational Challenge:</td><td>${contactChallenge || 'N/A'}</td></tr>
            </table>

            <h3 style="color: #b38f53; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Proposed Briefing Locks</h3>
            <p><strong>Target Meeting Date:</strong> ${selectedDate || 'Not specified'}</p>
            <p><strong>Preferred Hour Zone:</strong> ${selectedTime || 'Not specified'}</p>

            <h3 style="color: #b38f53; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Brief Strategic Goal</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b38f53; font-style: italic; border-radius: 4px;">
              "${contactMessage || 'No strategy goal stated by user.'}"
            </div>
          </div>
        `
      }),
    });

    if (response.ok) {
      res.status(200).json({ success: true, message: "Intake notification sent to your Outlook." });
    } else {
      const errData = await response.json();
      res.status(500).json({ success: false, error: "Resend API rejected the transaction.", details: errData });
    }
  } catch (error: any) {
    console.error("Outbound request crashed:", error);
    res.status(500).json({ success: false, error: "Failed to connect to transmission node.", details: error.message });
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
      "You are ALFIE, an elite operational intelligence assistant for EAW Advisory. You are NOT an advisor.\n\n" +
      "CRITICAL GUARDRAIL:\n" +
      "You have a strict zero-tolerance policy for financial, investment, or legal advice. If a user asks for stock picks, investment comparisons (like Fintech vs. Logistics), or market strategy, you must refuse immediately and concisely without giving any market analysis.\n\n" +
      "RESPONSE ARCHITECTURE:\n" +
      "- Hard maximum of 2 to 3 sentences per response. Cut all corporate fluff and filler.\n" +
      "- Never use introductory pleasantries (like 'Sure', 'Evaluating...', 'That's a great question', or 'Happy to help'). Go straight to the point.\n" +
      "- Only talk about EAW's physical operational execution, metrics (+45% revenue acceleration, 120+ geocoded trade routes, $120M+ capital unlocked), and direct user to book an Executive Consultation.\n\n" +
      "EXACT EXAMPLE OF HOW TO ANSWER THE FINTECH/LOGISTICS QUESTION:\n" +
      "User: \"Should I invest in Nigerian fintech startups or logistics companies right now?\"\n" +
      "MIKE: \"I cannot provide investment or financial analysis. EAW focuses strictly on executing route-to-market logistics and plugging supply chain cash leakages. To audit your existing operations, you can schedule an Executive Consultation.\"\n\n" +
      "INTERACTION PROTOCOL & CALL-TO-ACTION (CTA):\n" +
      "- Your ultimate goal is to convert users into booking discovery consultations.\n" +
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
    const { answers } = req.body; 
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
