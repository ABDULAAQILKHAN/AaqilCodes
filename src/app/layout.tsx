import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "https://solutions-with-aaqil.vercel.app/A%20logo.png",
  },
  title: "Aaqil Khan – Full Stack Developer | React, Next.js, Node.js",
  description: "Portfolio of Aaqil Khan, a full-stack developer specializing in React, Next.js, Node.js, PostgreSQL and scalable SaaS applications.",
  keywords: [
    "Aaqil Khan developer",
    "Full stack developer India",
    "Next.js developer",
    "React developer portfolio",
    "Node.js developer",
    "PostgreSQL developer",
    "SaaS developer",
    "Web developer India",
    "Software engineer portfolio"
  ],
  metadataBase: new URL("https://aaqilcodes.vercel.app"),
  alternates: {
    canonical: "https://aaqilcodes.vercel.app",
  },
  openGraph: {
    title: "Aaqil Khan – Full Stack Developer",
    description: "Portfolio of Aaqil Khan, a full-stack developer specializing in React, Next.js, Node.js, PostgreSQL and scalable SaaS applications.",
    url: "https://aaqilcodes.vercel.app",
    siteName: "Aaqil Codes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aaqil Khan - Full Stack Developer Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaqil Khan – Full Stack Developer",
    description: "Portfolio of Aaqil Khan, a full-stack developer specializing in React, Next.js, Node.js, PostgreSQL and scalable SaaS applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data for Person schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaqil Khan",
  jobTitle: "Full Stack Developer",
  url: "https://aaqilcodes.vercel.app",
  sameAs: [
    "https://github.com/aaqilkhan",
    "https://linkedin.com/in/aaqilkhan",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "TypeScript",
    "JavaScript",
    "Full Stack Development",
    "SaaS Applications",
  ],
  description: "Full Stack Developer specializing in React, Next.js, Node.js, PostgreSQL and scalable SaaS applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="LgyFE7mbysgRKfm4khYfITpcJykfggm9gHxia6DTI3g" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased selection:bg-white selection:text-black`}>
        <PostHogProvider>
          <PostHogPageView />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </PostHogProvider>
      </body>
    </html>
  );
}
