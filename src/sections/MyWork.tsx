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
  const cardClasses = classNames(
    defaultContainer(),
    "overflow-hidden flex flex-col basis-3xs"
  );

  return (
    <div className={cardClasses}>
      <div className="w-full aspect-video overflow-hidden bg-black cursor-pointer">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="p-2">
        <h3 className="text-xl text-primary">{title}</h3>
        <ul className="flex flex-wrap gap-2 text-secondary text-sm mb-2">
          {tags.map((tag) => (
            <li key={tag} className="">
              #{tag}
            </li>
          ))}
        </ul>

        <button className="text-base underline cursor-pointer">
          Show project
        </button>
      </div>
    </div>
  );
};

const MyWork: React.FC = () => {
  return (
    <section
      id="work"
      className="p-8 flex flex-wrap gap-12 max-md:justify-center"
    >
      <ProjectCard title="Example" tags={["react", "vite"]} image={FoldImage} />
      <ProjectCard title="Example" tags={["react", "vite"]} image={FoldImage} />
    </section>
  );
};

export default MyWork;
