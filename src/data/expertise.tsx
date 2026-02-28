import { unorderedList } from "../stylizers";
import React from "react";

export const expertiseContent: Record<string, React.ReactNode> = {
  "Character Info": (
    <p>
      name: Vladislav S.
      <br />
      status: Open to work
      <br />
      experience: 5+ years
      <br />
      titles: Software Engineer, Frontend Developer, Excellent Problem Solver
    </p>
  ),
  Frontend: (
    <>
      Basics:
      <ul className={unorderedList}>
        <li>TypeScript, HTML, CSS, JS, Python, C#, Java, Figma</li>
      </ul>
      JS frameworks:
      <ul className={unorderedList}>
        <li>Vast experience with React + Redux or MobX</li>
        <li>Some experience with Node.js</li>
        <li>Knowledge of Vue, Angular, Next</li>
      </ul>
      Testing:
      <ul className={unorderedList}>
        <li>e2e: cypress, storybook</li>
        <li>unit: jest, react testing library</li>
      </ul>
      Others:
      <ul className={unorderedList}>
        <li>GraphQL, Tailwind, Recharts, Docker, Webpack, Vite</li>
        <li>Telethon, Milvus, Langchain</li>
        <li>And so on...</li>
      </ul>
    </>
  ),
  "Software Engineer": (
    <>
      Experience in functional and OOP:
      <ul className={unorderedList}>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>Python</li>
        <li>C#</li>
        <li>Java</li>
      </ul>
    </>
  ),
  Miscellaneous: (
    <>
      Beside my main focus I'm also have knowledge in:
      <ul className={unorderedList}>
        <li>backend development (Node.js)</li>
        <li>AI Integration (Milvus, Langchain)</li>
      </ul>
    </>
  ),
};
