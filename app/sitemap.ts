import type { MetadataRoute } from "next";

const siteUrl = "https://birajkarki.dev"; // TODO(biraj): confirm production domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
