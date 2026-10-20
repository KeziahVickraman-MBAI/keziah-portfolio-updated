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
  purpose: string[]; // paragraphs
  learned?: string[];
  setup?: string;
  // What the code actually demonstrates, kept separate from the intent above
  implementation?: string;
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
          purpose: [
            "This exercise explored how to turn a business model canvas into knowledge that an AI agent could retrieve and use in a guessing game. My input was a CSV exported from a business model canvas built in Miro.",
            "The goal was to prepare that canvas for retrieval, so that its information and the relationships within it would be useful to the system.",
          ],
          learned: [
            "Garbage in, garbage out: the quality of the source information, and how it is organised, directly affects how useful the system’s responses are.",
            "Knowledge preparation is a core part of RAG. Exporting the canvas was only the starting point; its content needed to keep its meaningful context.",
            "The focus was on building a knowledge graph: identifying concepts and their relationships so the business model could be represented coherently.",
            "Used an R script as part of the workflow, and ran a local language model on my own device through Ollama.",
            "Connected the knowledge-preparation work to a guessing-game exercise using agents.",
          ],
          setup: "R + a local language model running through Ollama (llama3.2:3b)",
          implementation:
            "In the R script, the Miro CSV was reorganised into a structured canvas grouped by the nine business model canvas sections, and the local model answered questions using only that canvas. The knowledge graph was the conceptual focus of the exercise; the script itself works from the structured canvas rather than a graph.",
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
