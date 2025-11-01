export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teraboxUrl = searchParams.get("url")

  if (!teraboxUrl) {
    return Response.json({ success: false, message: "URL is required" }, { status: 400 })
  }

  try {
    const apiUrl = `https://teraboxapi.alphaapi.workers.dev/?url=${encodeURIComponent(teraboxUrl)}`
    console.log("[v0] Calling Terabox API:", apiUrl)

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Terabox API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Terabox API response:", data)

    return Response.json(data)
  } catch (error) {
    console.error("[v0] Terabox API error:", error)
    return Response.json({ success: false, message: "Failed to fetch Terabox data" }, { status: 500 })
  }
}
