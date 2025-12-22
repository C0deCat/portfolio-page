import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from "react";
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
const CAT_ANCHOR_X = 0.5;
const CAT_ANCHOR_Y = 0.9;

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
  const catRef = useRef<HTMLDivElement | null>(null);
  const [sectionMetrics, setSectionMetrics] = useState<{
    width: number;
    height: number;
    catOrigin: { x: number; y: number };
  }>();
  const uniqueId = useId();
  const roadIds = useMemo(
    () => ({
      pattern: `${uniqueId}-road-pattern`,
      shade: `${uniqueId}-road-shade`,
    }),
    [uniqueId]
  );

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
      if (!sectionRef.current || !treeRef.current || !catRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const treeRect = treeRef.current.getBoundingClientRect();
      const catRect = catRef.current.getBoundingClientRect();
      const treeOffset = treeRect.left + treeRect.width * 1.3;
      const nextTranslation = {
        x: Math.max(rect.width - treeOffset, 220),
        y: Math.max(rect.height - catSize * 1.4, 260),
      };

      setSectionMetrics((prev) => {
        const nextMetrics = {
          width: rect.width,
          height: rect.height,
          catOrigin: {
            x: catRect.left - rect.left + catRect.width * CAT_ANCHOR_X,
            y: catRect.top - rect.top + catRect.height * CAT_ANCHOR_Y,
          },
        };

        if (
          prev &&
          prev.width === nextMetrics.width &&
          prev.height === nextMetrics.height &&
          prev.catOrigin.x === nextMetrics.catOrigin.x &&
          prev.catOrigin.y === nextMetrics.catOrigin.y
        ) {
          return prev;
        }

        return nextMetrics;
      });

      setMaxTranslation((prev) =>
        prev.x === nextTranslation.x && prev.y === nextTranslation.y
          ? prev
          : nextTranslation
      );
    };

    updateTranslationLimits();

    window.addEventListener("resize", updateTranslationLimits);
    window.addEventListener("load", updateTranslationLimits);

    return () => {
      window.removeEventListener("resize", updateTranslationLimits);
      window.removeEventListener("load", updateTranslationLimits);
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
      offsetAnchor: `${CAT_ANCHOR_X * 100}% ${CAT_ANCHOR_Y * 100}%`,
      WebkitOffsetAnchor: `${CAT_ANCHOR_X * 100}% ${CAT_ANCHOR_Y * 100}%`,
      transition:
        "offset-distance 0.25s ease-out, -webkit-offset-distance 0.25s ease-out, transform 0.25s ease-out",
      transform: `scale(${1 + easedProgress * 0.5})`,
    } as CSSProperties;
  }, [catOffsetPath, displayProgress]);

  const roadGeometry = useMemo(() => {
    const { x, y } = maxTranslation;

    if (x === 0 && y === 0 || !sectionMetrics) {
      return null;
    }

    const start = { x: 0, y: 80 };
    const control = { x: 0, y };
    const end = { x: -x, y };
    const sampleCount = 40;
    const startWidth = 70;
    const endWidth = Math.max(
      startWidth + 40,
      Math.min(220, startWidth + Math.max(x, y) * 0.25)
    );

    const getPoint = (t: number) => {
      const inv = 1 - t;
      return {
        x: inv * inv * start.x + 2 * inv * t * control.x + t * t * end.x,
        y: inv * inv * start.y + 2 * inv * t * control.y + t * t * end.y,
      };
    };

    const getDerivative = (t: number) => ({
      x: 2 * (1 - t) * (control.x - start.x) + 2 * t * (end.x - control.x),
      y: 2 * (1 - t) * (control.y - start.y) + 2 * t * (end.y - control.y),
    });

    const left: { x: number; y: number }[] = [];
    const right: { x: number; y: number }[] = [];

    for (let i = 0; i <= sampleCount; i += 1) {
      const t = i / sampleCount;
      const point = getPoint(t);
      const derivative = getDerivative(t);
      const normal = {
        x: -derivative.y,
        y: derivative.x,
      };
      const normalLength = Math.hypot(normal.x, normal.y) || 1;
      const width =
        startWidth + (endWidth - startWidth) * Math.pow(t, 0.8);
      const offsetX = (normal.x / normalLength) * (width / 2);
      const offsetY = (normal.y / normalLength) * (width / 2);

      left.push({
        x: point.x + offsetX,
        y: point.y + offsetY,
      });
      right.push({
        x: point.x - offsetX,
        y: point.y - offsetY,
      });
    }

    const translatedLeft = left.map((point) => ({
      x: point.x + sectionMetrics.catOrigin.x,
      y: point.y + sectionMetrics.catOrigin.y,
    }));
    const translatedRight = right.map((point) => ({
      x: point.x + sectionMetrics.catOrigin.x,
      y: point.y + sectionMetrics.catOrigin.y,
    }));

    return {
      path: [
        `M ${translatedLeft[0].x.toFixed(2)} ${translatedLeft[0].y.toFixed(2)}`,
        ...translatedLeft
          .slice(1)
          .map(
            (point) => `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
          ),
        ...translatedRight
          .slice()
          .reverse()
          .map((point) => `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`),
        "Z",
      ].join(" "),
      viewBox: `0 0 ${sectionMetrics.width} ${sectionMetrics.height}`,
      gradient: {
        x1: start.x + sectionMetrics.catOrigin.x,
        y1: start.y + sectionMetrics.catOrigin.y,
        x2: end.x + sectionMetrics.catOrigin.x,
        y2: end.y + sectionMetrics.catOrigin.y,
      },
    };
  }, [maxTranslation, sectionMetrics]);

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
      {roadGeometry && (
        <svg
          aria-hidden
          className="absolute inset-0 pointer-events-none p-8"
          width="100%"
          height="100%"
          viewBox={roadGeometry.viewBox}
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id={roadIds.pattern}
              patternUnits="userSpaceOnUse"
              width="128"
              height="128"
            >
              <image
                href={cobblestoneTile}
                x="0"
                y="0"
                width="128"
                height="128"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
            <linearGradient
              id={roadIds.shade}
              gradientUnits="userSpaceOnUse"
              x1={roadGeometry.gradient.x1}
              y1={roadGeometry.gradient.y1}
              x2={roadGeometry.gradient.x2}
              y2={roadGeometry.gradient.y2}
            >
              <stop offset="0%" stopColor="#000" stopOpacity="0.75" />
              <stop offset="14%" stopColor="#000" stopOpacity="0" />
              <stop offset="86%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <path d={roadGeometry.path} fill={`url(#${roadIds.pattern})`} />
          <path
            d={roadGeometry.path}
            fill={`url(#${roadIds.shade})`}
            style={{ mixBlendMode: "multiply" }}
          />
        </svg>
      )}
      <div
        onClick={handleOpenRequest}
        className={classNames(
          "absolute z-10 right-[32px] top-[32px] h-[150px] w-auto bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400"
        )}
        style={catMotionStyles}
        ref={catRef}
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
