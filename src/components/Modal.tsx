import classNames from "classnames";
import React, { useEffect } from "react";
import { defaultContainer } from "../stylizers";
import CloseIcon from "../assets/Close.svg?react";

interface ModalProps {
  title: string;
  stack: string[];
  content: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, stack, content, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const modalClasses = classNames(
    defaultContainer(false),
    "relative border-0 overflow-hidden w-full h-full"
  );

  return (
    <div className="fixed inset-0 z-20 flex items-start p-5 justify-center">
      <div className={modalClasses}>
        <div className="border-corner h-full overflow-hidden flex flex-col">
          <button
            className="text-3xl leading-none absolute right-[10px] top-[10px] text-(--color-primary) cursor-pointer z-20"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <header className="top-0 flex justify-between items-center p-11 pt-7 border-(--color-primary) pr-32 z-10">
            <h2 className="text-4xl">{title}</h2>
            <span className="text-2xl">open project {"-->"}</span>
          </header>
          <div className="pr-11 pl-11 pb-11 overflow-auto text-2xl">
            <aside className="float-right min-w-[170px] bg-(--color-secondary) ml-4 mb-4 back p-4">
              <p className="mb-4">Stack</p>
              <ul>
                {stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
