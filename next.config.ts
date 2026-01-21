import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      // ✅ PDF HEADERS (INLINE VIEW ALLOWED)
      {
        source: "/:path*\\.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "Content-Disposition", value: "inline" },

          // 🔥 IMPORTANT: iframe allow
          { key: "X-Frame-Options", value: "SAMEORIGIN" },

          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; frame-ancestors 'self'; object-src 'self';",
          },
        ],
      },

      // 🔒 GLOBAL HEADERS (EXCLUDING PDF)
      {
        source: "/((?!.*\\.pdf).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval'
                https://va.vercel-scripts.com
                https://vitals.vercel-insights.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob:
                https://img.youtube.com
                https://github.com
                https://avatars.githubusercontent.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self'
                https://va.vercel-scripts.com
                https://vitals.vercel-insights.com
                https://api.github.com;
              frame-src 'self' https://www.youtube.com https://youtube.com;
              base-uri 'self';
              form-action 'self';
              upgrade-insecure-requests;
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    optimizePackageImports: ["@/components", "@/lib", "@/types"],
  },

  output: "standalone",

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
