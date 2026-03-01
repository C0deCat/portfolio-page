import ProcesetImage from "../assets/proceset_bi_pic.png";
import ForesightImage from "../assets/foresight_analytics.png";
import ProjectMaryImage from "../assets/project_mary.png";
import PortfolioImage from "../assets/KittyPortfolio.jpg";
import type { ProjectCardProps } from "../types";

const procesetArticle = (
  <>
    <header className="mb-4 text-3xl">
      <p>Active Business Intelligence & Enterprise Process Mining Platform</p>
    </header>

    <section className="mb-4">
      <h4 className="text-3xl">Project Overview & Business Value</h4>
      <p>
        <strong>Proceset</strong> is an enterprise-grade process mining and
        active business intelligence platform developed by Infomaximum. Deployed
        across major corporate entities, the system shifts organizational focus
        from traditional retrospective reporting to active, real-time analytics.
        By algorithmically parsing massive event logs from underlying IT systems
        (ERPs, CRMs), Proceset dynamically reconstructs and visualizes the
        actual flow of corporate operations. This enables enterprises to
        identify hidden bottlenecks, compliance deviations, and inefficiencies,
        ultimately driving significant operational optimization and cost
        reduction.
      </p>
    </section>

    <section>
      <h4 className="text-3xl">Core Features & Engineering Complexity</h4>
      <ul>
        <li className="mb-2">
          <strong>Advanced Process Visualization:</strong> The platform
          leverages highly interactive Directed Follows Graphs (DFGs) and
          time-dependent animated Sankey diagrams to map complex, high-volume
          operational workflows. This requires rendering thousands of dynamic
          vector nodes concurrently without degrading browser performance.
        </li>
        <li className="mb-2">
          <strong>TaskMining & Digital Workers:</strong> Beyond system-level
          logs, the platform features AI-driven TaskMining to analyze
          micro-level user interactions. It allows business users to configure
          autonomous "digital workers" via complex visual API mapping interfaces
          to automate routine operational tasks.
        </li>
        <li className="mb-2">
          <strong>Modular Extensibility:</strong> A robust widget API allows for
          the dynamic injection of bespoke, highly customized analytical
          components into the global dashboard layout, ensuring the platform
          scales to meet niche enterprise requirements safely.
        </li>
      </ul>
    </section>
  </>
);

const foresightArticle = (
  <>
    <header className="mb-4">
      <h3 className="text-3xl">Foresight Analytics Platform</h3>
      <p className="text-xl">
        Enterprise Multidimensional Analysis & Headless BI Architecture
      </p>
    </header>

    <section className="mb-4">
      <h4 className="text-3xl">Project Overview & Business Value</h4>
      <p>
        The <strong>Foresight Analytics Platform</strong> is a comprehensive,
        enterprise-grade Business Intelligence suite engineered for
        massive-scale data operations. Included in the Unified Register of
        Russian Programs, it serves as a foundational element for corporate
        import substitution initiatives. The platform goes beyond standard
        visualization, providing deeply integrated solutions for corporate
        budgeting, complex financial consolidation, predictive machine learning
        models, and multidimensional online analytical processing (MOLAP).
      </p>
    </section>

    <section className="mb-4">
      <h4 className="text-3xl">Core Features & Engineering Complexity</h4>
      <ul>
        <li className="mb-2">
          <strong>High-Performance Data Processing:</strong> The platform is
          built on advanced in-memory data caching mechanisms and distributed
          parallel processing, enabling real-time analysis across massive
          enterprise data warehouses and data lakes.
        </li>
        <li className="mb-2">
          <strong>Geospatial SVG Topobases:</strong> Features advanced
          geospatial analytical capabilities using strictly governed SVG XML
          schemas. This allows dynamic, multidimensional OLAP cube data to be
          bound directly to interactive regional map geometries for complex
          drill-down capabilities.
        </li>
        <li className="mb-2">
          <strong>Headless SPA Integrations:</strong> While featuring a
          proprietary DHTML component library for standard reporting, the system
          supports modern "headless" operations. Data can be exposed securely
          via robust REST APIs to power decoupled, custom Single Page
          Applications (SPAs) built in React or Angular.
        </li>
        <li className="mb-2">
          <strong>Enterprise Governance & Security:</strong> Enforces rigorous
          role-based access control (RBAC) and data lineage tracking at both the
          database and UI component levels, ensuring compliance with strict
          public sector data regulations.
        </li>
      </ul>
    </section>
  </>
);

