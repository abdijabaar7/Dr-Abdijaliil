import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/conditions",
    "/appointments",
    "/consultation",
    "/blog",
    "/blog/bone-fracture-first-aid-guide",
    "/blog/knee-osteoarthritis-management",
    "/blog/preventing-sports-injuries-somalia",
    "/gallery",
    "/testimonials",
    "/faq",
    "/contact",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/appointments" ? 0.9 : 0.8,
  }));
}

