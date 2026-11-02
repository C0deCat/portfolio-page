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
      <div
        className="fixed inset-0 z-50 flex items-start p-3 sm:p-5 justify-center"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={modalClasses}>
          <div className="border-corner h-full overflow-hidden flex flex-col">
            <button
              className="text-3xl leading-none absolute right-[10px] top-[10px] text-(--color-primary) cursor-pointer z-20"
              onClick={onClose}
              aria-label="Close project"
            >
              <CloseIcon />
            </button>
            <header className="top-0 shrink-0 flex flex-wrap gap-2 justify-between items-center px-5 py-6 sm:px-11 sm:pt-7 border-(--color-primary) pr-12 sm:pr-16 z-10">
              <h2 className="text-2xl sm:text-4xl pr-2">{title}</h2>
              {projectLink && (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-2xl hover:underline"
                >
                  open project {"-->"}
                </a>
              )}
            </header>
            <div className="min-h-0 px-5 pb-6 sm:px-11 sm:pb-11 overflow-auto text-lg sm:text-2xl">
              <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(10rem,28%)] gap-6 items-start">
                <div className="min-w-0">{content}</div>
                <aside className="min-w-0 bg-(--color-secondary) p-4 break-words">
                  <p className="mb-4 underline">Stack</p>
                  <ul>
                    {stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </aside>
              </div>
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
