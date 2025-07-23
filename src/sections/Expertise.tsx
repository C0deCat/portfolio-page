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
      <h2 className="uppercase text-2xl">{title}</h2>
      <p className="text-xl">{children}</p>
    </div>
  );
};

const Expertise: React.FC = () => {
  return (
    <section id="experience" className="p-8 flex justify-end">
      <div className="flex flex-wrap max-w-xl">
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
        <DescriptonBlock title="Portrait" classname="w-[200px]" />
        <div className="w-full" />
        <DescriptonBlock title="Frontend" classname="grow" />
        <div className="w-full" />
        <DescriptonBlock title="Software Engineer" classname="grow" />
        <DescriptonBlock title="Miscellaneous" classname="grow" />
      </div>
    </section>
  );
};

export default Expertise;
