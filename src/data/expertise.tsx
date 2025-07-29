import { unorderedList } from "../stylizers";
import React from "react";

export const expertiseContent: Record<string, React.ReactNode> = {
  "Character Info": (
    <p>
      name: Vladislav S.
      <br />
      status: Open to work
      <br />
      experience: 4+ years
      <br />
      titles: Software Engineer, Frontend Developer, Excellent Problem Solver
    </p>
  ),
  Frontend: (
    <>
      Basics:
      <ul className={unorderedList}>
        <li>HTML, CSS, JS, Figma</li>
      </ul>
      Frameworks:
      <ul className={unorderedList}>
        <li>Vast experience with React + Redux</li>
        <li>Knowledge of Vue, Angular, Next</li>
      </ul>
      Testing:
      <ul className={unorderedList}>
        <li>e2e: cypress, storybook</li>
        <li>unit: jest, react testing library</li>
      </ul>
      Others:
      <ul className={unorderedList}>
        <li>GraphQL, Tailwind, Docker, Webpack, Vite</li>
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
        <li>backend development</li>
        <li>machine learning</li>
      </ul>
    </>
  ),
};

