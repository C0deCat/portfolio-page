import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import { expertiseContent } from "../data/expertise";
import type { DescriptonBlockProps } from "../types";

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

const renderBlocks = (blocks: DescriptonBlockProps[]) =>
  blocks.map((block, idx) => (
    <DescriptonBlock key={idx} {...block} />
  ));

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
  return (
    <section id="experience" className="p-8 flex justify-end">
      <div
        id="cardWrapper"
        className="flex flex-col flex-wrap @container"
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
