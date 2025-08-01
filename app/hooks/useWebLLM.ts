import { useState, useEffect } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { toast } from 'sonner';
import { webllmEngine } from '@/app/utils/webllmEngine';

export const useWebLLM = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isEngineReady, setIsEngineReady] = useState(false);

  const initializeEngine = async () => {
    if (webllmEngine.isLoaded()) {
      setIsEngineReady(true);
      return;
    }

    setIsLoading(true);
    try {
      await webllmEngine.getEngine((progress) => {
        setLoadingProgress(progress);
      });
      setIsEngineReady(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to initialize WebLLM:", error);
      setIsLoading(false);
      toast.error("Failed to load Llama model");
      throw error;
    }
  };

  const generateWithWebLLM = async (
    prompt: string,
    systemPrompt: string = "You are a helpful HR assistant that writes professional rejection emails."
  ) => {
    const activeEngine = await webllmEngine.getEngine((progress) => {
      setLoadingProgress(progress);
    });

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
  };

  useEffect(() => {
    setIsEngineReady(webllmEngine.isLoaded());
  }, []);


  return {
    generateWithWebLLM,
    isLoading,
    loadingProgress,
    isEngineReady,
    initializeEngine
  };
};