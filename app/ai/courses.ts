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

// A numbered section on the course page; `id` doubles as its #anchor.
export interface CourseSection {
  id: string;
  title: string;
  context?: string;
  description?: string;
  contribution?: string; // my own role, shown apart from the learning points
  learned?: string[];
  links?: CourseLink[];
  continuesIn?: { text: string; sectionId: string };
}

// An iterative workflow shown as a loop: the last stage leads back to the first.
export interface ToolchainStage {
  stage: string;
  tool: string;
  description: string;
}

export interface CourseToolchain {
  label: string;
  stages: ToolchainStage[];
}

export interface CourseReflection {
  label: string;
  text: string;
}

export interface CourseProject {
  title: string;
  href: string;
  linkText: string;
}

export interface Course {
  id: string;
  title: string;
  overview?: string;
  toolchain?: CourseToolchain;
  built?: string[];
  learned?: string[];
  reflection?: CourseReflection;
  project?: CourseProject;
  exercise?: CourseExercise;
  sections?: CourseSection[];
  screenshots?: CourseScreenshot[];
  links?: CourseLink[];
}

export interface CourseGroup {
  id: string;
  label: string;
  title: string;
  accent: "gold" | "teal";
  period?: { dates: string; status?: string };
  courses: Course[];
}

export function hasPortfolioContent(course: Course): boolean {
  return Boolean(
    course.overview ||
      course.built?.length ||
      course.learned?.length ||
      course.exercise ||
      course.sections?.length ||
      course.toolchain ||
      course.reflection ||
      course.project ||
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
        overview:
          "This course helped me quickly learn how to take an idea through a complete product-building workflow. My journey started with Firebase Studio and expanded as I learned more through my Teaching Assistant role using Google AI Studio.",
        toolchain: {
          label: "The toolchain · From idea to live product",
          stages: [
            {
              stage: "Ideate",
              tool: "Miro",
              description: "Map the problem and organize the initial idea.",
            },
            {
              stage: "See",
              tool: "Google Stitch",
              description: "Turn the idea into an interface concept.",
            },
            {
              stage: "Build",
              tool: "Google AI Studio",
              description: "Develop the application.",
            },
            {
              stage: "Store",
              tool: "GitHub",
              description: "Keep the codebase under version control.",
            },
            {
              stage: "Host",
              tool: "Vercel",
              description: "Deploy the application and make it accessible online.",
            },
          ],
        },
        learned: [
          "Learned how to move through an end-to-end toolchain, from an initial idea to a deployed application.",
          "Started experimenting with Firebase Studio, then deepened my experience with Google AI Studio through my work as a Teaching Assistant.",
          "Learned that individual tools will keep changing. Understanding the stages of the workflow and how they connect is the more transferable skill.",
          "Recognized that building quickly is only part of the challenge. Choosing what to build and understanding why it should exist require just as much thought.",
        ],
        reflection: {
          label: "Beyond building · What and why",
          text: "As AI makes it easier for more people to build software, the harder question becomes what is worth building. Does it solve a meaningful problem? Who would use it, and why would they choose it? Would someone pay for the value it provides? For me, this shifted the focus from simply making something work to thinking about usefulness, differentiation, and commercial potential.",
        },
        project: {
          title: "ASL Translator App",
          href: "https://asl-translator-app.vercel.app/",
          linkText: "Explore the App",
        },
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
    period: { dates: "Aug 2026 onwards", status: "Currently in progress" },
    courses: [
      {
        id: "human-ai-collaboration",
        title: "Human–AI Collaboration",
        overview:
          "This course explored how humans and AI can build, critique, and improve products together—from developing full-stack applications to deliberately breaking systems, incorporating human feedback, and building AI agents.",
        sections: [
          {
            id: "end-to-end-products",
            title: "Building End-to-End Products",
            learned: [
              "Explored building products across both the frontend and backend.",
              "Learned to consider how the user interface and underlying application behavior work together.",
              "Practised using AI as a collaborator throughout the development process.",
            ],
          },
          {
            id: "intentional-breakage",
            title: "Group Discussion · Intentional Breakage and Rebuilding",
            description:
              "Learned through intentional breakage and rebuilding: deliberately introducing problems, understanding what went wrong, and working through how to rectify them.",
            contribution:
              "I led a group session focused on making the diagnosis and repair process explicit.",
            learned: [
              "Used intentional breakage to investigate how systems behave when something goes wrong.",
              "Practised explaining failures and the steps needed to repair them.",
              "Led a group learning session around diagnosing and rectifying deliberately introduced problems.",
            ],
            links: [
              {
                label: "Local Example",
                href: "https://mgmt6110group2showcase.vercel.app/",
                kind: "project",
              },
              {
                label: "Global Example",
                href: "https://mgmt6110ps2resume.vercel.app/",
                kind: "project",
              },
              {
                label: "Group Session — Explanation Documents",
                href: "https://group2-explanation-documents.vercel.app/",
                kind: "project",
              },
            ],
          },
          {
            id: "adversarial-collaborators",
            title: "Humans and AI as Adversarial Collaborators",
            context: "Problem Sets 03–04",
            description:
              "Explored humans and AI as adversarial collaborators—using challenge and critique to question assumptions, identify weaknesses, and improve the work.",
            learned: [
              "Treated AI responses as material to interrogate and refine.",
              "Explored how human judgment and AI-generated critique can inform revision.",
              "Used disagreement as part of a constructive collaboration process.",
            ],
            links: [
              {
                label: "Problem Set 03",
                href: "https://mgmt6110ps3base-git-main-keziah-vickraman-mbai.vercel.app/",
                kind: "project",
              },
            ],
            continuesIn: {
              text: "Problem Set 04 continues into the usability and human-feedback work in",
              sectionId: "usability-heuristics",
            },
          },
          {
            id: "usability-heuristics",
            title: "Assessing UI with Usability Heuristics",
            description:
              "Used usability heuristics to assess interfaces and identify opportunities for improvement. In Problem Set 04, I incorporated human comments through a Disqus forum into the review and iteration process.",
            learned: [
              "Practised evaluating interfaces using usability heuristics.",
              "Combined structured interface assessment with feedback from people.",
              "Incorporated human comments through Disqus as part of the iteration process.",
            ],
            links: [
              {
                label: "Group UI Comparison",
                href: "https://mgmt6110week05group2comparison.vercel.app/",
                kind: "project",
              },
              {
                label: "Problem Set 04 — Human Feedback with Disqus",
                href: "https://mgmt6110ps3base.vercel.app/",
                kind: "project",
              },
            ],
          },
          {
            id: "ai-agents-zapier",
            title: "Building AI Agents with Zapier",
            context: "Project: Full Court Press",
            description:
              "Applied the course’s human–AI collaboration themes to building AI agents using Zapier.",
            links: [
              {
                label: "Full Court Press — Problem Set 05",
                href: "https://mgmt6110problemset05zapier.vercel.app/",
                kind: "project",
              },
            ],
          },
        ],
      },
      { id: "accounting-with-ai", title: "Accounting with AI" },
      { id: "operations-and-ai", title: "Operations and AI" },
      { id: "ai-powered-marketing", title: "AI-Powered Marketing" },
    ],
  },
];
