export function ProfileImagesSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://nandha-portfolio.vercel.app",
          },
          about: {
            "@type": "Person",
            name: "Nandha Kumar",
            description:
              "Full Stack Developer specializing in Next.js, TypeScript, and Modern Web Development.",
          },
          associatedMedia: [
            {
              "@type": "ImageObject",
              contentUrl: "https://nandha-portfolio.vercel.app/og-image.jpg",
              name: "Nandha Kumar - Full Stack Developer OG Image",
              description:
                "Open Graph image for Nandha Kumar's portfolio website",
              encodingFormat: "image/jpeg",
              width: "1200",
              height: "630",
            },
            {
              "@type": "ImageObject",
              contentUrl: "https://nandha-portfolio.vercel.app/my.jpg",
              name: "Nandha Kumar - Full Stack Developer Profile",
              description:
                "Profile photo of Nandha Kumar, Full Stack Developer",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
            {
              "@type": "ImageObject",
              contentUrl: "https://nandha-portfolio.vercel.app/name.jpg",
              name: "Nandha Kumar - Professional Profile",
              description:
                "Professional photo of Nandha Kumar, showcasing expertise in web development",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
          ],
        }),
      }}
    />
  );
}

export function ImageStructuredData() {
  return <ProfileImagesSchema />;
}
