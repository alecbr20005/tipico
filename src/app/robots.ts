import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tipico2.vercel.app";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/business/dashboard/", "/api/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
