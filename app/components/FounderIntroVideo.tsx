"use client";

import { useState } from "react";

const founderVideoUrl = process.env.NEXT_PUBLIC_FOUNDER_VIDEO_URL;

export default function FounderIntroVideo() {
  const [playing, setPlaying] = useState(false);

  if (founderVideoUrl) {
    return (
      <div className="founder-video-card">
        <video className="founder-video" controls preload="metadata" poster="/umais-headshot.png">
          <source src={founderVideoUrl} type="video/mp4" />
          Your browser does not support the founder introduction video.
        </video>
      </div>
    );
  }

  return (
    <div className={`founder-video-card founder-video-placeholder ${playing ? "is-open" : ""}`}>
      <button type="button" className="founder-video-trigger" onClick={() => setPlaying((value) => !value)} aria-expanded={playing}>
        <span className="founder-play-icon" aria-hidden="true">{playing ? "×" : "▶"}</span>
        <span><strong>Founder introduction</strong><small>{playing ? "Video connection is ready for the approved file." : "A short introduction from Umais"}</small></span>
      </button>
      {playing ? <p className="founder-video-note">Connect the approved founder video through <code>NEXT_PUBLIC_FOUNDER_VIDEO_URL</code> to enable click-to-play playback.</p> : null}
    </div>
  );
}
