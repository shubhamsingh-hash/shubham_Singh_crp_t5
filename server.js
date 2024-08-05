const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
app.use(bodyParser.json());
const configuration = new Configuration({
  apiKey: 'Ysk-_RFKaA1MHujK9HTAmkUJmhAJl-nL2l1hR-BVuiLAcUT3BlbkFJ8CW1Lh9C1j5zIg7AUMarjNeKuerMIMjwuOgfrqdX8A', 
});
const openai = new OpenAIApi(configuration);
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const completion = await openai.createCompletion({
      model: 'GPT 3.5 Turbo',
      prompt: userMessage,
      max_tokens: 150,
      temperature: 0.7,
    });
    const botReply = completion.data.choices[0].text.trim();
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ reply: 'Something went wrong, please try again later.' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
