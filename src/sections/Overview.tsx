import catBonefire from "../assets/cat_bonefire.gif";
import { LightSource } from "../components/LightSource";

export const Overview: React.FC = () => {
  return (
    <section
      id="overview"
      className="flex flex-col items-center px-6 py-8 h-svh min-h-[48rem] justify-between"
    >
      <div className="w-full shrink-0 flex justify-center">
        <div
          id="portfolio_title"
          className="flex flex-col items-center w-full max-w-5xl text-center"
        >
          <p className="text-2xl sm:text-4xl text-primary lowercase">
            a tale of
          </p>
          <h1 className="text-[clamp(3rem,10vw,8rem)] leading-none text-primary uppercase font-bitcount font-[350] my-4">
            Vladislav
            <br />
            <span className="text-(--color-primary)">Smolkin</span>
          </h1>
          <p className="text-2xl sm:text-4xl text-primary">
            Senior Frontend Engineer (React, BI, AI)
          </p>
          <p className="text-base sm:text-xl text-secondary max-w-3xl mt-4">
            4 years building React interfaces for enterprise BI and fintech,
            from analytical report builders to operational tools. I also build
            Python applications with audio processing and AI/RAG workflows.
          </p>
        </div>
      </div>
      <div className="grow min-h-40 flex justify-center w-full [container-type:size]">
        <LightSource color="#ff9a00" left={74} top={68}>
          <img
            src={catBonefire}
            alt="Pixel cat resting beside a campfire"
            className="pixelated block size-[100cqmin] object-contain"
          />
        </LightSource>
      </div>
      <div className="text-3xl sm:text-5xl text-primary lowercase">
        <a href="#expertise">Continue</a>
      </div>
    </section>
  );
};
