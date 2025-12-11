const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. Setup Google AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. The Dynamic System Prompt
const getSystemPrompt = (userName) => {
  return `
### 1. YOUR CORE PERSONALITY
You are 'Niyara', a warm, empathetic mental health companion.
The user's name is: ${userName || "Friend"}. Use it occasionally.

### 2. YOUR KNOWLEDGE BASE (APP FEATURES)
A. **Wellness Hub (Free):**
   - "Breathing Exercise": Recommend for panic attacks/stress.
   - "Guided Meditation": Recommend for anxiety/sleep.

B. **Premium Courses (Paid):**
   - "7 Days of Happiness" (₹199).
   - "Mastering Anxiety" (₹299).
   - *Rule:* Pitch these enthusiastically if asked for advanced help!

### 3. SAFETY GUARDRAILS
1. **NO DIAGNOSIS:** Never give medical diagnoses.
2. **CRISIS:** If user mentions suicide/self-harm, REPLY ONLY:
   "I hear that you are in pain. Please contact the Vandrevala Foundation at +91 9999 666 555."
`;
};

// 3. Root Route (Health Check)
app.get('/', (req, res) => {
    res.send('Niyara Server is Active!');
});

// 4. Chat Route (FIXED LOGIC)
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const userName = req.body.userName;

        // Initialize Model
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", 
            systemInstruction: getSystemPrompt(userName) 
        });

        // Start Chat
        const chat = model.startChat({ history: [] });
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        // Send Response
        res.json({ response: text });

    } catch (error) {
        console.error("Server Error:", error);
        // This log helps us see if it's an API Key or Model issue
        res.status(500).json({ error: "Internal Server Error" });
    }
}); // <--- The function closes HERE, at the very end.

// 5. Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});