// handler
import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  try {
  const { text, lang } = req.body;

  if (!text || !lang) {
    return res.status(400).json({error : "missing required parameters"})
  }

  // Map the languages to the correct models
  const languageModels = {
    "en-hi": "Helsinki-NLP/opus-mt-en-hi",
    "en-es": "Helsinki-NLP/opus-mt-en-es",
    "en-de": "Helsinki-NLP/opus-mt-en-de",
    "en-fr": "Helsinki-NLP/opus-mt-en-fr",
    // Add more models as needed
  };

  const translationResponse = await inference.translation({
    model: languageModels[lang], // Select the model based on the language
    inputs: text,
  });

  // Return the results
  res.status(200).json({
    translation_text: translationResponse.translation_text,
  });
} catch (error) {
  console.error("Error in translation api", error);
  res.status(500).json( { error: "Internal sergver error" } )
}
}
