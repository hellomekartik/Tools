export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return Response.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const apiUrl = `https://dynamic-qr.rishuapi.workers.dev/?url=${encodeURIComponent(url)}`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json, image/*",
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    console.log("[v0] Content-Type:", contentType)

    let qrCodeUrl = null

    if (contentType?.includes("application/json")) {
      const data = await response.json()
      console.log("[v0] JSON response:", data)
      qrCodeUrl = data.qrImageUrl || data.qr_code_url || data.url || data.image
    } else if (contentType?.includes("image")) {
      const arrayBuffer = await response.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString("base64")
      qrCodeUrl = `data:${contentType};base64,${base64}`
      console.log("[v0] Generated data URL from image blob")
    }

    if (!qrCodeUrl) {
      throw new Error("No QR code URL in response")
    }

    return Response.json({
      url: `/api/proxy-qr-image?imageUrl=${encodeURIComponent(qrCodeUrl)}`,
      inputUrl: url,
    })
  } catch (error) {
    console.error("[v0] Error generating QR code:", error)
    return Response.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
