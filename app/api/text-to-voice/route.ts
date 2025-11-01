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
    let apiUrl = `https://texttospeech.alphaapi.workers.dev/?text=${encodeURIComponent(text)}&type=${type}`

    if (type === "google" && lang) {
      apiUrl += `&lang=${lang}`
    } else if (type === "streamelements" && voice) {
      apiUrl += `&voice=${voice}`
    }

    console.log("[v0] Calling external API:", apiUrl)

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const audioBuffer = await response.arrayBuffer()
    const audioUrl = `data:audio/mpeg;base64,${Buffer.from(audioBuffer).toString("base64")}`

    return Response.json({
      url: audioUrl,
      text,
      type,
      voice,
      lang,
    })
  } catch (error) {
    console.error("[v0] Error:", error)
    return Response.json({ error: "Failed to generate voice" }, { status: 500 })
  }
}
