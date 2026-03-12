import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://aaqilcodes.vercel.app/sitemap.xml",
    host: "https://aaqilcodes.vercel.app",
  };
}
