import classNames from "classnames";
import React, { useEffect } from "react";
import { defaultContainer } from "../stylizers";

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
        <div className="border-corner h-full">
          <header className="sticky top-0 flex justify-between items-center p-4 pt-2 border-(--color-primary) z-10">
            <h2 className="text-4xl">{title}</h2>
            <button className="text-3xl leading-none" onClick={onClose}>
              &times;
            </button>
          </header>
          <div className="p-4 overflow-auto h-full">
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
  );
};

export default Modal;
