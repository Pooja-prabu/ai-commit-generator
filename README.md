# AI Commit Message Generator 🚀

An AI-powered developer tool that converts code changes, git diffs, or error logs into **clean commit messages, PR titles, PR descriptions, and summaries** — instantly.

Built for **hackathons**, **developers**, and **students** who want to ship faster without worrying about perfect commit wording.

---

## ✨ Features

- 🔹 Generate **conventional commit messages**
- 🔹 Auto-generate **PR titles**
- 🔹 Create **detailed PR descriptions**
- 🔹 Short human-readable **code summary**
- 🔹 Secure backend (API key never exposed)
- 🔹 Uses **FREE AI models (Groq + LLaMA 3)**
- 🔹 Beginner-friendly tech stack

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- Groq SDK (LLaMA 3 model)
- dotenv

---

## 📸 Demo

1. Paste your code changes or git diff
2. Click **Generate**
3. Get:
   - Commit message
   - PR title
   - PR description
   - Summary

Perfect for GitHub pull requests and team collaboration.

---

## 🧠 Example

**Input**
fix(login): handle null user object

added null check

added JWT expiry validation


**Output**


fix(auth): prevent login crash and validate JWT expiry


---

## 🚀 How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-commit-generator.git
cd ai-commit-generator

2️⃣ Start the backend
cd backend
npm install
node server.js


Create a .env file inside backend/:

GROQ_API_KEY=your_groq_api_key_here
PORT=3001

3️⃣ Start the frontend
cd ..
http-server -p 3000


Open:

http://localhost:3000

🔐 Environment Variables
Variable	Description
GROQ_API_KEY	Free Groq API key
PORT	Backend server port

⚠️ .env is ignored using .gitignore for security.

💡 Why this project?

Solves a real developer pain point

Shows practical AI usage

Hackathon-ready

Resume-worthy

Easy to extend

🔮 Future Improvements

GitHub PR auto-creation

File upload for .diff files

Dark mode

Download PR as Markdown

Multi-language support

👩‍💻 Author

Built by Pooja Prabu
For learning, hackathons, and real-world developer productivity.




