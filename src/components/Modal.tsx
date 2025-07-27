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
        <div className="border-corner h-full overflow-hidden">
          <button
            className="text-3xl leading-none absolute right-[10px] top-[10px] text-(--color-primary) cursor-pointer z-20"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <header className="sticky top-0 flex justify-between items-center p-11 pt-7 pb-0 border-(--color-primary) pr-32 z-10">
            <h2 className="text-4xl">{title}</h2>
            <span className="text-2xl">open project {"-->"}</span>
          </header>
          <div className="overflow-auto">
            <div className="p-11">
              <aside className="float-right w-[150px] ml-4 mb-4 border-l border-(--color-primary) pl-4">
                <ul className="space-y-1">
                  {stack.map((item) => (
                    <li key={item}>#{item}</li>
                  ))}
                </ul>
              </aside>
              <div>{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
