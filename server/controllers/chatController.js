const axios = require('axios');

exports.chat = async (req, res) => {
  try {
    const { input } = req.body;

    // Send the input to the external API (e.g., Jina AI API)
    const apiResponse = await axios.post('https://api.jina.ai/v1/chatbot', {
      text: input // Replace 'text' with the actual parameter name expected by the API
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY', // Replace with the required API key or token if needed
        'Content-Type': 'application/json'
      }
    });

    // Get the data from the API response
    const responseData = apiResponse.data;

    // Send the data back to the client
    res.json({ reply: responseData });

  } catch (error) {
    console.error('Error while calling the external API:', error.message);
    res.status(500).send('Internal error occurred');
  }
};
