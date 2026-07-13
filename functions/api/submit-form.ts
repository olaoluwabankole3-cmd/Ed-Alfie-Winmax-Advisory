export const onRequestPost: PagesFunction<{ RESEND_API_KEY: string }> = async (context) => {
  try {
    const {
      contactName,
      contactEmail,
      contactCompany,
      contactPhone,
      contactRevenue,
      contactChallenge,
      selectedDate,
      selectedTime,
      contactMessage
    } = await context.request.json() as any;

    // Fire the data to Resend securely using the hidden environment variable
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Website Intake <onboarding@resend.dev>',
        to: 'advisors@eawadvisory.com', 
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
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const errorData = await response.json();
      return new Response(JSON.stringify({ success: false, error: errorData }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
