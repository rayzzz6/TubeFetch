import { MetadataRoute } from "next";

const SITE_URL = "https://tubefetch.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/analyze", "/faq", "/privacy", "/terms", "/contact"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
