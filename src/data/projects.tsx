import ProcesetImage from "../assets/proceset_bi_pic.png";
import ForesightImage from "../assets/foresight_analytics.png";
import NoteKeeperImage from "../assets/notekeeper_console.png";
import ProjectMaryImage from "../assets/project_mary.png";
import PortfolioImage from "../assets/KittyPortfolio.jpg";
import type { ProjectCardProps } from "../types";
import { unorderedList } from "../stylizers";

const procesetArticle = (
  <>
    <section className="mb-6">
      <h3 className="text-3xl mb-2">The Product</h3>
      <p>
        <strong>Proceset</strong> is Infomaximum's BI and process analytics
        platform. I worked on its analytical reports module, building interfaces
        that let users configure and explore their business data.
      </p>
    </section>
    <img src={ProcesetImage} alt="Proceset analytical report interface" className="w-full mb-8" />
    <section>
      <h3 className="text-3xl mb-2">My Contribution</h3>
      <ul className={unorderedList}>
        <li className="mb-3">
          Refactored a key analytics module, reducing boilerplate for new features
          by over 80%.
        </li>
        <li className="mb-3">
          Migrated the report-building system to a more flexible architecture,
          enabling user customizations that the previous implementation could
          not support.
        </li>
        <li className="mb-3">
          Became the primary owner of the analytical reports module, responsible
          for new features and architectural improvements.
        </li>
        <li>
          Worked with UI/UX designers to clarify technical requirements and
          reduce rework, contributing to roughly 20% faster feature delivery.
        </li>
      </ul>
    </section>
  </>
);

const foresightArticle = (
  <>
    <section className="mb-6">
      <h3 className="text-3xl mb-2">The Product</h3>
      <p>
        The <strong>Foresight Analytical Platform</strong> is an enterprise BI
        system. My work focuses on the React reporting UI, spreadsheet
        interactions, and data fetching for analytical workflows.
      </p>
    </section>
    <img
      src={ForesightImage}
      alt="Foresight Analytical Platform reporting interface"
      className="w-full mb-8"
    />
    <section>
      <h3 className="text-3xl mb-2">My Contribution</h3>
      <ul className={unorderedList}>
        <li className="mb-3">
          Refactored BI data fetching, reducing network traffic by over 20% and
          making key operations up to 4 times faster.
        </li>
        <li className="mb-3">
          Built real-time spreadsheet comments, new infographic components, and
          cross-component data synchronization in response to client requests.
        </li>
        <li className="mb-3">
          Added full reporting UI support for new data source types, expanding
          the data users could include in analytical reports.
        </li>
        <li>
          Automated legacy builds and deployment with PowerShell to reduce
          manual setup for developers working on older modules.
        </li>
      </ul>
    </section>
  </>
);

const noteKeeperArticle = (
  <>
    <section className="mb-6">
      <h3 className="text-3xl mb-2">The Problem</h3>
      <p>
        I run tabletop role-playing games, where a session can last three to five
        hours. <strong>NoteKeeper</strong> turns those recordings into timestamped
        transcripts and structured recaps, reducing the repetitive work of
        reviewing a session and writing notes for the next game.
      </p>
    </section>
    <img
      src={NoteKeeperImage}
      alt="NoteKeeper terminal interface showing recordings, processing jobs, players, and a generated session recap"
      className="w-full mb-8"
    />
    <section className="mb-6">
      <h3 className="text-3xl mb-2">How It Works</h3>
      <p>
        Create a campaign, add participants and voice samples, then submit a
        recording. FFmpeg prepares the audio; WhisperX transcribes, aligns, and
        diarizes speech. Sample-based speaker mapping with manual review links
        anonymous speakers to participants or guest labels before DeepSeek
        generates the recap. Transcripts and recaps can be previewed and exported
        as Markdown from either the Textual TUI or the Typer/Rich CLI.
      </p>
    </section>
    <section>
      <h3 className="text-3xl mb-2">Engineering Decisions</h3>
      <ul className={unorderedList}>
        <li className="mb-3">
          <strong>Process-based job queue:</strong> Heavy processing runs in
          separate operating-system processes. Shared capacity limits control
          total and GPU jobs, while progress events, cancellation, and restarts
          make long-running work manageable. Speaker review pauses the pipeline
          and continues from the saved transcript after corrections.
        </li>
        <li className="mb-3">
          <strong>Long-transcript summarization:</strong> Token-budgeted chunks
          are summarized separately and combined into a final recap. Intermediate
          recaps retain time ranges and source segment references. API calls
          include timeouts, retries with exponential backoff, and request logging.
        </li>
        <li className="mb-3">
          <strong>Sample-based speaker mapping:</strong> The mapper uses overlap
          with known voice-sample intervals to associate diarized labels with
          participants. Uncertain or conflicting mappings are reviewed by the
          user before recap generation.
        </li>
        <li className="mb-3">
          <strong>Local workspaces and roles:</strong> SQLite-backed workspaces
          separate campaign data and support owner, editor, and viewer access
          within the local application. Workspace settings select allowed models
          and processing options; campaign settings control recap prompts.
        </li>
        <li>
          <strong>A shared, testable core:</strong> CLI and TUI call the same
          application use cases. Ports and adapters isolate domain rules from
          SQLite, the filesystem, audio tools, and model APIs. Automated tests
          cover use cases, adapters, interfaces, workspace isolation, and
          architectural boundaries.
        </li>
      </ul>
    </section>
  </>
);

