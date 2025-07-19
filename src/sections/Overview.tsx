export const Overview: React.FC = () => {
  return (
    <section
      id="overview"
      className="flex flex-col items-center pt-8 pb-8 h-screen justify-between"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-5xl text-primary text-center lowercase w-full">
          a tale of
        </h2>
        <h1 className="text-9xl text-primary text-center uppercase font-bitcount font-[350]">
          Vladislav
          <br />
          <span className="text-(--color-primary)">S.</span>
        </h1>
        <h2 className="text-5xl text-primary text-center lowercase w-full">
          software engineer, frontend developer
          <br />
          and universal problem solver
        </h2>
      </div>
      <div className="text-5xl text-primary lowercase">Continue</div>
    </section>
  );
};
