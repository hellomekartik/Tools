export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text")
  const type = searchParams.get("type") || "google"
  const voice = searchParams.get("voice")
  const lang = searchParams.get("lang") || "en"

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 })
  }

  try {
    let apiUrl = ""

    if (type === "alpha") {
      // Alpha TTS API
      apiUrl = `https://yabes-api.pages.dev/api/tools/tts?text=${encodeURIComponent(text)}&voice=${voice || "adam"}`
    } else {
      // Google TTS (default)
      apiUrl = `https://texttospeech.alphaapi.workers.dev/?text=${encodeURIComponent(text)}&type=google&lang=${lang}`
    }

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    if (type === "alpha") {
      const data = await response.json()

      const audioUrl =
        data.result?.audio_url ||
        data.result?.audio ||
        data.audio_url ||
        data.audio ||
        data.url ||
        (typeof data === "string" ? data : null)

      if (audioUrl) {
        return Response.json({
          url: audioUrl,
          text,
          type,
          voice,
        })
      } else {
        throw new Error("No audio URL found in response")
      }
    } else {
      // Google TTS returns audio buffer
      const audioBuffer = await response.arrayBuffer()
      const audioUrl = `data:audio/mpeg;base64,${Buffer.from(audioBuffer).toString("base64")}`

      return Response.json({
        url: audioUrl,
        text,
        type,
        voice,
        lang,
      })
    }
  } catch (error) {
    console.error("[v0] Error:", error)
    return Response.json({ error: "Failed to generate voice" }, { status: 500 })
  }
}
