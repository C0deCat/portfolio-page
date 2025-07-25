import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import FoldImage from "../assets/Fold.svg";

export interface ProjectCardProps {
  title: string;
  tags: string[];
  image: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  tags,
  image,
}) => {
  const cardClasses = classNames(defaultContainer(), "overflow-hidden flex flex-col");

  return (
    <div className={cardClasses}>
      <div className="w-full aspect-video overflow-hidden bg-black">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h3 className="text-xl text-primary mb-2">{title}</h3>
        <ul className="flex flex-wrap gap-2 text-secondary text-sm">
          {tags.map((tag) => (
            <li key={tag} className="px-2 py-1 border border-(--color-secondary) rounded">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MyWork: React.FC = () => {
  return (
    <section id="work" className="p-8 space-y-4">
      <h1 className="text-3xl mb-4">My Work</h1>
      <ProjectCard title="Example" tags={["react", "vite"]} image={FoldImage} />
    </section>
  );
};

export default MyWork;
