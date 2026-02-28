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
              "Working on the company's flagship product - the BI system Foresight Analytical Platform.",
              "Implemented comments for built-in spreadsheets, speeding up communication between our clients' employees by 30%.",
              "Updated legacy tools and wrote PowerShell scripts for automation, reducing the time spent on tasks with legacy code by 15-20%.",
              "Optimized queries in BI system reports, reducing query traffic by 21% (and up to 4x for some operations).",
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
            title="Founding Engineer"
            place="Persona"
            site="https://persona.bz"
            date="September 2024 — December 2024"
            location="Remote"
            description={[
              "As part of a short-term collaboration, I worked on a new startup project: a smart AI system for matching candidates and employers.",
              "Designed a new system design using Figma and implemented it using NextJs + React + Tailwind + NextUi.",
              "Developed the front-end part of an internal product: a lead generation platform",
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
              "Developed an internal project - Performance Management system applied in all branches of the bank;",
              "Designed a new system of news notifications, raising the number of employees notified about changes and events in the bank to 81%;",
              "Created UI for the new cash ordering system, reducing employee time spent on this business process by 60%;",
              "Implemented a convenient UI theme mechanism into the project, reducing the time for developing new themes by 50%;",
              "Increased project test coverage from 13% to 77% for units and from 34% to 93% for e2e;",
              "Initiated the creation of new practices to accelerate the onboarding process for new employees."
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
              "ESLint"
            ]}
          />
          <JobPosition
            title="Frontend Developer (React.js)"
            place="Infomaximum"
            site="https://infomaximum.com"
            date="August 2022 — December 2023"
            location="Remote"
            description={[
              "Developed company's main product - active BI-system named Proceset;",
              "Became the main contributor to one of the key modules of Proceset - a system for building analytical reports. On the last day of work up to 40% of changes in the module were made by me;",
              "Successfully migrated the report building system to a new architecture, which significantly expanded the possibilities of end users to customize the system;",
              "Conducted major refactoring which allowed to reduce the amount of boilerplate code for new features in module by 80-85%;",
              "Constantly consulted UI/UX designers on technical issues, which allowed to reduce time-to-market on tasks related to me by 16-20%."
            ]}
            stack={[
              "Typescript",
              "React",
              "MobX",
              "GraphQL",
              "AntDesign",
              "Css-in-js (Emotion)",
              "Jest",
              "ESLint"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
