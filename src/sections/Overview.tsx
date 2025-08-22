import { useEffect, useRef, useState } from "react";
import catBonefire from "../assets/cat_bonefire.png";

export const Overview: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const el = titleRef.current;
      if (!el) return;

      const viewportWidth = window.innerWidth;
      const contentWidth = el.scrollWidth;
      setScale(Math.min(1, viewportWidth / contentWidth));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section
      id="overview"
      className="flex flex-col items-center pt-8 pb-8 h-screen justify-between"
    >
      <div className="w-full overflow-hidden flex justify-center">
        <div
          ref={titleRef}
          id="portfolio_title"
          className="flex flex-col items-center whitespace-nowrap w-fit pr-8 pl-8"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <h2 className="text-5xl text-primary text-center lowercase w-full">
            a tale of
          </h2>
          <h1 className="text-9xl text-primary text-center uppercase font-bitcount font-[350]">
            Vladislav
            <br />
            <span className="text-(--color-primary) after:content-['.'] after:absolute">
              S
            </span>
          </h1>
          <h2 className="text-5xl text-primary text-center lowercase w-full">
            software engineer, frontend developer
            <br />
            and universal problem solver
          </h2>
        </div>
      </div>
      <div className="grow flex justify-center w-full [container-type:size]">
        <img
          src={catBonefire}
          className="pixelated block size-[100cqmin] object-contain"
        />
      </div>
      <div className="text-5xl text-primary lowercase">
        <a href="#expertise">Continue</a>
      </div>
    </section>
  );
};
