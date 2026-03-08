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

const controlButtonClasses =
  "flex w-[40px] h-[40px] p-[6px] cursor-pointer border-4 border-(--color-primary) bg-(--color-primary-dark)/90 backdrop-blur-sm text-secondary";

const NavigationButton: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const stripeClasses = "w-full h-[4px] bg-(--color-primary)";
  return (
    <button
      type="button"
      onClick={onOpen}
      className={classNames(controlButtonClasses, "flex-col justify-between")}
      aria-label="Open navigation menu"
    >
      <div className={stripeClasses} />
      <div className={stripeClasses} />
      <div className={stripeClasses} />
    </button>
  );
};

const CrtToggleButton: React.FC<{
  enabled: boolean;
  onToggle: () => void;
}> = ({ enabled, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={classNames(
      controlButtonClasses,
      "items-center justify-center text-[14px]/[14px] font-bold",
      enabled ? "text-secondary" : "text-secondary/50",
    )}
    aria-pressed={enabled}
    aria-label="Toggle CRT effect"
  >
    <span className="relative inline-flex items-center justify-center">
      {enabled ? (
        <>
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-(--color-primary)" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[120%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-(--color-primary)" />
        </>
      ) : null}
      CRT
    </span>
  </button>
);

const NavigationContent: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className={classNames(defaultContainer())}>
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
  </div>
);

const Navigation: React.FC<{
  crtEnabled: boolean;
  onToggleCrt: () => void;
}> = ({ crtEnabled, onToggleCrt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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
        <div className="flex flex-col gap-2">
          <CrtToggleButton enabled={crtEnabled} onToggle={onToggleCrt} />
          <NavigationButton onOpen={toggleMenu} />
        </div>
      ),
    [crtEnabled, isOpen, onToggleCrt, toggleMenu],
  );

  const classes = classNames(
    "fixed bottom-[20px] left-[20px] w-min text-secondary z-30",
  );

  return (
    <nav ref={navRef} className={classes}>
      {navigationContent}
    </nav>
  );
};

export default Navigation;
