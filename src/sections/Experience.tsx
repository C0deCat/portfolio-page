import classNames from "classnames";
import { defaultContainer } from "../stylizers";

const Experience: React.FC = () => {
  const block = classNames(defaultContainer(), "p-8 flex justify-end");

  return (
    <section id="experience" className={block}>
      Здесь будет опыт-попыт
    </section>
  );
};

export default Experience;
