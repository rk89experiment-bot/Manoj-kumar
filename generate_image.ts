import { GoogleGenAI } from "@google/genai";

async function generateProductImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: "A professional, high-resolution studio product photograph of an Ayurvedic pain relief oil bottle. The bottle is made of dark amber glass with a premium label that says 'Yogita Ayurvedic Oil' in elegant typography, with 'योगिता आयुर्वेदिक तेल' written below it in Hindi. The label features traditional Indian herbal motifs in gold and green. The bottle is standing on a rustic dark wood surface, surrounded by a few natural ingredients like dried herbs, a piece of ginger, and a small green leaf. The background is a soft, out-of-focus natural green. Lighting is warm and cinematic, emphasizing the texture of the glass and the premium feel of the product. Real photo style.",
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

// This is a script to be used by the agent to get the image string.
// I will run this logic mentally or via a temporary tool if I could, 
// but I have to do it in the flow.
