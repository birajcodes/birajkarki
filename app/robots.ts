import type { MetadataRoute } from "next";

const siteUrl = "https://birajkarki.dev"; // TODO(biraj): confirm production domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
