/**
 * VoteMate Backend Server
 * Secure Proxy for Google Gemini 1.5 Flash API
 * Built for Hack2Skill Hackathon
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── Gemini API Config ──────────────────────────────────
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
// gemini-2.5-flash — confirmed available via v1beta REST API
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/chat', async (req, res) => {
  const { message, lang, langName } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!GEMINI_API_KEY) {
    console.error('SERVER_ERROR: GEMINI_API_KEY is missing in environment');
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const systemPrompt = `You are VoteMate, an Indian election assistant. 
  IMPORTANT: You must respond ONLY in the ${langName || 'English'} language. 
  Even if the user asks in English, translate your answer to ${langName || 'English'}.
  Help citizens with voter registration and election info. Be concise. 🇮🇳`;

  try {
    console.log(`[${new Date().toISOString()}] Chat request: "${message.substring(0, 50)}..." (Lang: ${langName})`);

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.95,
          topK: 40
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('GEMINI_API_ERROR:', JSON.stringify(data, null, 2));
      return res.status(response.status).json({ 
        error: 'Gemini API Error', 
        details: data.error?.message || 'Unknown error' 
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      if (data.promptFeedback?.blockReason) {
        return res.json({ 
          text: "I'm sorry, but I cannot answer that specific question due to safety filters. Please try asking about the election process instead.",
          source: 'gemini_blocked'
        });
      }
      throw new Error('Empty response from Gemini');
    }

    res.json({ text, source: 'gemini' });

  } catch (err) {
    console.error('SERVER_ERROR:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ── Serve static frontend files (after API routes) ────
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`🚀 VoteMate Backend running at http://localhost:${PORT}`);
  console.log(`🔑 API Key Status: ${GEMINI_API_KEY ? 'Configured' : 'MISSING'}`);
  console.log(`🤖 Gemini Model: gemini-1.5-flash (v1beta)`);
});
