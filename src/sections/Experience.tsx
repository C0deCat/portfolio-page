import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import JobPosition from "../components/JobPosition";

const Experience: React.FC = () => {
  const block = classNames(defaultContainer(), "p-8 flex flex-col gap-4");

  return (
    <section id="experience" className={block}>
      <JobPosition
        title="Frontend Developer"
        place="TechCorp"
        site="https://techcorp.example"
        date="2023 - Present"
        location="Remote"
        description="Building user interfaces and interactive features."
        stack={["React", "TypeScript", "TailwindCSS"]}
      />
      <JobPosition
        title="UI Engineer"
        place="DesignPro"
        site="https://designpro.example"
        date="2021 - 2023"
        location="New York, NY"
        description="Implemented responsive design and collaborated with designers."
        stack={["Vue", "SCSS", "Figma"]}
      />
      <JobPosition
        title="Web Developer"
        place="Freelance"
        site="https://freelance.example"
        date="2019 - 2021"
        location="Moscow, Russia"
        description="Delivered web solutions for clients across industries."
        stack={["HTML", "CSS", "JavaScript"]}
      />
    </section>
  );
};

export default Experience;
