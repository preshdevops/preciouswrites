import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export const dynamic = "force-dynamic";

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json(
      { isPlaying: false, message: "Spotify not configured" },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  }

  try {
    const accessToken = await getAccessToken();

    // Try currently playing
    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item) {
        return NextResponse.json(
          {
            isPlaying: data.is_playing ?? true,
            title: data.item.name,
            artist: data.item.artists.map((a) => a.name).join(", "),
            album: data.item.album.name,
            albumArt: data.item.album.images[0]?.url || "",
            url: data.item.external_urls.spotify,
          },
          {
            headers: {
              "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
            },
          }
        );
      }
    }

    // Fallback: recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (recentRes.status === 200) {
      const recentData = await recentRes.json();
      if (recentData?.items?.length > 0) {
        const track = recentData.items[0].track;
        return NextResponse.json(
          {
            isPlaying: false,
            title: track.name,
            artist: track.artists.map((a) => a.name).join(", "),
            album: track.album.name,
            albumArt: track.album.images[0]?.url || "",
            url: track.external_urls.spotify,
          },
          {
            headers: {
              "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
            },
          }
        );
      }
    }

    // Nothing at all
    return NextResponse.json(
      { isPlaying: false, message: "Offline" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { isPlaying: false, message: "Error" },
      { status: 200 }
    );
  }
}
