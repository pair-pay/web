import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL not configured" },
      { status: 500 }
    );
  }

  let url = `${backendUrl}/expenses/split-types`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Puedes reenviar cookies, tokens, etc. si hace falta
    },
    // Puedes reenviar credenciales si es necesario
  });

  const data = await response.json();

  console.log("Data received from API", JSON.stringify(data, null, 2));

  return NextResponse.json(data, { status: response.status });
}
