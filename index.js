import express from 'express';
import { config } from 'dotenv';
import OpenAI from "openai";

// Load environment variables
config();

// Create a web server
const app = express();
const port = process.env.PORT || 3034;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define a route to handle questions
app.get('/tanya-sepuh', async (req, res) => {
  try {
    // Call the OpenAI API to generate an answer
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: req.query.question,
      max_tokens: 500,
      temperature: 0
    });


    // Check if completion.data exists and contains response
    if (completion && completion.choices) {
      console.log(completion);

      // Get the first choice's text
      const cleanedText = completion.choices[0].text.replace(/[\r\n"']+/g, '');
      const text = cleanedText;
      res.send(text);
    } else {
      res.status(500).send('No response from OpenAI API');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

