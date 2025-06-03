import OpenAI from 'openai';
import * as Sentry from '@sentry/nextjs';

// Custom error class for OpenRouter API issues
export class OpenRouterError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'OpenRouterError';
  }
}

// Common types for completion parameters
export interface CompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
}

interface CreateOpenAIOptions {
  apiKey?: string;
}

function createOpenRouterOpenAI({
  apiKey = process.env.OPENROUTER_API_KEY,
}: CreateOpenAIOptions = {}) {
  if (!apiKey) {
    const error = new OpenRouterError('Missing OPENROUTER_API_KEY');
    Sentry.captureException(error);
    throw error;
  }
  
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey,
  });
}

// Non-streaming chat completion
export async function createChatCompletion(
  params: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming
) {
  const openai = createOpenRouterOpenAI();
  try {
    return await openai.chat.completions.create(params);
  } catch (error) {
    const wrappedError = new OpenRouterError(
      `Chat completion failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error
    );
    Sentry.captureException(wrappedError, {
      extra: { model: params.model, messages: params.messages.length },
    });
    throw wrappedError;
  }
}

// Streaming chat completion
export async function createStreamingChatCompletion(
  params: OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming
) {
  const openai = createOpenRouterOpenAI();
  try {
    return await openai.chat.completions.create({
      ...params,
      stream: true,
    });
  } catch (error) {
    const wrappedError = new OpenRouterError(
      `Streaming chat completion failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error
    );
    Sentry.captureException(wrappedError, {
      extra: { model: params.model, messages: params.messages.length },
    });
    throw wrappedError;
  }
}

// Helper function to create completion with default parameters
export async function createSimpleChatCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  options: CompletionOptions = {}
) {
  const defaultModel = process.env.OPENROUTER_DEFAULT_MODEL || 'openai/gpt-3.5-turbo';
  
  return createChatCompletion({
    model: options.model || defaultModel,
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens,
    top_p: options.top_p,
  });
}