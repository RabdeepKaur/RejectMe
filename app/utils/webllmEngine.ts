import * as webllm from '@mlc-ai/web-llm';

class WebLLMEngine {
  private static instance: WebLLMEngine;
  private engine: webllm.MLCEngineInterface | null = null;
  private initializationPromise: Promise<webllm.MLCEngineInterface> | null = null;

  private constructor() {}

  static getInstance(): WebLLMEngine {
    if (!WebLLMEngine.instance) {
      WebLLMEngine.instance = new WebLLMEngine();
    }
    return WebLLMEngine.instance;
  }

  async getEngine(
    progressCallback?: (progress: number) => void
  ): Promise<webllm.MLCEngineInterface> {
    if (this.engine) {
      return this.engine;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.initializeEngine(progressCallback);
    
    try {
      this.engine = await this.initializationPromise;
      return this.engine;
    } finally {
      this.initializationPromise = null;
    }
  }

  private async initializeEngine(
    progressCallback?: (progress: number) => void
  ): Promise<webllm.MLCEngineInterface> {
    const engine = await webllm.CreateMLCEngine(
      "Llama-3.2-3B-Instruct-q4f16_1-MLC",
      {
        initProgressCallback: (progress) => {
          console.log("Model loading progress:", progress);
          if (progressCallback) {
            progressCallback(progress.progress || 0);
          }
        },
      }
    );
    return engine;
  }

  isLoaded(): boolean {
    return !!this.engine;
  }
}

export const webllmEngine = WebLLMEngine.getInstance();