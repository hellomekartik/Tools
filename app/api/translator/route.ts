import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text")
  const language = searchParams.get("language")

  if (!text || !language) {
    return NextResponse.json({ error: "Text and language are required" }, { status: 400 })
  }

  try {
    const apiUrl = `https://translate.apisimpacientes.workers.dev/?language=${language}&text=${encodeURIComponent(text)}`

    console.log("[v0] Calling translator API:", apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "text/plain, application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    const responseText = await response.text()

    console.log("[v0] API response status:", response.status)
    console.log("[v0] API response body:", responseText)

    if (!response.ok) {
      console.log("[v0] API returned error status")
      return NextResponse.json({ error: "Translation API error" }, { status: 500 })
    }

    let translatedText = responseText.trim()

    // If response looks like JSON, try to parse it
    if (translatedText.startsWith("{")) {
      try {
        const data = JSON.parse(translatedText)
        // Try common response field names
        translatedText =
          data.translation ||
          data.translatedText ||
          data.text ||
          data.result ||
          data.translated ||
          data.output ||
          data.response ||
          data.data ||
          translatedText
      } catch {
        // Keep as plain text if JSON parsing fails
      }
    }

    // If we got something, return it
    if (translatedText && translatedText.length > 0) {
      return NextResponse.json({ translatedText })
    }

    return NextResponse.json({ error: "Empty translation received" }, { status: 500 })
  } catch (error) {
    console.error("[v0] Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}
