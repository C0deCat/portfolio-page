import JobPosition from "../components/JobPosition";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="p-8 min-h-[100vh]">
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col gap-4 max-w-3xl w-full">
          <JobPosition
            title="React Developer"
            place="Foresight"
            site="https://fsight.ru/en"
            date="December 2024 - Now"
            location="Remote"
            description={[
              "Optimized BI https requests by refactoring data fetching logic, reducing network traffic by over 20% and achieving up to a 4x performance gain on key operations.",
              "Developed and launched a real-time commenting feature for spreadsheets within the BI platform, directly addressing client requests for improved collaboration.",
              "Automated legacy deployment and build processes using PowerShell scripts, reducing manual setup time for developers working on older modules.",
              "Contribute to the core development of the Foresight Analytical Platform, a BI system used by enterprise clients.",
            ]}
            stack={[
              "TypeScript",
              "React",
              "Redux",
              "Jest",
              "Storybook",
              "ESLint",
              "Java (legacy code)",
            ]}
          />
          <JobPosition
            title="Founding Engineer (Part-time contract)"
            place="Persona"
            site="https://persona.bz"
            date="September 2024 — December 2024"
            location="Remote"
            description={[
              "Led the end-to-end development of the initial MVP, from creating the system design in Figma to implementation with Next.js, React, and Tailwind.",
              "Built an internal lead generation tool that enabled the sales team to manage and track customer outreach, directly supporting early-stage growth.",
              "Designed and implemented the AI interaction pipeline, defining how the core platform and internal tools interfaced with RAG models to ensure consistent and scalable data processing.",
            ]}
            stack={[
              "Figma",
              "TypeScript",
              "NextJs",
              "Node.js",
              "React",
              "Tailwind",
              "NextUi",
            ]}
          />
          <JobPosition
            title="Middle+ Frontend Engineer"
            place="Gazprombank"
            site="https://gazprombank.ru/en"
            date="December 2023 — December 2024"
            location="Moscow, Russia"
            description={[
              "Drove a massive quality improvement initiative for the bank's internal Performance Management system, increasing unit test coverage from 13% to 77% and e2e coverage from 34% to 93%.",
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
              "MaterialUI",
              "ESLint",
            ]}
          />
          <JobPosition
            title="Frontend Developer (React.js)"
            place="Infomaximum"
            site="https://infomaximum.com"
            date="August 2020 — December 2023"
            location="Remote"
            description={[
              "Led a major refactoring of a key analytics module, reducing boilerplate code for new features by over 80% and significantly improving developer productivity.",
              "Migrated the core report-building system to a new, more flexible architecture, enabling new types of user customizations that were previously impossible.",
              "Became the primary owner and contributor for the analytical reports module, responsible for both new feature development and architectural improvements.",
              "Collaborated with UI/UX designers to refine technical requirements, reducing rework and contributing to a ~20% faster time-to-market for features.",
            ]}
            stack={[
              "Typescript",
              "React",
              "MobX",
              "GraphQL",
              "AntDesign",
              "Css-in-js (Emotion)",
              "Jest",
              "ESLint",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
