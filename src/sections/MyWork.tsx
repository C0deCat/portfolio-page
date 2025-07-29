import React from "react";
import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import FoldImage from "../assets/Fold.svg";
import Modal from "../components/Modal";

export interface ProjectCardProps {
  title: string;
  tags: string[];
  image: string;
  stack: string[];
  content: React.ReactNode;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  tags,
  image,
  stack,
  content,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const cardClasses = classNames(
    defaultContainer(),
    "overflow-hidden flex flex-col basis-3xs h-fit"
  );

  return (
    <>
      <div className={cardClasses}>
        <div
          className="w-full aspect-video overflow-hidden bg-black cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img src={image} alt={title} className="object-cover w-full h-full" />
        </div>
        <div className="p-2">
          <h3 className="text-xl text-primary">{title}</h3>
          <ul className="flex flex-wrap gap-2 text-secondary text-sm mb-2">
            {tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>

          <button
            className="text-base underline cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Show project
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal
          title={title}
          stack={stack}
          content={content}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const MyWork: React.FC = () => {
  return (
    <section
      id="work"
      className="p-8 flex flex-wrap gap-12 max-md:justify-center min-h-[100vh]"
    >
      <ProjectCard
        title="Example"
        tags={["react", "vite"]}
        image={FoldImage}
        stack={["react", "vite", "tailwind"]}
        content={
          <p>
            This is a placeholder description of the project. Clicking the image
            or the button opens this modal. This is a placeholder description of
            the project. Clicking the image or the button opens this modal. This
            is a placeholder description of the project. Clicking the image or
            the button opens this modal. This is a placeholder description of
            the project. Clicking the image or the button opens this modal.This
            is a placeholder description of the project. Clicking the image or
            the button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.This is a placeholder description of the
            project. Clicking the image or the button opens this modal.This is a
            placeholder description of the project. Clicking the image or the
            button opens this modal.
          </p>
        }
      />
      <ProjectCard
        title="Example"
        tags={["react", "vite"]}
        image={FoldImage}
        stack={["react", "vite", "tailwind"]}
        content={<p>Another project description.</p>}
      />
    </section>
  );
};

export default MyWork;
