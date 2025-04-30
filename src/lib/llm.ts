import OpenAI from 'openai';
import * as Sentry from '@sentry/nextjs';

interface CreateOpenAIOptions {
  apiKey?: string;
}

function createOpenRouterOpenAI({
  apiKey = process.env.OPENROUTER_API_KEY,
}: CreateOpenAIOptions = {}) {
  if (!apiKey) Sentry.captureException(new Error('Missing OPENROUTER_API_KEY'));
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey,
  });
}

// Example helper for chat completion
export async function createChatCompletion(params: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming) {
  const openai = createOpenRouterOpenAI();
  try {
    return await openai.chat.completions.create(params);
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}