const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.imgtotext = async (req, res) => {
    console.log('Request Body:', req.body);  // Log the request body
    console.log('Uploaded File:', req.file);  // Log the uploaded file

    const prompt = req.body.textInput; // Get text input from body
    const imagePath = req.file ? req.file.path : null; // Get the uploaded image path

    if (!prompt) {
        return res.status(400).send('Text input is required');
    }

    if (!imagePath) {
        return res.status(400).send('No image uploaded');
    }

    const genAI = new GoogleGenerativeAI("AIzaSyBQTQhRAzPAHe1RVdc2hXLIvJdgIFpiWmc"); // Replace with your API key

    try {
        // Normalize the path to handle both '/' and '\' correctly
        const normalizedImagePath = path.normalize(imagePath);
        console.log(normalizedImagePath)
        // Get the file extension of the uploaded image
        const ext = path.extname(normalizedImagePath).toLowerCase();
        console.log('File Extension:', ext); // Log the file extension

        // Dynamically get the MIME type based on the file extension
        const mimeType = mime.lookup(ext);
        console.log('MIME Type:', mimeType); // Log the MIME type

        if (!mimeType || !mimeType.startsWith('image/')) {
            console.error('MIME type validation failed');
            return res.status(400).send('Invalid image type');
        }

        // Read the image file and convert it to base64
        const imageBuffer = fs.readFileSync(normalizedImagePath);
        const base64Image = imageBuffer.toString('base64');

        // Prepare the image object
        const image = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };

        // Generate content using Google Generative AI
        const result = await genAI.generateContent({ prompt, image });

        // Send the generated result back to the frontend
        res.json({ result: result.response.text });
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating content');
    } finally {
        // Cleanup: remove the uploaded file after processing
        if (imagePath) {
            fs.unlinkSync(imagePath);
        }
    }
};
