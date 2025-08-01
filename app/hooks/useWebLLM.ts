import { useState, useCallback } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { toast } from 'sonner';

export const useWebLLM = () => {
  const [engine, setEngine] = useState<webllm.MLCEngineInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const initializeEngine = useCallback(async () => {
    if (engine) return engine;

    setIsLoading(true);
    try {
      const newEngine = await webllm.CreateMLCEngine(
        "Llama-3.2-3B-Instruct-q4f16_1-MLC",
        {
          initProgressCallback: (progress) => {
            console.log("Model loading progress:", progress);
            setLoadingProgress(progress.progress || 0);
          },
        }
      );
      setEngine(newEngine);
      setIsLoading(false);
      return newEngine;
    } catch (error) {
      console.error("Failed to initialize WebLLM:", error);
      setIsLoading(false);
      toast.error("Failed to load Llama model");
      throw error;
    }
  }, [engine]);

  const generateWithWebLLM = useCallback(async (
    prompt: string,
    systemPrompt: string = "You are a helpful HR assistant that writes professional rejection emails."
  ) => {
    const activeEngine = engine || await initializeEngine();
    
    const messages: webllm.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ];

    const response = await activeEngine.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0]?.message?.content || '';
  }, [engine, initializeEngine]);

  return {
    generateWithWebLLM,
    isLoading,
    loadingProgress,
    engine
  };
};