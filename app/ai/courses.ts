// ── Types ──────────────────────────────────────────────────────────────────
// Only `id` and `title` are required. Add the optional fields as portfolio
// content becomes available; empty or missing fields are never rendered.

export interface CourseScreenshot {
  src: string;
  alt: string;
}

export interface CourseLink {
  label: string;
  href: string;
  kind: "project" | "code";
}

export interface Course {
  id: string;
  title: string;
  overview?: string;
  built?: string[];
  learned?: string[];
  screenshots?: CourseScreenshot[];
  links?: CourseLink[];
}

export interface CourseGroup {
  id: string;
  label: string;
  title: string;
  accent: "gold" | "teal";
  courses: Course[];
}

export function hasPortfolioContent(course: Course): boolean {
  return Boolean(
    course.overview ||
      course.built?.length ||
      course.learned?.length ||
      course.screenshots?.length ||
      course.links?.length
  );
}

// ── Course data ────────────────────────────────────────────────────────────

export const COURSE_GROUPS: CourseGroup[] = [
  {
    id: "open-enrollment",
    label: "Professional learning",
    title: "Open Enrollment",
    accent: "gold",
    courses: [
      { id: "agentic-ai-rag", title: "Agentic AI & RAG" },
      {
        id: "vibe-coding",
        title: "Vibe Coding for Business Professionals",
      },
      {
        id: "autonomous-agents",
        title: "Building Autonomous AI Agents with MCP, LangChain & LangGraph",
      },
    ],
  },
  {
    id: "smu-mbai",
    label: "Master of Science in Business AI",
    title: "SMU MBAI",
    accent: "teal",
    courses: [
      { id: "human-ai-collaboration", title: "Human–AI Collaboration" },
      { id: "accounting-with-ai", title: "Accounting with AI" },
      { id: "operations-and-ai", title: "Operations and AI" },
      { id: "ai-powered-marketing", title: "AI-Powered Marketing" },
    ],
  },
];
