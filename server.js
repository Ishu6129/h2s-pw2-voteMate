/**
 * VoteMate Backend Server
 * Secure Proxy for Google Gemini 1.5 Flash API
 * Built for Hack2Skill Hackathon
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const app = express();
const PORT = process.env.PORT || 3000;

// Structured Logging for Google Cloud
const transports = [new winston.transports.Console()];

// Only add Google Cloud logging if we're in a cloud environment
if (process.env.K_SERVICE || process.env.GOOGLE_CLOUD_PROJECT) {
  try {
    const loggingWinston = new LoggingWinston();
    transports.push(loggingWinston);
  } catch (err) {
    console.error('Failed to initialize Google Cloud Logging:', err.message);
  }
}

const logger = winston.createLogger({
  level: 'info',
  transports: transports,
});


// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      "script-src-attr": ["'unsafe-inline'"],
      "img-src": ["'self'", "data:", "https://*"],
      "connect-src": ["'self'", "https://*"],
    },
  },
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use(cors());
app.use(express.json());

// Simple In-Memory Cache
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const VITE_GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const API_VERSION = 'v1beta';
const MODEL_NAME = 'gemini-2.5-flash';

if (!VITE_GEMINI_API_KEY) {
  logger.warn('⚠️ GEMINI_API_KEY not found in environment variables');
} else {
  logger.info('🔑 API Key Status: Configured');
}

app.post('/api/chat', async (req, res) => {
  const { message, lang, langName } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Check Cache
  const cacheKey = `${lang}:${message.toLowerCase().trim()}`;
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      logger.info(`[Cache Hit] Request: "${message.substring(0, 20)}..."`);
      return res.json(cached.data);
    }
    cache.delete(cacheKey);
  }

  logger.info(`[Chat Request] Lang: ${langName || lang}, Msg: "${message.substring(0, 30)}..."`);

  if (!VITE_GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const GEMINI_URL = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL_NAME}:generateContent?key=${VITE_GEMINI_API_KEY}`;

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are VoteMate, an expert assistant for Indian elections. 
            User is asking in ${langName || 'their language'}. 
            Keep response educational, neutral, and helpful. 
            Use local context (Lok Sabha, Vidhan Sabha, ECI, NVSP).
            IMPORTANT: Respond ONLY in ${langName || 'the same language as the user'}.
            
            Question: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();

    if (data.error) {
      logger.error('Gemini API Error:', data.error);
      throw new Error(data.error.message || 'Gemini API Error');
    }

    const finalResponse = { text: botMessage, source: 'gemini' };
    
    // Save to Cache
    cache.set(cacheKey, { data: finalResponse, timestamp: Date.now() });

    res.json(finalResponse);
  } catch (error) {
    logger.error('Chat API Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message
    });
  }
});

// Health Check for Google Cloud Run
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// ── Serve static frontend files (after API routes) ────
app.use(express.static('.'));

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`🚀 VoteMate Backend running at http://localhost:${PORT}`);
    logger.info(`🔑 API Key Status: ${VITE_GEMINI_API_KEY ? 'Configured' : 'MISSING'}`);
    logger.info(`🤖 Gemini Model: ${MODEL_NAME} (${API_VERSION})`);
  });
}

module.exports = app;

