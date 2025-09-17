import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { defaultContainer } from "../stylizers";
import classNames from "classnames";
import FoldIcon from "../assets/Fold.svg?react";

const NavigationButton: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const stripeClasses = "w-full h-[4px] bg-(--color-primary)";
  return (
    <div
      onClick={onOpen}
      className="flex flex-col w-[40px] h-[40px] p-[6px] justify-between cursor-pointer"
    >
      <div className={stripeClasses} />
      <div className={stripeClasses} />
      <div className={stripeClasses} />
    </div>
  );
};

const NavigationContent: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <>
    <button
      className="absolute right-[4px] top-[4px] cursor-pointer"
      onClick={onClose}
    >
      <FoldIcon />
    </button>
    <ul className="flex flex-col text-[24px]/[24px] lowercase p-5 gap-6">
      <li>
        <a href="#overview" className="hover:underline">
          home
        </a>
      </li>
      <li>
        <a href="#expertise" className="hover:underline">
          Expertise
        </a>
      </li>
      <li>
        <a href="#work" className="hover:underline">
          Work
        </a>
      </li>
      <li>
        <a href="#experience" className="hover:underline">
          Experience
        </a>
      </li>
      <li>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </li>
    </ul>
  </>
);

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const navigationContent = useMemo(
    () =>
      isOpen ? (
        <NavigationContent onClose={toggleMenu} />
      ) : (
        <NavigationButton onOpen={toggleMenu} />
      ),
    [isOpen, toggleMenu]
  );

  const classes = classNames(
    defaultContainer(),
    "fixed bottom-[20px] left-[20px] w-min text-secondary z-10"
  );

  return (
    <nav ref={navRef} className={classes}>
      {navigationContent}
    </nav>
  );
};

export default Navigation;
