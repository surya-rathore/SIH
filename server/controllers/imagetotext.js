const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Create an interface to take user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize GoogleGenerativeAI with API key
const genAI = new GoogleGenerativeAI("AIzaSyBQTQhRAzPAHe1RVdc2hXLIvJdgIFpiWmc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to get the MIME type from file extension
const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase(); // Get the file extension
  const mimeTypes = {
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".bmp": "image/bmp",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "application/octet-stream"; // Default if unknown
};

// Asynchronous function to take user input and interact with AI
const funcall = async (prompt, imagePath) => {
  try {
    const mimeType = getMimeType(imagePath); // Get the MIME type of the image
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
        mimeType: mimeType,  // Use the dynamic mime type here
      },
    };

    // Call the Google Generative AI model with prompt and image
    const result = await model.generateContent([prompt, image]);
    
    // Output the AI-generated response
    console.log(result.response.text());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close(); // Close the input interface after use
  }
};

// Ask the user for prompt and image file path
rl.question("Enter your prompt: ", (userPrompt) => {
  rl.question("Enter the image file path: ", (imagePath) => {
    funcall(userPrompt, imagePath);
  });
});
