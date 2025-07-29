import FoldImage from "../assets/Fold.svg";
import type { ProjectCardProps } from "../types";

const placeholder = (
  <p>
    This is a placeholder description of the project. Clicking the image or the
    button opens this modal. This is a placeholder description of the project.
    Clicking the image or the button opens this modal. This is a placeholder
    description of the project. Clicking the image or the button opens this
    modal.
  </p>
);

export const projects: ProjectCardProps[] = [
  {
    title: "Example",
    tags: ["react", "vite"],
    image: FoldImage,
    stack: ["react", "vite", "tailwind"],
    content: placeholder,
  },
  {
    title: "Example",
    tags: ["react", "vite"],
    image: FoldImage,
    stack: ["react", "vite", "tailwind"],
    content: <p>Another project description.</p>,
  },
];
