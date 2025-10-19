export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Nandha Kumar",
          url: "https://rushikeshnimkar.com",
          sameAs: [
            "https://github.com/nandha-kumar01",
            "https://www.linkedin.com/in/nandha-kumar-m-4bb751186/",
            "https://x.com/nandhamari03"
          ],
          jobTitle: "Front-End Developer",
          knowsAbout: ["Web Development", "TypeScript", "JavaScript", "React", "Next.js"],
          image: "/profile.jpg",
          description: "Full Stack Developer specializing in Next.js, TypeScript, and Blockchain development."
        })
      }}
    />
  );
} 