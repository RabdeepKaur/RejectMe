import { NextRequest, NextResponse } from 'next/server';
import { generateRejectionEmailprompt } from '@/lib/generateEmailPrompt';

 export async function POST(request: NextRequest) {
    console.log('[API] /api/generate-prompt called');
  try {
    const body = await request.json();
    const {promptText } = body;
console.log('Request body:', body); // Debug log
    if (!promptText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const email = await generateRejectionEmailprompt({
     promptText: promptText.trim(),
    });
    if (!email) {
      return NextResponse.json(
        { error: 'Failed to generate email' },
        { status: 500 }
      );
    }
    return NextResponse.json({ email });

  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof Error) {
      if (error.message.includes('403')) {
        return NextResponse.json(
          { error: 'Invalid API key or API access denied. Please check your Gemini API key.' },
          { status: 403 }
        );
      }
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please check your Gemini API usage limits.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}

