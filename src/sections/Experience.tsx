import JobPosition from "../components/JobPosition";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="p-8 min-h-[100vh]">
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col gap-4 max-w-3xl w-full">
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
        </div>
      </div>
    </section>
  );
};

export default Experience;
