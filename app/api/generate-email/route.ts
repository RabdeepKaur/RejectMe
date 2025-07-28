
// app/api/gemini/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateRejectionEmail } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateName, position, companyName, reason, tone, length } = body;

    if (!candidateName || !position || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const email = await generateRejectionEmail({
       candidateEmail: body.candidateEmail, // Optional field
      candidateName,
      position,
      companyName,
      reason,
      tone,
      length,
    });

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
