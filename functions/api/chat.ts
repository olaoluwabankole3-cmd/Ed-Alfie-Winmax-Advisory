export const onRequestPost: PagesFunction<{ GEMINI_API_KEY: string }> = async (context) => {
  try {
    const { messages } = await context.request.json() as any;
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request body: messages array is required." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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

    // Format historical messages for the Gemini API structure
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content }]
    }));

    // Construct request payload matching the standard Gemini developer platform API endpoints
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${context.env.GEMINI_API_KEY}`;

    const geminiResponse = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.7,
        }
      })
    });

    const data = await geminiResponse.json() as any;

    if (!geminiResponse.ok) {
      return new Response(JSON.stringify({ error: "Gemini execution failed", details: data }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am processing your query. Please schedule an Executive Consultation for a complete audit.";

    return new Response(JSON.stringify({ content: aiText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
