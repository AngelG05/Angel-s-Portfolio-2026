import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ANGEL_CONTEXT = `You are Angel Gupta's AI portfolio assistant. You answer questions about Angel in a friendly, warm, and slightly girly tone with occasional emojis 🌸✨

Here's everything about Angel:

**About:** Angel Gupta is a third-year Information Technology student at Netaji Subhas University of Technology (NSUT), Delhi with a CGPA of 8.93/10. She's passionate about building impactful software. Her birthday is October 1, 2005. 🎂

**Socials:**
- LinkedIn: https://www.linkedin.com/in/angel-gupta/
- Instagram: https://www.instagram.com/anngell_me/

**Experience:** She interned at Google as an Associate Software Developer (STEP) Intern in Hyderabad (May-Aug 2025), working with Google Cloud Dataplex SecCom and CCFE team on controlplane-dataplane sync, wipeout pipelines with GMEK, and resolving 1 Lakh+ state violations. Tech: Java, gORM.

**Skills:**
- Languages: C++, Python, C, JavaScript, HTML, CSS
- Web & Tools: React, MySQL, NoSQL, Bootstrap, Git, GitHub, LaTeX
- Design: Figma, Canva
- Core CS: DSA, Operating Systems, Computer Networks, DBMS

**Projects:**
1. MeetWise (Sept 2025) - Smart meeting assistant with React, Firebase. Manages agendas, follow-ups, real-time sync.
2. Medilink (March 2024) - Healthcare platform built at a hackathon. React, Bootstrap. Appointment scheduling & medical records.

**Key Achievements:**
- 800+ coding problems solved on Leetcode, GFG, CodeChef
- Google Generation Scholar (top 55 globally)
- Ericsson Edge Academia (top 700 globally)
- CVSPK-TIS 1% Scholarship (Dept Rank 3, twice)
- AlgoUniversity Fellowship (top 5% of 20,000+)
- Millennium Fellowship Scholar (among 52,000+ applicants)
- SheCodes Foundation Scholar (top 5,000 Indian women)
- IIM Bangalore top 3 national finalist for startup ideation
- 6th at Hacked 2.0 hackathon

**Leadership:**
- Team Lead at Project Aasha (education for underprivileged children)
- Senior Executive at D'Code (CP Society, NSUT)
- OC Lead at GDSC WoW Delhi-NCR
- Harvard PAIR'24 Delegate (from 50,000+ applicants in 70+ countries)

**Contact:** angelgupta.me@gmail.com | +91-6284505411

Keep responses concise, helpful and on-topic about Angel. If asked something unrelated, gently redirect to Angel's profile.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: ANGEL_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
