// app/api/score/route.js
import { NextResponse } from 'next/server';
import { calculateScore } from '../../../data/calculateScore.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { companyName, internshipLink, description } = body;

    // Basic input validation
    if (!companyName || !internshipLink) {
      return NextResponse.json(
        { error: 'companyName and internshipLink are required' },
        { status: 400 }
      );
    }

    // Call our scoring function
    const result = calculateScore(companyName, internshipLink, description || '');

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
