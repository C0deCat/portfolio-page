import React from "react";

interface ModalProps {
  title: string;
  stack: string[];
  content: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, stack, content, onClose }) => {
  return (
    <div className="fixed inset-0 z-20 bg-black/80 flex items-start justify-center">
      <div className="relative bg-(--bg-color) text-primary w-full h-full overflow-hidden">
        <header className="sticky top-0 flex justify-between items-center p-4 border-b border-(--color-primary) bg-(--color-primary-dark)/90 backdrop-blur-sm z-10">
          <h2 className="text-2xl">{title}</h2>
          <button className="text-3xl leading-none" onClick={onClose}>&times;</button>
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
  );
};

export default Modal;
