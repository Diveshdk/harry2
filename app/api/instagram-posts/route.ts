import { NextResponse } from "next/server"

// This is a sample API route for fetching Instagram posts
// You'll need to replace this with actual Instagram Basic Display API integration

export async function GET() {
  try {
    // Replace with your Instagram Access Token
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json({ error: "Instagram access token not configured" }, { status: 500 })
    }

    // Instagram Basic Display API endpoint
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,media_type,caption,permalink,timestamp&access_token=${accessToken}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch Instagram posts")
    }

    const data = await response.json()

    return NextResponse.json(data.data)
  } catch (error) {
    console.error("Error fetching Instagram posts:", error)
    return NextResponse.json({ error: "Failed to fetch Instagram posts" }, { status: 500 })
  }
}
