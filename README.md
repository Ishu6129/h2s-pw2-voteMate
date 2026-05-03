# 🗳️ VoteMate — India's Smart Election Assistant

> Built for **Hack2Skill Hackathon** · Vertical: **Civic Tech / Public Service Assistant**

[![Live Demo](https://img.shields.io/badge/Live-Demo-FF9933?style=for-the-badge)](https://votemate-331198219508.asia-south1.run.app)
[![GitHub](https://img.shields.io/badge/GitHub-Public-138808?style=for-the-badge&logo=github)](https://github.com/Ishu6129/h2s-pw2-voteMate)

---

## 🎯 Chosen Vertical

**Civic Tech / Public Service Assistant** — VoteMate helps Indian citizens understand the election process, voter registration steps, timelines, and their democratic rights through an interactive, AI-powered assistant available in **7 Indian languages**.

---

## 📋 What It Does

VoteMate is a professional web application that provides:

| Feature | Description |
|---------|-------------|
| 🤖 **AI Chat (Gemini 2.5)** | Answers election questions using Google's **Gemini 2.5 Flash** API |
| 🔄 **Rule-Based Fallback** | Built-in answers for 16+ common election topics (works instantly) |
| 🌐 **7 Languages** | English, Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati |
| 🏛️ **Election Types** | Lok Sabha + State Assembly — switchable in real-time |
| 📅 **Interactive Timeline** | Step-by-step election journey from announcement to result |
| 🗳️ **Registration Guide** | Eligibility, steps, documents, and official ECI resource links |
| ❓ **FAQ Accordion** | 8 commonly asked voter questions |
| 📱 **Fully Responsive** | Works on mobile, tablet, desktop — all platforms |

---

## 🏗️ Approach & Logic

### Architecture
VoteMate uses a **Secure Proxy Architecture** to protect API keys and ensure high performance:
1. **Frontend**: Pure HTML/CSS/JS with GSAP for premium animations.
2. **Backend**: Node.js/Express server that acts as a secure proxy for the Gemini API.
3. **Deployment**: Containerized via Docker and deployed on **Google Cloud Run**.

### Decision Logic (Chatbot)
1. User sends a message.
2. Frontend calls the `/api/chat` endpoint on the Express server.
3. Server calls **Gemini 2.5 Flash** (v1beta) with a custom system prompt.
4. If the AI call fails (e.g., safety filters, rate limits), the system automatically falls back to **Rule-Based Matching** to ensure the user always gets an answer.

---

## 🔧 How to Deploy & Update

### Initial Deployment
The app is deployed to Cloud Run using the following command:
```bash
gcloud run deploy votemate --source . --project promptwars-virtual2 --region asia-south1 --allow-unauthenticated --set-env-vars "GEMINI_API_KEY=your_key"
```

### How to Refresh/Update
If you make any changes to the code and want to refresh the live site:
1. Save your changes locally.
2. Run the deployment command again from the terminal:
   ```bash
   gcloud run deploy votemate --source . --quiet
   ```
3. Cloud Run will automatically build a new container image, deploy it, and switch 100% of the traffic to the new version.

---

## 🌐 Google Services Integration

| Service | How Used |
|---------|----------|
| **Gemini 2.5 Flash API** | AI-powered multi-lingual election assistant |
| **Google Cloud Run** | Scalable containerized hosting |
| **Google Fonts** | Inter + Noto Sans Devanagari for professional typography |

---

## 📐 Assumptions Made

1. **AI Safety**: The system prompt instructs Gemini to be a neutral educational assistant.
2. **Rate Limiting**: A frontend rate limiter (4s) prevents API spam.
3. **Multilingual**: Assumes the user might ask in English but want a response in their selected language.

---

## 🧪 Testing & Validation

1. **Gemini Test**: Ask "Can I win an election?" or "What is a coalition government?". The bot provides contextual, AI-generated answers.
2. **Fallback Test**: Ask "What is EVM?". The bot provides a quick, accurate response (either AI or rule-based).
3. **Mobile Test**: The UI uses a fluid grid system to ensure accessibility on all devices.

---

## 📄 License

MIT License — Free to use for educational purposes.

---

*Made with ❤️ for India's Democracy · Jai Hind! 🇮🇳*
