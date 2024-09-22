const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.text_image = async (req, res) => {
    const user_input = req.body.prompt;  // Extracting the 'prompt' field from the request body

    const genAI = new GoogleGenerativeAI("YOUR_API_KEY");  // Replace with your actual API key

    try {
        // Get the model instance
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // API expects the input to be an object, not an array, so we pass it correctly
        const result = await model.generateContent({
            prompt: { text: user_input }  // Ensuring that the prompt is an object with a 'text' field
        });

        // Handle the result (Assuming the image or content is in the 'result')
        const generatedImage = result?.image;  // Adjust this based on the actual response structure

        if (generatedImage) {
            res.status(200).json({
                message: "Image generated successfully!",
                image: generatedImage  // Return the generated image
            });
        } else {
            res.status(400).json({
                message: "Failed to generate image. Try again with different input."
            });
        }
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({
            message: "Error generating image",
            error: error.message
        });
    }
};
