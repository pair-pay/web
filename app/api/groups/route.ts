import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL not configured' },
      { status: 500 },
    );
  }

  const body = await req.json();
  const url = `${backendUrl}/groups`;

  console.log('Creating group:', JSON.stringify(body));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}
