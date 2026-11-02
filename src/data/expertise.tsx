import { unorderedList } from "../stylizers";
import React from "react";

export const expertiseContent: Record<string, React.ReactNode> = {
  "Character Info": (
    <p>
      name: Vladislav Smolkin
      <br />
      status: Open to work
      <br />
      experience: 4 years
      <br />
      role: Senior Frontend Engineer
      <br />
      focus: React, BI, AI
    </p>
  ),
  Frontend: (
    <>
      Languages & frameworks:
      <ul className={unorderedList}>
        <li>TypeScript, JavaScript, React, Next.js, HTML, CSS/SCSS</li>
      </ul>
      State & data:
      <ul className={unorderedList}>
        <li>Redux, MobX, GraphQL</li>
        <li>Analytical report builders and complex BI interfaces</li>
      </ul>
      Testing:
      <ul className={unorderedList}>
        <li>Jest (unit), Cypress (e2e), Storybook (UI development)</li>
      </ul>
      Tools:
      <ul className={unorderedList}>
        <li>Git, Docker, Webpack, Vite, Tailwind CSS</li>
      </ul>
    </>
  ),
  "Software Engineer": (
    <>
      Engineering practices:
      <ul className={unorderedList}>
        <li>System design, SOLID, TDD, CI/CD</li>
        <li>Legacy migrations and performance optimization</li>
        <li>Node.js, SQL</li>
      </ul>
    </>
  ),
  Miscellaneous: (
    <>
      Python & AI personal projects:
      <ul className={unorderedList}>
        <li>SQLite, audio processing, background processes</li>
        <li>LLM integration, LangChain, Milvus vector memory</li>
        <li>CLI/TUI applications, ports and adapters, pytest</li>
      </ul>
    </>
  ),
};
