import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL not configured' },
      { status: 500 },
    );
  }

  const { id } = params;
  const url = `${backendUrl}/groups/${id}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // You can forward cookies, tokens, etc. if needed
    },
  });

  const data = await response.json();

  console.log(
    `Group ${id} data received from API`,
    JSON.stringify(data, null, 2),
  );

  return NextResponse.json(data, { status: response.status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL not configured' },
      { status: 500 },
    );
  }

  const { id } = params;
  const body = await req.json();
  const url = `${backendUrl}/groups/${id}`;

  console.log(`Updating group ${id}:`, JSON.stringify(body));

  const response = await fetch(url, {
    method: 'PUT',
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL not configured' },
      { status: 500 },
    );
  }

  const { id } = params;
  const url = `${backendUrl}/groups/${id}`;

  console.log(`Deleting group ${id}`);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  }

  // DELETE operations might return empty response
  const contentLength = response.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 0) {
    const data = await response.json();
    return NextResponse.json(data);
  }

  return NextResponse.json({ success: true });
}
