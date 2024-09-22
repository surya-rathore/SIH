const axios = require('axios');

exports.chatBot = async (req, res) => {
  try {
    const apiKey = process.env.OPEN_API_KEY_CHATBOT;  // Replace with your OpenAI API Key

    // Assuming user_input is sent as { "message": "User's message" }
    const user_input = req.body.message;

    const requestData = {
      model: "gpt-3.5-turbo",  // You can choose the model like gpt-4 if enabled on your account
      messages: [{ role: "user", content: user_input }]
    };

    // Call the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // Get the AI response
    const aiResponse = response.data.choices[0].message.content;

    // Send the response back to the client
    res.status(200).json({ message: aiResponse });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send("Internal Server Error");
  }
};
