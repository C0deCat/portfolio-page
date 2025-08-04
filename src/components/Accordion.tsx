import React, { useState } from "react";
import classNames from "classnames";
import { defaultContainer } from "../stylizers";

interface AccordionProps {
  children: [React.ReactNode, React.ReactNode];
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const headerClasses = classNames(
    defaultContainer(),
    "p-4 flex justify-between items-center cursor-pointer text-xl",
    open && "border-b-0"
  );

  const contentClasses = classNames(
    defaultContainer(false),
    "border-b-4 border-(--color-primary) mt-4 p-4 text-xl"
  );

  return (
    <div>
      <div onClick={() => setOpen(!open)} className={headerClasses}>
        <div className="flex-1">{children[0]}</div>
        <span className="ml-4">{open ? "-" : "+"}</span>
      </div>
      {open && <div className={contentClasses}>{children[1]}</div>}
    </div>
  );
};

export default Accordion;
