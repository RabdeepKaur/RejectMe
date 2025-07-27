import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  const keyLength = process.env.GEMINI_API_KEY?.length || 0;
  
  res.status(200).json({
    hasGeminiKey,
    keyLength,
    firstChars: process.env.GEMINI_API_KEY?.substring(0, 10) || 'none',
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('GEMINI') || key.includes('API')
    )
  });
}