import classNames from "classnames";
import { defaultContainer } from "../stylizers";

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
  const block = classNames(defaultContainer(), classname);
  return (
    <div className={block}>
      <h2 className="uppercase text-[4cqw]">{title}</h2>
      <p className="text-[3cqw]">{children}</p>
    </div>
  );
};

const Expertise: React.FC = () => {
  return (
    <section id="experience" className="p-8 flex justify-end">
      <div
        id="cardWrapper"
        className="flex flex-col flex-wrap [container-type:inline-size]"
        style={{ width: "min(max(40vw,36rem),100vw)" }}
      >
        <div className="flex flex-wrap items-stretch w-full">
          <DescriptonBlock title="Character Info" classname="grow">
            <>
              name: Vladislav S.
              <br />
              status: Open to work
              <br />
              experience: 4+ years
              <br />
              titles: Software Engineer, Frontend Developer, Excellent Problem
              Solver
            </>
          </DescriptonBlock>
          <DescriptonBlock
            title="Portrait"
            classname="aspect-square self-stretch min-w-[200px] min-h-[200px]"
          />
        </div>
        <DescriptonBlock title="Frontend" classname="w-full" />
        <div className="flex flex-wrap w-full">
          <DescriptonBlock
            title="Software Engineer"
            classname="flex-1 min-w-[250px]"
          />
          <DescriptonBlock
            title="Miscellaneous"
            classname="flex-1 min-w-[250px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Expertise;