const projectMaryArticle = (
  <>
    <section className="mb-4">
      <h3 className="text-3xl">Overview</h3>
      <p>
        While initially conceived as a persona-driven Telegram companion bot (as
        described in its early documentation), Project Mary evolved during
        development into a highly modular{" "}
        <strong>framework for building advanced AI chatbots</strong>. By
        decoupling core responsibilities—such as transport, memory, and language
        generation—into distinct, pluggable interfaces, the project serves as a
        scalable foundation for deploying sophisticated virtual agents with
        persistent memory and built-in monetization.
      </p>
    </section>
    <section className="mb-4">
      <h3 className="text-3xl">Key Architectural Features</h3>
      <p>
        Instead of hardcoding a single-purpose script, the project is structured
        around clear abstractions and dependency injection, making it highly
        extensible:
      </p>
    </section>

    <section className="mb-4">
      <ul>
        <li className="mb-2">
          <strong>
            Agnostic Transport Layer (<code>messenger</code> module):
          </strong>{" "}
          Built around the <code>IMessengerApp</code> protocol, the framework
          decouples the core conversational logic from the underlying messaging
          platform. While it currently ships with robust Telegram integrations
          (supporting both <code>python-telegram-bot</code> for webhooks and{" "}
          <code>Telethon</code>), developers can easily plug in adapters for
          Discord, WhatsApp, or custom frontends. A high-level{" "}
          <code>Messenger</code> orchestrator sits above the adapter to handle
          message queuing, natural typing emulation, delay enforcement, and
          automated retry logic for failed requests.
        </li>
        <li className="mb-2">
          <strong>
            Pluggable LLM Interface (<code>persona</code> module):
          </strong>{" "}
          Language model providers are abstracted behind the{" "}
          <code>ILanguageModel</code> interface. The framework currently
          supports DeepSeek (via OpenAI compatible endpoints), NLPCloud, and a
          Mock model for unit testing. The <code>Persona</code> class
          dynamically constructs prompts by injecting configurable character
          traits, biographies, and boundaries from a JSON preset.
        </li>
        <li className="mb-2">
          <strong>
            Hierarchical Vector Memory System (<code>memory</code> module):
          </strong>{" "}
          To solve the context-window limitations of modern LLMs, I engineered a
          sophisticated, multi-tiered long-term memory system using LangChain
          and Milvus (supporting both Lite and Standalone modes). The system
          automatically manages conversation history through progressive
          summarization:
          <ul>
            <li>
              <strong>L0 (Raw):</strong> Exact conversation fragments stored as
              embeddings using local <code>SentenceTransformers</code>.
            </li>
            <li>
              <strong>L1 (Recent):</strong> Automated summaries of recent
              message batches.
            </li>
            <li>
              <strong>L2 (Rollups):</strong> Aggregated summaries of older L1
              chunks.
            </li>
            <li>
              <strong>Global:</strong> A continuously updated, overarching
              summary of the user's profile, preferences, and relationship with
              the bot.
            </li>
          </ul>
        </li>
        <li className="mb-2">
          <strong>
            Asynchronous Conversation Orchestrator (<code>agent</code> module):
          </strong>{" "}
          At the heart of the framework is an async state machine that manages
          concurrent user interactions. It gracefully handles edge cases like
          overlapping messages, pauses response generation when the user starts
          typing, and enforces "grace periods" to ensure the bot reads multiple
          rapid-fire messages as a single context block. It also features a
          CRON-like scheduler for asynchronous broadcasts (e.g., automated
          morning/evening greetings).
        </li>
        <li className="mb-2">
          <strong>
            Built-In Monetization &amp; Meta-Storage (<code>payments</code>{" "}
            &amp; <code>metamemory</code>):
          </strong>{" "}
          The framework includes a pluggable <code>MetadataController</code>{" "}
          (backed by SQLite or JSON) to track user states, timezones, and
          quotas. Built on top of this is a fully integrated{" "}
          <code>PaymentService</code> that supports Telegram Stars
          out-of-the-box, allowing developers to easily configure monthly
          subscriptions, consumable token packs, and free-tier limits with
          automated paywall generation.
        </li>
      </ul>
    </section>
  </>
);

const myPortfolioSiteArticle = (
  <>
    <section className="mb-4">
      <h3 className="text-3xl">Overview</h3>
      <p>
        This is my personal portfolio website, built to showcase my projects and
        experience.
      </p>
    </section>
    <section>
      <p>
        I mean, this thing kind of speak for itself, just feel free to look
        around :D
      </p>
    </section>
  </>
);

export const projects: ProjectCardProps[] = [
  {
    title: "Proceset",
    tags: ["react", "typescript", "MobX", "css-in-js"],
    image: ProcesetImage,
    stack: [
      "React",
      "TypeScript",
      "MobX",
      "CSS-in-JS (Emotion)",
      "GraphQL",
      "Ant Design",
      "Jest",
    ],
    content: procesetArticle,
    projectLink: "https://infomaximum.ru/product",
  },
  {
    title: "Foresight Analytical Platform",
    tags: ["typescript", "react", "redux", "jest", "storybook"],
    image: ForesightImage,
    stack: [
      "TypeScript",
      "React",
      "Redux",
      "Jest",
      "Storybook",
      "ESLint",
      "Java (legacy code)",
    ],
    content: foresightArticle,
    projectLink: "https://www.fsight.ru/en/platform/",
  },
  {
    title: "Project Mary",
    tags: ["python", "langchain", "milvus", "deepseek_r1", "telegram-bot-api"],
    image: ProjectMaryImage,
    stack: ["Python", "LangChain", "Milvus", "DeepSeek-R1", "Telegram Bot API"],
    content: projectMaryArticle,
    projectLink: "https://github.com/C0deCat/project-mary",
  },
  {
    title: "This exact portfolio site",
    tags: ["react", "vite", "tailwind", "typescript"],
    image: PortfolioImage,
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    content: myPortfolioSiteArticle,
    projectLink: "https://github.com/C0deCat/portfolio-page",
  },
];