const projectMaryArticle = (
  <>
    <section className="mb-6">
      <h3 className="text-3xl mb-2">The Problem</h3>
      <p>
        An AI companion needs to maintain a consistent persona and remember
        earlier conversations beyond a single context window. I built
        <strong> Project Mary</strong> as an asynchronous Telegram companion with
        configurable personas, long-term memory, and optional paid access.
      </p>
    </section>
    <img
      src={ProjectMaryImage}
      alt="Project Mary Telegram companion conversation"
      className="block mx-auto mb-8 w-full max-w-[650px]"
    />
    <section className="mb-6">
      <h3 className="text-3xl mb-2">How It Works</h3>
      <p>
        Incoming Telegram messages pass through an asynchronous conversation
        orchestrator. It retrieves relevant memories, adds persona instructions,
        requests a response from DeepSeek, and queues the reply for delivery.
        Conversation history feeds the memory layer, while subscriptions, message
        packs, and free quotas determine access through Telegram Stars.
      </p>
    </section>
    <section>
      <h3 className="text-3xl mb-2">Engineering Decisions</h3>
      <ul className={unorderedList}>
        <li className="mb-3">
          <strong>Hierarchical vector memory:</strong> LangChain and Milvus store
          conversation fragments and progressively summarized history. Local
          SentenceTransformer embeddings support retrieval, with Milvus Lite and
          Standalone deployment options.
        </li>
        <li className="mb-3">
          <strong>Asynchronous delivery:</strong> A messenger abstraction
          separates Telegram transport from conversation logic. Per-user message
          queues, delivery delays, typing simulation, and retries handle outgoing
          replies.
        </li>
        <li className="mb-3">
          <strong>Modular integrations:</strong> Separate persona, language-model,
          memory, messaging, and payment modules keep their responsibilities
          explicit. Persona traits and memory behavior are configurable.
        </li>
        <li>
          <strong>Access and persistence:</strong> Telegram Stars payments support
          subscriptions and consumable message packs. SQLite or JSON storage
          tracks user state and quotas; Docker Compose assembles the bot and
          Milvus services. Pytest tests cover agent, memory, messaging, and payment
          behavior.
        </li>
      </ul>
    </section>
  </>
);

const myPortfolioSiteArticle = (
  <>
    <section className="mb-6">
      <h3 className="text-3xl mb-2">The Idea</h3>
      <p>
        My personal portfolio brings together frontend work, Python projects, and
        professional experience in a pixel-art world of cats.
      </p>
    </section>
    <section>
      <h3 className="text-3xl mb-2">Implementation</h3>
      <p>
        Built with React, TypeScript, Vite, and Tailwind CSS, with an animated
        character card, parallax backgrounds, project dialogs, and a switchable
        CRT effect. Feel free to explore!
      </p>
    </section>
  </>
);

export const projects: ProjectCardProps[] = [
  {
    title: "Proceset",
    summary: "BI report builders and a more flexible analytics module at Infomaximum.",
    tags: ["react", "typescript", "mobx", "css-in-js"],
    image: ProcesetImage,
    stack: [
      "React", "TypeScript", "MobX", "CSS-in-JS (Emotion)",
      "GraphQL", "Ant Design", "Jest",
    ],
    content: procesetArticle,
    projectLink: "https://infomaximum.ru/product",
  },
  {
    title: "Foresight Analytical Platform",
    summary: "Enterprise BI reporting, spreadsheet collaboration, and faster data fetching.",
    tags: ["typescript", "react", "redux", "jest", "storybook"],
    image: ForesightImage,
    stack: ["TypeScript", "React", "Redux", "Jest", "Storybook", "ESLint", "PowerShell"],
    content: foresightArticle,
    projectLink: "https://www.fsight.ru/en/platform/",
  },
  {
    title: "NoteKeeper",
    summary: "My main personal project: a Python app that turns tabletop recordings into transcripts and AI session recaps.",
    tags: ["python", "textual", "whisperx", "sqlite", "deepseek"],
    image: NoteKeeperImage,
    stack: [
      "Python 3.11", "Textual", "Typer / Rich", "SQLite", "FFmpeg",
      "WhisperX", "PyTorch", "DeepSeek", "tiktoken", "Pydantic", "pytest",
    ],
    content: noteKeeperArticle,
    projectLink: "https://github.com/C0deCat/NoteKeeper",
  },
  {
    title: "Project Mary",
    summary: "An async Telegram AI companion with long-term vector memory and Telegram Stars payments.",
    tags: ["python", "langchain", "milvus", "deepseek", "telegram"],
    image: ProjectMaryImage,
    stack: [
      "Python", "asyncio", "LangChain", "Milvus", "SentenceTransformers",
      "DeepSeek", "Telethon / python-telegram-bot", "Telegram Stars",
      "SQLite", "Docker Compose", "pytest",
    ],
    content: projectMaryArticle,
    projectLink: "https://github.com/C0deCat/project-mary",
  },
  {
    title: "This exact portfolio site",
    summary: "A React portfolio with pixel cats, parallax scenes, and an optional CRT effect.",
    tags: ["react", "vite", "tailwind", "typescript"],
    image: PortfolioImage,
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    content: myPortfolioSiteArticle,
    projectLink: "https://github.com/C0deCat/portfolio-page",
  },
];
