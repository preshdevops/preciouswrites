"use client";

import { useEffect, useState, useCallback } from "react";

export default function SpotifyWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSpotify = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify");
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, [fetchSpotify]);

  if (loading) {
    return (
      <div className="flex items-center gap-3.5 p-4 rounded-2xl bespoke-card animate-pulse">
        <div className="w-12 h-12 rounded-xl bg-muted shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-2.5 w-20 bg-muted rounded" />
          <div className="h-3 w-32 bg-muted rounded" />
          <div className="h-2.5 w-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!data || (!data.title && data.message === "Spotify not configured")) {
    return (
      <div className="p-4 rounded-2xl bespoke-card flex items-center gap-3 font-mono text-xs text-foreground/50">
        <SpotifyIcon className="w-5 h-5 text-[#1DB954] shrink-0" />
        <span>SPOTIFY_INTEGRATION // STANDBY</span>
      </div>
    );
  }

  const isPlaying = data.isPlaying;
  const hasTrack = !!data.title;

  return (
    <a
      href={hasTrack ? data.url : "https://open.spotify.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 p-4 rounded-2xl bespoke-card hover:border-[#1DB954]/50 transition-all duration-300 no-underline"
    >
      {/* Album Art */}
      <div className="relative w-12 h-12 shrink-0">
        <div
          className={`w-12 h-12 rounded-xl overflow-hidden hairline-border transition-all duration-300 ${
            isPlaying ? "shadow-[0_0_15px_rgba(29,185,84,0.3)] border-[#1DB954]" : ""
          }`}
        >
          {hasTrack && data.albumArt ? (
            <img
              src={data.albumArt}
              alt={data.album || "Album art"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <SpotifyIcon className="w-6 h-6 text-[#1DB954]" />
            </div>
          )}
        </div>
      </div>

      {/* Track Info */}
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-[#1DB954] shadow-[0_0_8px_#1DB954] animate-pulse"
                : "bg-foreground/30"
            }`}
          />
          <span className={isPlaying ? "text-[#1DB954]" : "text-foreground/50"}>
            {isPlaying ? "LIVE_PLAYBACK" : hasTrack ? "RECENTLY_PLAYED" : "OFFLINE"}
          </span>
        </div>

        <span className="font-display text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
          {hasTrack ? data.title : "Not listening"}
        </span>

        <span className="font-sans text-xs text-foreground/60 truncate">
          {hasTrack ? data.artist : "Spotify"}
        </span>
      </div>

      {/* Audio Wave Bars */}
      <div className="flex items-end gap-[3px] h-4 shrink-0 px-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-[#1DB954] animate-[eq_1.2s_ease-in-out_infinite]"
                : "bg-foreground/20 h-[3px]"
            }`}
            style={
              isPlaying
                ? {
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: `${0.8 + i * 0.2}s`,
                  }
                : undefined
            }
          />
        ))}
      </div>
    </a>
  );
}

function SpotifyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
