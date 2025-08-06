import React from "react";
import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import Modal from "../components/Modal";
import type { ProjectCardProps } from "../types";
import { projects } from "../data/projects";

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
      className="p-8 flex flex-wrap gap-12 content-start justify-center min-h-[100vh]"
    >
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </section>
  );
};

export default MyWork;
