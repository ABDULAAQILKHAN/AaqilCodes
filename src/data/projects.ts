export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  problemSolved: string;
  techStack: string[];
  features: string[];
  image: string;
  screenshots: string[];
  link: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "solutions-with-aaqil",
    title: "Solutions with Aaqil",
    category: "Next.js, Tailwind, Framer motion, Email.js",
    description: "My personal B2B portfolio with Auth control of my own projects.",
    longDescription: "A comprehensive B2B portfolio platform built with Next.js featuring authentication-controlled project management. This portfolio showcases professional work while providing secure access controls for project demonstrations and client interactions.",
    problemSolved: "Needed a professional way to showcase B2B work while maintaining secure access to sensitive project demonstrations and providing a seamless client experience.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Email.js", "Authentication"],
    features: [
      "Secure authentication for project access",
      "Responsive design with smooth animations",
      "Contact form integration",
      "Project showcase with filtering",
      "Dark mode support"
    ],
    image: "sol.png",
    screenshots: ["sol.png"],
    link: "https://solutions-with-aaqil.vercel.app/",
    github: "https://github.com/ABDULAAQILKHAN/SOLUTIONS-WITH-AAQIL"
  },
  {
    id: 2,
    slug: "zayka-darbar",
    title: "Zayka-Darbar",
    category: "Next.js, Supabase, NestJS",
    description: "Multi-role food ordering platform with real-time tracking.",
    longDescription: "A full-stack food ordering platform supporting multiple user roles including customers, restaurant owners, and delivery personnel. Features real-time order tracking, secure payment processing, and a seamless ordering experience.",
    problemSolved: "Restaurants needed a custom ordering solution that could handle multiple locations, real-time tracking, and role-based access for staff management.",
    techStack: ["Next.js", "NestJS", "Supabase", "PostgreSQL", "TypeScript", "Real-time WebSockets"],
    features: [
      "Multi-role authentication system",
      "Real-time order tracking",
      "Restaurant management dashboard",
      "Customer order history",
      "Delivery assignment system",
      "Menu management"
    ],
    image: "zayka.png",
    screenshots: ["zayka.png"],
    link: "https://zaykadarbar.vercel.app/",
    github: "https://github.com/ABDULAAQILKHAN/ZAYKA-RIMS"
  },
  {
    id: 3,
    slug: "mycerts",
    title: "MyCerts",
    category: "Next.js, NestJS, PostgreSQL",
    description: "Secure digital credential hub for verifiable certificates.",
    longDescription: "A secure platform for issuing, storing, and verifying digital certificates. Built with enterprise-grade security featuring blockchain-inspired verification and tamper-proof credential management.",
    problemSolved: "Organizations needed a reliable way to issue digital certificates that could be easily verified by third parties while preventing fraud and unauthorized modifications.",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "TypeScript", "JWT Authentication", "PDF Generation"],
    features: [
      "Secure certificate issuance",
      "QR code verification",
      "Tamper-proof storage",
      "Organization dashboard",
      "Batch certificate generation",
      "Public verification portal"
    ],
    image: "certshare.png",
    screenshots: ["certshare.png"],
    link: "https://mycerts99.vercel.app/",
    github: "https://github.com/ABDULAAQILKHAN/My-Certs"
  },
  {
    id: 4,
    slug: "stepper-ai",
    title: "Stepper.ai",
    category: "Next.js, FastAPI, Supabase",
    description: "AI chatbot to debug code step by step.",
    longDescription: "An intelligent AI-powered debugging assistant that helps developers understand and fix code issues through step-by-step explanations. Leverages advanced AI models to provide contextual debugging guidance.",
    problemSolved: "Developers often struggle to understand complex bugs in their code. This tool provides structured, step-by-step debugging guidance that teaches while solving problems.",
    techStack: ["Next.js", "FastAPI", "Python", "Supabase", "OpenAI API", "TypeScript"],
    features: [
      "Step-by-step debugging explanations",
      "Multi-language support",
      "Code analysis and suggestions",
      "Chat history persistence",
      "Code snippet highlighting",
      "Educational explanations"
    ],
    image: "stepperai.png",
    screenshots: ["stepperai.png"],
    link: "https://stepperai.vercel.app/",
    github: "https://github.com/ABDULAAQILKHAN/Stepper.ai"
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
