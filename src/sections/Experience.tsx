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
            description="Delivered websfs sdf sdf sdf sdfsdfsdfsjfh kjsdhf kjsdhf lskhfkjls hfkljsdhf jklsh kslhf skjlhf skljjfh skljfh skjfh skjlfh skjf hsklf hskljf skfh skljf hskljfh skljfh sklfh skjlfh skjlfh skljfh skljfh ksldfh skljfh sklfh sklfh skfh sfhskjfghs klf hskfh skjfhsklfh sklfhsklfh sklfh sklfh skl fh sklfh skjlfh skljfh skjfh skj hf ksjhf ksljhf kshf slkjhf lkshf klshf skljhf klsf dfsdfsdfsdfsdfsdfsfsfsdfsdfsdf \n sdfsdf sf \n sdfsdfsdfsdfsdfsdf sdfsdfsdfsfsdfs fsfsdfsfsfsdfsfsdfsfsfkjshfkjsdhfjksdhfl kjsfhlksjhflkjsdhflksjdfhlskjdfh s\ns sdfkjsflkjshfkljshfkjl shfsjklhfskjlf hsjkldfhsjkldfh solutions for clients across industries."
            stack={["HTML", "CSS", "JavaScript"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
