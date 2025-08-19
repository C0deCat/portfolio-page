import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import { expertiseContent } from "../data/expertise";
import type { DescriptonBlockProps } from "../types";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const DescriptonBlock: React.FC<DescriptonBlockProps> = ({
  title,
  classname,
  children,
}) => {
  const block = classNames(
    defaultContainer(),
    "text-base sm:text-[3cqw] pt-2.5 pb-2.5 pr-5 pl-5",
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
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const renderBlocks = useCallback(
    (blocks: DescriptonBlockProps[]) =>
      blocks.map((block, idx) => <DescriptonBlock key={idx} {...block} />),
    []
  );

  const updateWidth = useCallback(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const minWidth = Math.max(window.innerWidth * 0.4, 36 * rem);
    const assumedWidth = Math.min(minWidth, window.innerWidth);

    let resultWidth = assumedWidth;
    console.log(
      `Initial assumed width: ${resultWidth}px`,
      "innerWidth:",
      window.innerWidth
    );
    while (assumedWidth < window.innerWidth) {
      wrapper.style.width = `${resultWidth}px`;
      const height = section.getBoundingClientRect().height;
      console.log(`Checking width: ${resultWidth}px, height: ${height}px`);
      if (height > window.innerHeight) {
        resultWidth -= 1; // Decrease width until it fits
      }
      if (height <= window.innerHeight) {
        break; // Stop when it fits
      }
    }

    wrapper.style.width = `${resultWidth}px`;
  }, [sectionRef, wrapperRef]);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section
      id="expertise"
      className="p-8 flex min-h-[100vh] justify-end items-end max-sm:pl-0 max-sm:pr-0"
      ref={sectionRef}
    >
      <div
        id="cardWrapper"
        className="flex flex-col flex-wrap @container"
        ref={wrapperRef}
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
