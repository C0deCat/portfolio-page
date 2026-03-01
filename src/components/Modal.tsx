import classNames from "classnames";
import React, { useEffect, useMemo } from "react";
import { defaultContainer } from "../stylizers";
import CloseIcon from "../assets/Close.svg?react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  stack: string[];
  content: React.ReactNode;
  projectLink?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  stack,
  content,
  projectLink,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const modalClasses = classNames(
    defaultContainer(false),
    "relative border-0 overflow-hidden w-full h-full",
  );

  const modal = useMemo(
    () => (
      <div className="fixed inset-0 z-50 flex items-start p-5 justify-center">
        <div className={modalClasses}>
          <div className="border-corner h-full overflow-hidden flex flex-col">
            <button
              className="text-3xl leading-none absolute right-[10px] top-[10px] text-(--color-primary) cursor-pointer z-20"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
            <header className="top-0 flex flex-wrap justify-between items-center p-11 pt-7 border-(--color-primary) pr-32 z-10">
              <h2 className="text-4xl pr-2">{title}</h2>
              {projectLink && (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:underline"
                >
                  open project {"-->"}
                </a>
              )}
            </header>
            <div className="pr-11 pl-11 pb-11 overflow-auto text-2xl">
              <aside className="sm:float-right min-w-[170px] bg-(--color-secondary) ml-4 mb-4 back p-4">
                <p className="mb-4 underline">Stack</p>
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
    ),
    [modalClasses, onClose, title, stack, content, projectLink],
  );

  return <>{createPortal(modal, document.body as HTMLElement)}</>;
};

export default Modal;
