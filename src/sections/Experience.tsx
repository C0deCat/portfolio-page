import JobPosition from "../components/JobPosition";
import { defaultContainer } from "../stylizers";
import classNames from "classnames";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="p-8 min-h-[100vh]">
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col gap-4 max-w-3xl w-full">
          <JobPosition
            title="React Developer"
            place="Foresight"
            site="https://fsight.ru/en"
            date="December 2024 — Present"
            location="Remote"
            description={[
              "Refactored BI data fetching, reducing network traffic by over 20% and making key operations up to 4 times faster.",
              "Built real-time spreadsheet comments, new infographic components, cross-component data synchronization, and other spreadsheet improvements requested by clients.",
              "Automated legacy deployment and build processes using PowerShell scripts, reducing manual setup time for developers working on older modules.",
              "Implemented full support for new data source types in the reporting UI, expanding the data available for analytical reports.",
            ]}
            stack={[
              "TypeScript",
              "React",
              "Redux",
              "Jest",
              "Storybook",
              "ESLint",
              "PowerShell",
            ]}
          />
          <JobPosition
            title="Founding Engineer (Part-time contract)"
            place="Persona"
            site="https://persona.bz"
            date="September 2024 — December 2024"
            location="Remote"
            description={[
              "Led the initial MVP for an AI-powered candidate and employer matching startup, from system design in Figma to implementation with Next.js, React, and Tailwind CSS.",
              "Built an internal lead generation tool that enabled the sales team to manage and track customer outreach, directly supporting early-stage growth.",
              "Designed and implemented the AI interaction pipeline, defining how the core platform and internal tools interfaced with RAG models to ensure consistent and scalable data processing.",
            ]}
            stack={[
              "Figma",
              "TypeScript",
              "Next.js",
              "Node.js",
              "React",
              "Tailwind CSS",
            ]}
          />
          <JobPosition
            title="Middle+ Frontend Engineer"
            place="Gazprombank"
            site="https://gazprombank.ru/en"
            date="December 2023 — December 2024"
            location="Moscow, Russia"
            description={[
              "Increased unit test coverage from 13% to 77% and e2e coverage from 34% to 93% for the bank's internal Performance Management system.",
              "Developed the UI for a new cash ordering system, resulting in a 60% reduction in the time required for employees to complete the process.",
              "Architected and implemented a dynamic theming system that cut the development time for new UI themes by 50%.",
              "Built a news notification system that increased employee awareness of company events to 81%, as measured by internal reports.",
              "Initiated and documented new onboarding practices, creating a standardized guide that helped new developers contribute to the project faster.",
            ]}
            stack={[
              "TypeScript",
              "JavaScript",
              "React",
              "Redux",
              "Redux-saga",
              "Jest",
              "Cypress",
              "Material UI",
              "ESLint",
            ]}
          />
          <JobPosition
            title="Frontend Developer (React.js)"
            place="Infomaximum"
            site="https://infomaximum.com"
            date="August 2022 — December 2023"
            location="Remote"
            description={[
              "Led a major refactoring of a key analytics module, reducing boilerplate code for new features by over 80% and significantly improving developer productivity.",
              "Migrated the core report-building system to a new, more flexible architecture, enabling new types of user customizations that were previously impossible.",
              "Became the primary owner and contributor for the analytical reports module, responsible for both new feature development and architectural improvements.",
              "Collaborated with UI/UX designers to refine technical requirements, reducing rework and contributing to a ~20% faster time-to-market for features.",
            ]}
            stack={[
              "TypeScript",
              "React",
              "MobX",
              "GraphQL",
              "Ant Design",
              "CSS-in-JS (Emotion)",
              "Jest",
              "ESLint",
            ]}
          />
          <div className={classNames(defaultContainer(), "p-4 mt-8")}>
            <h2 className="text-2xl uppercase mb-4">Education</h2>
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-xl">Bachelor's degree in Computer Science</h3>
                <p className="text-secondary">2023 — Present · In progress</p>
                <p>Peter the Great St. Petersburg Polytechnic University</p>
                <p className="text-secondary">Remote · Saint Petersburg, Russia</p>
              </div>
              <div>
                <h3 className="text-xl">Associate's degree in Computer Science</h3>
                <p className="text-secondary">2021</p>
                <p>Saransk State Industrial and Economic College</p>
                <p className="text-secondary">Saransk, Russia</p>
              </div>
            </div>
          </div>
          <div className={classNames(defaultContainer(), "p-4")}>
            <h2 className="text-2xl uppercase mb-4">Languages</h2>
            <ul className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-lg">
              <li>Russian — Native</li>
              <li>English — C1, professional working proficiency</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
