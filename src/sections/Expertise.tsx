import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import { expertiseContent } from "../data/expertise";
import type { DescriptonBlockProps } from "../types";
import catStanding from "../assets/CatStanding.png";
import wantedKitty from "../assets/WantedKitty.png";

const DescriptonBlock: React.FC<DescriptonBlockProps> = ({
  title,
  classname,
  children,
}) => {
  const block = classNames(
    defaultContainer(),
    "text-base sm:text-[2.65cqw] pt-2.5 pb-2.5 pr-5 pl-5",
    classname
  );
  return (
    <div className={block}>
      <h2 className="uppercase text-xl sm:text-[4cqw] pt">{title}</h2>
      {children}
    </div>
  );
};

const firstRow: DescriptonBlockProps[] = [
  {
    title: "Portrait",
    classname:
      "aspect-square self-stretch min-h-[200px] grow @md:grow-0 @max-md:border-b-0 @md:border-r-0",
  },
  {
    title: "Character Info",
    classname: "grow",
    children: expertiseContent["Character Info"],
  },
];

const secondRow: DescriptonBlockProps[] = [
  {
    title: "Frontend",
    classname: "w-full border-t-0 border-b-0",
    children: expertiseContent.Frontend,
  },
];

const thirdRow: DescriptonBlockProps[] = [
  {
    title: "Software Engineer",
    classname: "flex-1 basis-[250px] @max-md:border-b-0 @md:border-r-0",
    children: expertiseContent["Software Engineer"],
  },
  {
    title: "Miscellaneous",
    classname: "flex-1 basis-[250px]",
    children: expertiseContent.Miscellaneous,
  },
];

const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [maxTranslation, setMaxTranslation] = useState({ x: 0, y: 0 });

  const renderBlocks = useCallback(
    (blocks: DescriptonBlockProps[]) =>
      blocks.map((block, idx) => <DescriptonBlock key={idx} {...block} />),
    []
  );

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const thresholdDistance = 250;
      const distanceIntoViewport = Math.max(0, window.innerHeight - rect.top);
      const totalDistance =
        rect.height + window.innerHeight - thresholdDistance;

      const rawProgress =
        ((window.innerHeight - rect.top - thresholdDistance) / totalDistance) *
        2.5;
      let clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      console.log("progress", { rawProgress, clampedProgress });

      if (distanceIntoViewport < thresholdDistance) {
        clampedProgress = 0;
      }

      setProgress(clampedProgress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const updateTranslationLimits = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      console.log("bounding rect", rect);
      const nextTranslation = {
        x: Math.max(rect.width * 0.45, 220),
        y: Math.max(rect.height * 0.65, 260),
      };

      setMaxTranslation((prev) =>
        prev.x === nextTranslation.x && prev.y === nextTranslation.y
          ? prev
          : nextTranslation
      );
    };

    updateTranslationLimits();

    window.addEventListener("resize", updateTranslationLimits);

    return () => {
      window.removeEventListener("resize", updateTranslationLimits);
    };
  }, []);

  const hasReachedKitty = progress >= 0.9;

  const handleOpenRequest = useCallback(() => {
    if (!hasReachedKitty && !isCardVisible) {
      return;
    }

    setIsCardVisible(true);
  }, [hasReachedKitty, isCardVisible]);

  const catStandingTransform = `translate(${progress * maxTranslation.x}px, ${
    progress * maxTranslation.y
  }px)`;

  const cardWrapperClass = classNames(
    "flex flex-col flex-wrap @container",
    isCardVisible
      ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      : "hidden"
  );

  const showCallToAction = hasReachedKitty && !isCardVisible;

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="p-8 relative flex min-h-[100vh] justify-end items-end max-sm:pl-0 max-sm:pr-0"
    >
      <button
        type="button"
        onClick={handleOpenRequest}
        className={classNames(
          "absolute z-10 left-[32px] top-[32px] h-[150px] w-auto bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
          hasReachedKitty || isCardVisible ? "cursor-pointer" : "cursor-default"
        )}
        style={{
          transform: catStandingTransform,
          transition: "transform 0.2s ease-out",
        }}
        aria-label="Open message"
      >
        <img
          src={catStanding}
          alt="Cat standing with a letter"
          className="h-full w-auto pixelated pointer-events-none select-none"
        />
      </button>
      <button
        type="button"
        onClick={handleOpenRequest}
        className={classNames(
          "absolute bottom-[32px] left-1/2 h-[400px] -translate-x-1/2 bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
          hasReachedKitty || isCardVisible ? "cursor-pointer" : "cursor-default"
        )}
        aria-label="Open message"
      >
        <img
          src={wantedKitty}
          alt="Wanted kitty poster"
          className="h-full w-auto pixelated pointer-events-none select-none"
        />
      </button>
      {showCallToAction && (
        <button
          type="button"
          onClick={handleOpenRequest}
          className="absolute left-1/2 -translate-x-1/2 z-10 bg-white/90 px-6 py-3 rounded shadow-lg uppercase tracking-[0.4em] text-sm text-neutral-900 animate-pulse"
          style={{ bottom: "300px" }}
        >
          Click to open message
        </button>
      )}
      <div
        id="cardWrapper"
        className={cardWrapperClass}
        style={{ width: "min(max(40vw,36rem),100vw)" }}
      >
        <div className="flex flex-wrap @md:flex-nowrap items-stretch w-full">
          {renderBlocks(firstRow)}
        </div>
        {renderBlocks(secondRow)}
        <div className="flex flex-wrap @md:flex-nowrap w-full">
          {renderBlocks(thirdRow)}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
