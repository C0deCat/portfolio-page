const Experience: React.FC = () => {
  return (
    <section id="experience" className="p-8">
      <h1 className="text-3xl font-bold mb-4">Experience</h1>
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            Software Engineer at XYZ Corp
          </h2>
          <p className="text-gray-700">
            Developed and maintained web applications using React and Node.js.
          </p>
          <p className="text-sm text-gray-500">June 2020 - Present</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            Front-end Developer at ABC Ltd
          </h2>
          <p className="text-gray-700">
            Worked on various projects using Vue.js and Tailwind CSS.
          </p>
          <p className="text-sm text-gray-500">January 2018 - May 2020</p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
