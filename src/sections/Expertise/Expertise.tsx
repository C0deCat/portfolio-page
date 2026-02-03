import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import classNames from "classnames";
import { defaultContainer } from "../../stylizers";
import { expertiseContent } from "../../data/expertise";
import type { DescriptonBlockProps } from "../../types";
import catStanding from "../../assets/CatStanding.png";
import wantedKitty from "../../assets/WantedKitty.png";
import wantedKittyActive from "../../assets/WantedKitty_active.png";
import CloseIcon from "../../assets/Close.svg?react";
import { useTiles } from "./useTiles";
import { useAnimationProgress } from "./useAnimationProgress";
import { useAnimationPath } from "./useAnimationPath";
import { useForest } from "./useForest";

const catSize = 150;

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

const firstRow: DescriptonBlockProps[] = [
  {
    title: "Portrait",
    classname:
      "aspect-square self-stretch min-h-[200px] grow @md:grow-0 @max-md:border-b-0 @md:border-r-0",
  },
  {
    title: "Character Info",
    classname: "grow",
    children: expertiseContent["Character Info"],
  },
];

const secondRow: DescriptonBlockProps[] = [
  {
    title: "Frontend",
    classname: "w-full border-t-0 border-b-0",
    children: expertiseContent.Frontend,
  },
];

const thirdRow: DescriptonBlockProps[] = [
  {
    title: "Software Engineer",
    classname: "flex-1 basis-[250px] @max-md:border-b-0 @md:border-r-0",
    children: expertiseContent["Software Engineer"],
  },
  {
    title: "Miscellaneous",
    classname: "flex-1 basis-[250px]",
    children: expertiseContent.Miscellaneous,
  },
];
// Notes for future features:
// - MOBILE OPTIMIZATION: Сделать так, чтобы карточка сразу открывалась на мобильных устройствах
// - Добавить анимацию ходьбы котика, которая будет запускаться в моменты передвижения

const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sectionMinHeight, setSectionMinHeight] = useState<number>();
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const treeRef = useRef<HTMLButtonElement | null>(null);

  const { catOffsetPath, svgSize } = useAnimationPath({
    sectionRef,
    treeRef,
    picSize: catSize,
  });
  const { progress, displayProgress } = useAnimationProgress({
    sectionRef,
    isCardVisible,
    picSize: catSize,
  });
  const { tilesElems } = useTiles({ sectionRef, svgSize, catOffsetPath });
  const { forestElems } = useForest({ sectionRef, svgSize, catOffsetPath });

  const renderBlocks = useCallback(
    (blocks: DescriptonBlockProps[]) =>
      blocks.map((block, idx) => <DescriptonBlock key={idx} {...block} />),
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 48rem)");

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsSmallScreen(event.matches);
    };

    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setIsCardVisible(true);
    }
  }, [isSmallScreen]);

  const hasReachedKitty = progress >= 0.9;

  const handleOpenRequest = useCallback(() => {
    if (!isSmallScreen && !hasReachedKitty && !isCardVisible) {
      return;
    }

    setIsCardVisible(true);
  }, [hasReachedKitty, isCardVisible, isSmallScreen]);

  const catMotionStyles = useMemo(() => {
    const clampedProgress = Math.min(Math.max(displayProgress, 0), 1);
    const easedProgress = clampedProgress * clampedProgress;
    const distance = `${easedProgress * 100}%`;

    return {
      offsetPath: `url(#roadPath)`,
      WebkitOffsetPath: `url(#roadPath)`,
      offsetDistance: distance,
      WebkitOffsetDistance: distance,
      offsetRotate: "0deg",
      WebkitOffsetRotate: "0deg",
      transition:
        "offset-distance 0.25s ease-out, -webkit-offset-distance 0.25s ease-out, transform 0.25s ease-out",
      transform: `scale(${1 + easedProgress * 0.5})`,
    } as CSSProperties;
  }, [catOffsetPath, displayProgress]);

  const cardWrapperClass = classNames(
    "flex flex-col flex-wrap @container",
    isCardVisible
      ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      : "hidden",
  );

  const onClose = useCallback(() => {
    setIsCardVisible(false);
  }, []);

  const showCallToAction = hasReachedKitty && !isCardVisible;

  useEffect(() => {
    if (!isCardVisible) {
      return;
    }

    const scrollToCenter = () => {
      const card = cardWrapperRef.current;

      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const offsetY = rect.top + rect.height / 2 - window.innerHeight / 2;

      window.scrollBy({ top: offsetY, behavior: "smooth" });
    };

    const frame = window.requestAnimationFrame(scrollToCenter);

    return () => window.cancelAnimationFrame(frame);
  }, [isCardVisible]);

  useEffect(() => {
    const shouldMeasureHeight = isCardVisible || isSmallScreen;

    if (
      !shouldMeasureHeight ||
      !cardWrapperRef.current ||
      !sectionRef.current
    ) {
      setSectionMinHeight(undefined);
      return;
    }

    const section = sectionRef.current;
    const card = cardWrapperRef.current;

    const updateSectionHeight = () => {
      const cardHeight = card.getBoundingClientRect().height;
      const computedStyle = window.getComputedStyle(section);
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

      const requiredHeight = cardHeight + paddingTop + paddingBottom;
      setSectionMinHeight(Math.max(window.innerHeight, requiredHeight));
    };

    updateSectionHeight();

    const resizeObserver = new ResizeObserver(updateSectionHeight);
    resizeObserver.observe(card);
    window.addEventListener("resize", updateSectionHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSectionHeight);
    };
  }, [isCardVisible, isSmallScreen]);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="p-8 relative flex min-h-[100vh] justify-end items-end max-sm:pl-0 max-sm:pr-0 overflow-hidden"
      style={{
        minHeight: sectionMinHeight ? `${sectionMinHeight}px` : undefined,
      }}
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
          stroke="red"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          // Вариант “красивой” линии:
          strokeDasharray="10 8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {tilesElems}
        {forestElems}
      </div>

      <div
        onClick={handleOpenRequest}
        className={classNames(
          "absolute z-10 right-[32px] top-[32px] h-[150px] w-auto bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
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
          <span className="text-2xl leading-none">↓</span>
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
          {renderBlocks(firstRow)}
        </div>
        {renderBlocks(secondRow)}
        <div className="flex flex-wrap @md:flex-nowrap w-full">
          {renderBlocks(thirdRow)}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
