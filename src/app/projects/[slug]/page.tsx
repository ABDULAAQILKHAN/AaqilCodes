import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { PROJECTS, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found | Aaqil Khan",
    };
  }

  const ogImage = project.image.startsWith("bg-")
    ? undefined
    : {
        url: `/${project.image}`,
        width: 1200,
        height: 630,
        alt: `${project.title} - Project Screenshot`,
      };

  return {
    title: `${project.title} | Project by Aaqil Khan`,
    description: project.longDescription,
    keywords: [
      project.title,
      "Aaqil Khan project",
      ...project.techStack,
      "Full stack project",
      "Web application",
      ...(project.openSource ? ["Open source"] : []),
    ],
    openGraph: {
      title: `${project.title} | Project by Aaqil Khan`,
      description: project.longDescription,
      url: `https://aaqilcodes.vercel.app/projects/${project.slug}`,
      siteName: "Aaqil Codes",
      ...(ogImage ? { images: [ogImage] } : {}),
      type: "article",
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: `${project.title} | Project by Aaqil Khan`,
      description: project.longDescription,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // JSON-LD structured data for the project
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription,
    url: project.link,
    applicationCategory: "WebApplication",
    author: {
      "@type": "Person",
      name: "Aaqil Khan",
      url: "https://aaqilcodes.vercel.app",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/#projects"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
            <div className="flex items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <p className="text-sm uppercase tracking-widest text-gray-400">
                  {project.category}
                </p>
                {project.openSource && (
                  <span className="px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full">
                    Open Source
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl">
                {project.longDescription}
              </p>
            </div>

            {/* Main Image */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 mb-12">
              {project.image.startsWith("bg-") ? (
                <div className={`absolute inset-0 ${project.image}`} />
              ) : (
                <Image
                  src={`/${project.image}`}
                  alt={`${project.title} - Main Screenshot`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              )}
              {project.openSource && (
                <div className="absolute top-6 left-6 px-4 py-2 text-xs font-bold tracking-[0.25em] uppercase bg-emerald-500 text-black rounded-full shadow-lg shadow-emerald-500/30">
                  Open Source
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-12 px-6 border-t border-white/10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Problem Solved */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Problem Solved</h2>
                <p className="text-gray-400 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-6 border-t border-white/10">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <section className="py-12 px-6 border-t border-white/10">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold mb-8">Screenshots</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900"
                  >
                    <Image
                      src={`/${screenshot}`}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 px-6 border-t border-white/10">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in this project?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Check out the live demo or get in touch to discuss how I can help build
              something similar for your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                <span>View Live Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/#contact"
                className="px-6 py-3 border border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Aaqil Khan. All rights reserved.
            </p>
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Back to Portfolio
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
