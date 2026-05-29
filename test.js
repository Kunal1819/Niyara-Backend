const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI("AIzaSyC94U8FiUga4gQgH8A-Nm4QxMnGDFBV7ic");

async function runTest() {
  try {
    console.log("1. Contacting Google...");
  
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Hello, are you alive?");
    const response = await result.response;
    const text = response.text();
    
    console.log("------------------------------------------------");
    console.log("✅ SUCCESS! Google replied:");
    console.log(text);
    console.log("------------------------------------------------");
    console.log("👉 CONCLUSION: This Key works. Put THIS Key in Render.");
    
  } catch (error) {
    console.log("❌ FAILURE. Google rejected the key.");
    console.log("Error details:", error.message);
  }
}

runTest();
