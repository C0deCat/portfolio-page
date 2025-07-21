import classNames from "classnames";
import { defaultContainer } from "../stylizers";

const Expertise: React.FC = () => {
  const block = classNames(defaultContainer());

  return (
    <section id="experience" className="p-8 flex justify-end">
      <div className="flex flex-wrap">
        <div className={block}>
          <h2>Character Info</h2>
        </div>
        <div className={block}>
          <h2>Portrait</h2>
        </div>
        <div className="w-full" />
        <div className={block}>
          <h2>Frontend</h2>
        </div>
        <div className="w-full" />
        <div className={block}>
          <h2>Software Engineer</h2>
        </div>
        <div className={block}>
          <h2>Miscellaneous</h2>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
