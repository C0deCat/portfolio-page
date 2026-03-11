import classNames from "classnames";
import { defaultContainer } from "../../stylizers";
import type { DescriptonBlockProps } from "../../types";
import catStanding from "../../assets/CatStanding.png";
import wantedKitty from "../../assets/WantedKitty.png";
import wantedKittyActive from "../../assets/WantedKitty_active.png";
import CloseIcon from "../../assets/Close.svg?react";
import ExpertiseDecorCanvas from "./ExpertiseDecorCanvas";
import { useExpertise } from "./useExpertise";

const DescriptonBlock: React.FC<DescriptonBlockProps> = ({
  title,
  classname,
  children,
}) => {
  const block = classNames(
    defaultContainer(),
    "text-base sm:text-[2.65cqw] pt-2.5 pb-2.5 pr-5 pl-5",
    classname,
  );

  return (
    <div className={block}>
      <h2 className="uppercase text-xl sm:text-[4cqw] pt">{title}</h2>
      {children}
    </div>
  );
};

// Notes for future features:
// - Add a walking animation for the cat while it is moving.

const Expertise: React.FC = () => {
  const {
    sectionRef,
    cardWrapperRef,
    treeRef,
    sectionStyle,
    svgSize,
    catOffsetPath,
    catMotionStyles,
    cardWrapperClass,
    isCardVisible,
    isSmallScreen,
    hasReachedKitty,
    showCallToAction,
    handleOpenRequest,
    onClose,
    rows,
  } = useExpertise();

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="p-8 relative flex min-h-[100vh] justify-end items-end max-sm:pl-0 max-sm:pr-0 overflow-hidden"
      style={sectionStyle}
    >
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={`0 0 ${svgSize.width || 1} ${svgSize.height || 1}`}
      >
        <path
          id="roadPath"
          d={catOffsetPath}
          fill="none"
          stroke="none"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          // Вариант “красивой” линии:
          strokeDasharray="10 8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ExpertiseDecorCanvas
        sectionRef={sectionRef}
        svgSize={svgSize}
        catOffsetPath={catOffsetPath}
      />

      <div
        onClick={handleOpenRequest}
        className={classNames(
          "absolute z-10 top-0 left-0 h-[150px] w-auto bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
        )}
        style={catMotionStyles}
      >
        <img
          src={catStanding}
          alt="Cat standing with a letter"
          className="h-full w-auto pixelated pointer-events-none select-none"
        />
      </div>
      <button
        type="button"
        onClick={handleOpenRequest}
        className={classNames(
          "absolute bottom-[32px] left-1/4 h-[600px] w-[541px] -translate-x-1/2 bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
          hasReachedKitty || isCardVisible
            ? "cursor-pointer"
            : "cursor-default",
        )}
        aria-label="Open message"
        ref={treeRef}
      >
        <img
          src={showCallToAction ? wantedKittyActive : wantedKitty}
          alt="Wanted kitty poster"
          className="h-full w-auto pixelated pointer-events-none select-none"
        />
      </button>
      {showCallToAction && (
        <button
          type="button"
          onClick={handleOpenRequest}
          className="absolute left-1/4 -translate-x-1/2 z-10 bg-transparent px-6 py-3 flex flex-col items-center text-[#f4ff00] uppercase text-2xl animate-bounce"
          style={{ bottom: "350px" }}
        >
          <span>Click to open message</span>
          <span className="text-2xl leading-none">&darr;</span>
        </button>
      )}
      <div
        id="cardWrapper"
        className={cardWrapperClass}
        ref={cardWrapperRef}
        style={{ width: "min(max(40vw,36rem),100vw)" }}
      >
        {!isSmallScreen && (
          <button
            className="text-3xl leading-none absolute right-[10px] top-[10px] text-(--color-primary) cursor-pointer z-20"
            onClick={onClose}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        )}
        <div className="flex flex-wrap @md:flex-nowrap items-stretch w-full">
          {rows.first.map((block, idx) => (
            <DescriptonBlock key={idx} {...block} />
          ))}
        </div>
        {rows.second.map((block, idx) => (
          <DescriptonBlock key={idx} {...block} />
        ))}
        <div className="flex flex-wrap @md:flex-nowrap w-full">
          {rows.third.map((block, idx) => (
            <DescriptonBlock key={idx} {...block} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
