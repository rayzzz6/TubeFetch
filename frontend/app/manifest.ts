import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TubeFetch — YouTube Video & Audio Downloader",
    short_name: "TubeFetch",
    description: "Paste a YouTube URL and get clean MP4 video or MP3 audio in seconds.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070C",
    theme_color: "#05070C",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
