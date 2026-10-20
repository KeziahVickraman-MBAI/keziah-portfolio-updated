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
  kind: "project" | "code" | "demo";
}

export interface CourseExercise {
  label: string;
  summary: string;
  links: CourseLink[];
}

export interface Course {
  id: string;
  title: string;
  overview?: string;
  built?: string[];
  learned?: string[];
  exercise?: CourseExercise;
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
      course.exercise ||
      course.screenshots?.length ||
      course.links?.length
  );
}

// Courses with content get their own page at /ai/<id>.
export function getCourse(id: string) {
  for (const group of COURSE_GROUPS) {
    const course = group.courses.find((c) => c.id === id);
    if (course) return { course, group };
  }
  return null;
}

export function getCoursesWithContent(): Course[] {
  return COURSE_GROUPS.flatMap((g) => g.courses).filter(hasPortfolioContent);
}

// ── Course data ────────────────────────────────────────────────────────────

export const COURSE_GROUPS: CourseGroup[] = [
  {
    id: "open-enrollment",
    label: "Professional learning",
    title: "Open Enrollment",
    accent: "gold",
    courses: [
      {
        id: "agentic-ai-rag",
        title: "Agentic AI & RAG",
        learned: [
          "Explored the history of AI and how the field evolved toward today’s language models and agent-based systems.",
          "Learned about Supervised Fine-Tuning (SFT), Reinforcement Learning from Human Feedback (RLHF), and Reinforcement Learning with Verifiable Rewards (RLVR).",
          "Explored how Retrieval-Augmented Generation (RAG) uses external knowledge to inform model responses.",
          "Applied RAG and agents in a guessing-game exercise.",
        ],
        exercise: {
          label: "Hands-on exercise · RAG guessing game",
          summary: "Built a system for a guessing-game exercise using RAG and agents.",
          links: [
            {
              label: "Africa Agriculture",
              href: "https://africa-agriculture.vercel.app/",
              kind: "demo",
            },
            {
              label: "Football Screening",
              href: "https://fanflow-football.vercel.app/",
              kind: "demo",
            },
            {
              label: "Game Runner — Using Agents",
              href: "https://rag-guess.vercel.app/",
              kind: "demo",
            },
          ],
        },
      },
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
