import classNames from "classnames";
import { defaultContainer } from "../stylizers";

const Experience: React.FC = () => {
  const block = classNames(defaultContainer());

  return (
    <section id="experience" className="p-8 flex justify-end">
      Здесь будет опыт-попыт
    </section>
  );
};

export default Experience;
