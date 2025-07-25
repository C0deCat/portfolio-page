import classNames from "classnames";
import { defaultContainer, unorderedList } from "../stylizers";

interface DescriptonBlockProps {
  title?: string;
  classname?: string;
  children?: React.ReactNode;
}

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

const Expertise: React.FC = () => {
  return (
    <section id="experience" className="p-8 flex justify-end">
      <div
        id="cardWrapper"
        className="flex flex-col flex-wrap @container"
        style={{ width: "min(max(40vw,36rem),100vw)" }}
      >
        <div className="flex flex-wrap @md:flex-nowrap items-stretch w-full">
          <DescriptonBlock
            title="Portrait"
            classname="aspect-square self-stretch min-h-[200px] grow @md:grow-0 @max-md:border-b-0 @md:border-r-0"
          />
          <DescriptonBlock title="Character Info" classname="grow">
            <p>
              name: Vladislav S.
              <br />
              status: Open to work
              <br />
              experience: 4+ years
              <br />
              titles: Software Engineer, Frontend Developer, Excellent Problem
              Solver
            </p>
          </DescriptonBlock>
        </div>
        <DescriptonBlock
          title="Frontend"
          classname="w-full border-t-0 border-b-0"
        >
          <>
            Basics:
            <ul className={unorderedList}>
              <li>HTML, CSS, JS, Figma</li>
            </ul>
            Frameworks:
            <ul className={unorderedList}>
              <li>Vast experience with React + Redux</li>
              <li>Knowledge of Vue, Angular, Next</li>
            </ul>
            Testing:
            <ul className={unorderedList}>
              <li>e2e: cypress, storybook</li>
              <li>unit: jest, react testing library</li>
            </ul>
            Others:
            <ul className={unorderedList}>
              <li>GraphQL, Tailwind, Docker, Webpack, Vite</li>
              <li>And so on...</li>
            </ul>
          </>
        </DescriptonBlock>
        <div className="flex flex-wrap @md:flex-nowrap w-full">
          <DescriptonBlock
            title="Software Engineer"
            classname="flex-1 basis-[250px] @max-md:border-b-0 @md:border-r-0"
          >
            <>
              Experience in functional and OOP:
              <ul className={unorderedList}>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>Python</li>
                <li>C#</li>
                <li>Java</li>
              </ul>
            </>
          </DescriptonBlock>
          <DescriptonBlock
            title="Miscellaneous"
            classname="flex-1 basis-[250px]"
          >
            Beside my main focus I'm also have knowledge in:
            <ul className={unorderedList}>
              <li>backend development</li>
              <li>machine learning</li>
            </ul>
          </DescriptonBlock>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
