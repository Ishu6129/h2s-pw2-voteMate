# 🗳️ VoteMate — India's Smart Election Assistant

> Built for **Hack2Skill Hackathon** · Vertical: **Civic Tech / Public Service Assistant**

[![Live Demo](https://img.shields.io/badge/Live-Demo-FF9933?style=for-the-badge)](https://vote-mate-web.web.app)
[![GitHub](https://img.shields.io/badge/GitHub-Public-138808?style=for-the-badge&logo=github)](https://github.com/your-username/voteMate)

---

## 🎯 Chosen Vertical

**Civic Tech / Public Service Assistant** — VoteMate helps Indian citizens understand the election process, voter registration steps, timelines, and their democratic rights through an interactive, AI-powered assistant available in **7 Indian languages**.

---

## 📋 What It Does

VoteMate is a static, zero-install web application that:

| Feature | Description |
|---------|-------------|
| 🤖 **AI Chat (Gemini)** | Answers election questions using Google's Gemini 1.5 Flash API |
| 🔄 **Rule-Based Fallback** | Built-in answers for 16+ common election topics (works offline) |
| 🌐 **7 Languages** | English, Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati |
| 🏛️ **Election Types** | Lok Sabha + State Assembly — switchable in real-time |
| 📅 **Interactive Timeline** | Step-by-step election journey from announcement to result |
| 🗳️ **Registration Guide** | Eligibility, steps, documents, and official ECI resource links |
| ❓ **FAQ Accordion** | 8 commonly asked voter questions |
| 📖 **How-To Guide** | 6-step visual guide to navigating the app |
| 📸 **India Photo Gallery** | Scrollable gallery with parallax animations |
| 📱 **Fully Responsive** | Works on mobile, tablet, desktop — all platforms |

---

## 🏗️ Approach & Logic

### Architecture
```
voteMate/
├── index.html              # Main HTML (semantic, accessible)
├── server.js               # Node.js + Express Backend (Secure Proxy)
├── package.json            # Dependencies & start scripts
├── css/
│   ├── style.css           # Base variables, reset, utilities (Soft Light Theme)
│   ├── ...                 # Other modular CSS files
├── js/
│   ├── translations.js     # i18n strings for 7 languages
│   ├── data.js             # All content: process steps, timelines, FAQ, guides
│   ├── ui.js               # UI rendering functions (pure DOM)
│   ├── chatbot.js          # Chat controller (calls backend API)
│   └── app.js              # App controller: GSAP animations, parallax, 3D tilt
└── Dockerfile              # Container config for Cloud Run
```

### Decision Logic (Chatbot)
```
User sends message
    │
    ├─► Backend API (Node.js)
    │       ├── API Key present in server environment?
    │       │       ├── YES → Call Gemini 1.5 Flash (v1 endpoint)
    │       │       │           ├── 200 OK  → Return AI response
    │       │       │           └── Error   → Log error, return fail signal
    │       │       └── NO  → Return fail signal
    │       │
    │       └─► Server-side Rate Limiting & Error Handling
    │
    └─► Frontend Fallback (if Backend fails)
            ├── Rule-based matcher (17 keyword groups)
            │       ├── Match found → Show pre-written answer
            │       └── No match    → Show default help message
            └── Multilingual support for all responses
```

---

## 🔧 How the Solution Works

1. **Load** `index.html` — all CSS and JS load from separate files for maintainability.
2. **Language** is read from `localStorage` (persists across sessions).
3. **Election type** (Lok Sabha/State) is toggled — all content re-renders from `data.js`.
4. **GSAP** powers scroll-triggered animations, hero parallax, and 3D card tilt.
5. **Chat flow**: Frontend sends request to Node.js backend → Backend securely calls Gemini API → Frontend falls back to rule-based responses if backend returns an error.
6. **API key** is stored securely on the server environment, never reaching the user's browser.

---

## 🌐 Google Services Integration

| Service | How Used |
|---------|----------|
| **Gemini 1.5 Flash API** | AI-powered election Q&A in 7 languages |
| **Google Fonts** | Inter + Noto Sans Devanagari for multilingual typography |
| **Google Cloud Run** | Scalable containerized deployment |

---

## ♿ Accessibility

- Semantic HTML5 (`nav`, `section`, `footer`, `main`, `role` attributes).
- `aria-label`, `aria-expanded`, `aria-live`, `aria-modal` on all interactive elements.
- Keyboard navigable (tab order, `Enter` to submit chat).
- Screen reader support (`sr-only` class for hidden labels).
- Color contrast ratios meet WCAG AA standards on soft light theme.
- `loading="lazy"` on images; `onerror` fallback for broken images.

---

## 🔒 Security

- **Secure Proxy Architecture**: All AI processing is offloaded to a Node.js backend.
- **API Key Protection**: The Gemini API key is stored in server-side environment variables, making it impossible for users to extract it via the browser.
- **Sanitized Inputs**: Backend validates and logs all incoming chat requests.
- **Rule-Based Fallback**: Built-in protection against API downtime or safety blocks.
- **Rel="noopener noreferrer"** on all external links to prevent tab-nabbing.

---

## 📐 Assumptions Made

1. Users have a modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).
2. Gemini free tier (15 RPM) is sufficient for demo — rate limiter handles this gracefully.
3. All election content is educational, based on ECI's publicly available information.
4. Users may not have an API key — rule-based fallback handles 16+ common questions instantly.

---

## 🧪 Testing & Validation

To verify the application's functionality:
1. **Multilingual Toggle**: Click the flag icon and switch between languages. All UI text, timelines, and chatbot suggestions should update instantly.
2. **Election Switch**: Toggle between "Lok Sabha" and "State". The "Election Process" and "Timeline" sections should re-render with specific data for each.
3. **Chatbot Fallback**: Ask "How do I register?" without an API key. You should receive a pre-written rule-based answer.
4. **AI Chat**: Add a Gemini API key in settings and ask "What is the role of an MP?". You should receive a generated response in the current language.
5. **Responsiveness**: Resize the browser or use DevTools to simulate mobile devices. The navigation and grid layouts should adapt smoothly.
6. **Accessibility**: Use `Tab` to navigate. Focus states should be clearly visible on all interactive elements.

---

## 🚀 Deployment

### Cloud Run (Recommended)
The project includes a `Dockerfile` for easy deployment to Google Cloud Run.
```bash
# Build the image
gcloud builds submit --tag gcr.io/[PROJECT_ID]/votemate

# Deploy to Cloud Run
gcloud run deploy votemate --image gcr.io/[PROJECT_ID]/votemate --platform managed --allow-unauthenticated
```

### Local Run
```bash
1. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```

2. **Install & Start**:
   ```bash
   npm install
   node server.js
   ```

3. **Open App**:
   Serve the root directory (e.g., `npx http-server ./ -p 5501`).
```

---

## 📄 License

MIT License — Free to use for educational purposes.

---

*Made with ❤️ for India's Democracy · Jai Hind! 🇮🇳*
