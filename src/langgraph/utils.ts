import fs from 'fs';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
// import { type AgentRunnableSequence } from "langchain";

// Max output tokens are 8,192.
export const MAX_OUTPUT_TOKENS = 8192;

export function createGeminiModel(model: string = 'gemini-1.5-pro') {
  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    // model: "gemini-pro",
    model,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0,
    maxRetries: 0,
    // safetySettings: [
    //   {
    //     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    //     threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    //   },
    // ],
  });
}

export async function generateImage(agent: any, filename: string = 'test.jpg') {
  const graph = agent.getGraph();
  const image = await graph.drawMermaidPng();
  const arrayBuffer = await image.arrayBuffer();
  fs.writeFileSync(filename, Buffer.from(arrayBuffer), 'binary');
}
