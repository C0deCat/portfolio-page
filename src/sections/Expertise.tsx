import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import { expertiseContent } from "../data/expertise";
import type { DescriptonBlockProps } from "../types";
import catStanding from "../assets/CatStanding.png";
import wantedKitty from "../assets/WantedKitty.png";
import wantedKittyActive from "../assets/WantedKitty_active.png";
import CloseIcon from "../assets/Close.svg?react";
import cobblestoneTile from "../assets/cobllestone_tile.png";

const catSize = 150;
const tileSize = 64;
const tileStep = tileSize / 16;
const angleQuantizationSteps = 16;
const angleStep = (Math.PI * 2) / angleQuantizationSteps;

const DescriptonBlock: React.FC<DescriptonBlockProps> = ({
  title,
  classname,
  children,
}) => {
  const block = classNames(
    defaultContainer(),
    "text-base sm:text-[2.65cqw] pt-2.5 pb-2.5 pr-5 pl-5",
    classname
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
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [maxTranslation, setMaxTranslation] = useState({ x: 0, y: 0 });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sectionMinHeight, setSectionMinHeight] = useState<number>();
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const treeRef = useRef<HTMLButtonElement | null>(null);

  const renderBlocks = useCallback(
    (blocks: DescriptonBlockProps[]) =>
      blocks.map((block, idx) => <DescriptonBlock key={idx} {...block} />),
    []
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

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current || isCardVisible) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const thresholdDistance = catSize * 2;
      const distanceIntoViewport = Math.max(0, window.innerHeight - rect.top);
      const totalDistance =
        rect.height + window.innerHeight - thresholdDistance;

      const rawProgress =
        ((window.innerHeight - rect.top - thresholdDistance) / totalDistance) *
        2;
      let clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      if (distanceIntoViewport < thresholdDistance) {
        clampedProgress = 0;
      }

      setProgress(clampedProgress);
    };

    if (isCardVisible) {
      return undefined;
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isCardVisible]);

  useEffect(() => {
    let frame: number;

    const smoothProgress = () => {
      setDisplayProgress((current) => {
        const diff = progress - current;
        const step = diff * 0.1;

        if (Math.abs(diff) < 0.001) {
          return progress;
        }

        return current + step;
      });

      frame = window.requestAnimationFrame(smoothProgress);
    };

    frame = window.requestAnimationFrame(smoothProgress);

    return () => window.cancelAnimationFrame(frame);
  }, [progress]);

  useEffect(() => {
    const updateTranslationLimits = () => {
      if (!sectionRef.current || !treeRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const treeRect = treeRef.current.getBoundingClientRect();
      const treeOffset = treeRect.left + treeRect.width * 1.3;
      const nextTranslation = {
        x: Math.max(rect.width - treeOffset, 220),
        y: Math.max(rect.height - catSize * 1.4, 260),
      };

      setMaxTranslation((prev) =>
        prev.x === nextTranslation.x && prev.y === nextTranslation.y
          ? prev
          : nextTranslation
      );
    };

    updateTranslationLimits();

    window.addEventListener("resize", updateTranslationLimits);

    return () => {
      window.removeEventListener("resize", updateTranslationLimits);
    };
  }, []);

  const hasReachedKitty = progress >= 0.9;

  const handleOpenRequest = useCallback(() => {
    if (!isSmallScreen && !hasReachedKitty && !isCardVisible) {
      return;
    }

    setIsCardVisible(true);
  }, [hasReachedKitty, isCardVisible, isSmallScreen]);

  const catOffsetPath = useMemo(() => {
    const { x, y } = maxTranslation;

    if (x === 0 && y === 0) {
      return 'path("M 0 0")';
    }

    const controlPointY = y * 1;
    return `path("M 0 80 Q 0 ${controlPointY} -${x} ${y}")`;
  }, [maxTranslation]);

  const roadTiles = useMemo(() => {
    const { x, y } = maxTranslation;

    if (x === 0 && y === 0) {
      return [];
    }

    const start = { x: 0, y: 80 };
    const control = { x: 0, y: y * 1 };
    const end = { x: -x, y };

    const getPoint = (t: number) => {
      const oneMinusT = 1 - t;
      const tSquared = t * t;
      const xPos =
        oneMinusT * oneMinusT * start.x +
        2 * oneMinusT * t * control.x +
        tSquared * end.x;
      const yPos =
        oneMinusT * oneMinusT * start.y +
        2 * oneMinusT * t * control.y +
        tSquared * end.y;

      return { x: xPos, y: yPos };
    };

    const getTangent = (t: number) => {
      const xTangent =
        2 * (1 - t) * (control.x - start.x) + 2 * t * (end.x - control.x);
      const yTangent =
        2 * (1 - t) * (control.y - start.y) + 2 * t * (end.y - control.y);
      return { x: xTangent, y: yTangent };
    };

    const sampleSegments = 400;
    const samples: { t: number; length: number; point: { x: number; y: number } }[] =
      [];
    let totalLength = 0;
    let previousPoint = getPoint(0);

    samples.push({ t: 0, length: 0, point: previousPoint });

    for (let i = 1; i <= sampleSegments; i += 1) {
      const t = i / sampleSegments;
      const point = getPoint(t);
      const distance = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);
      totalLength += distance;
      samples.push({ t, length: totalLength, point });
      previousPoint = point;
    }

    if (totalLength === 0) {
      return [];
    }

    const distanceToT = (distance: number) => {
      if (distance <= 0) {
        return 0;
      }
      if (distance >= totalLength) {
        return 1;
      }

      let low = 0;
      let high = samples.length - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const sample = samples[mid];

        if (sample.length < distance) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      const after = samples[low];
      const before = samples[low - 1] ?? samples[0];
      const segmentLength = after.length - before.length || 1;
      const segmentProgress = (distance - before.length) / segmentLength;
      return before.t + (after.t - before.t) * segmentProgress;
    };

    const startScale = 0.6;
    const endScale = 1.35;

    const tiles = [];
    for (let distance = 0; distance <= totalLength; distance += tileStep) {
      const t = distanceToT(distance);
      const tangent = getTangent(t);
      const angle = Math.atan2(tangent.y, tangent.x);
      const quantizedAngle = Math.round(angle / angleStep) * angleStep;
      const scale = startScale + (endScale - startScale) * t;

      tiles.push({
        offsetDistance: Math.round(distance / tileStep) * tileStep,
        rotation: quantizedAngle * (180 / Math.PI),
        scale,
      });
    }

    return tiles;
  }, [maxTranslation]);

  const catMotionStyles = useMemo(() => {
    const clampedProgress = Math.min(Math.max(displayProgress, 0), 1);
    const easedProgress = clampedProgress * clampedProgress;
    const distance = `${easedProgress * 100}%`;

    return {
      offsetPath: catOffsetPath,
      WebkitOffsetPath: catOffsetPath,
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
      : "hidden"
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
      className="p-8 relative flex min-h-[100vh] justify-end items-end max-sm:pl-0 max-sm:pr-0"
      style={{
        minHeight: sectionMinHeight ? `${sectionMinHeight}px` : undefined,
      }}
    >
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {roadTiles.map((tile, index) => (
          <div
            key={`${tile.offsetDistance}-${index}`}
            className="absolute"
            style={{
              offsetPath: catOffsetPath,
              WebkitOffsetPath: catOffsetPath,
              offsetDistance: `${tile.offsetDistance}px`,
              WebkitOffsetDistance: `${tile.offsetDistance}px`,
              offsetRotate: `${tile.rotation}deg`,
              WebkitOffsetRotate: `${tile.rotation}deg`,
              top: "32px",
              right: "32px",
              width: `${tileSize}px`,
              height: `${tileSize}px`,
              transform: `translate(-50%, -50%) scale(${tile.scale})`,
              transformOrigin: "50% 50%",
              opacity: 0.9,
            }}
          >
            <img
              src={cobblestoneTile}
              alt=""
              className="w-full h-full"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div
        onClick={handleOpenRequest}
        className={classNames(
          "absolute z-10 right-[32px] top-[32px] h-[150px] w-auto bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400"
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
          hasReachedKitty || isCardVisible ? "cursor-pointer" : "cursor-default"
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
