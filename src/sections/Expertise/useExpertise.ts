import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import classNames from "classnames";
import { expertiseContent } from "../../data/expertise";
import type { DescriptonBlockProps } from "../../types";
import { useAnimationProgress } from "./useAnimationProgress";
import { useAnimationPath } from "./useAnimationPath";

const catSize = 150;

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

export const useExpertise = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const treeRef = useRef<HTMLButtonElement | null>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sectionMinHeight, setSectionMinHeight] = useState<number>();

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
  const showCallToAction = hasReachedKitty && !isCardVisible;

  const handleOpenRequest = useCallback(() => {
    if (!isSmallScreen && !hasReachedKitty && !isCardVisible) {
      return;
    }

    setIsCardVisible(true);
  }, [hasReachedKitty, isCardVisible, isSmallScreen]);

  const onClose = useCallback(() => {
    setIsCardVisible(false);
  }, []);

  const catMotionStyles = useMemo(() => {
    const clampedProgress = Math.min(Math.max(displayProgress, 0), 1);
    const easedProgress = clampedProgress * clampedProgress;
    const distance = `${easedProgress * 100}%`;

    return {
      offsetPath: `path('${catOffsetPath}')`,
      WebkitOffsetPath: `path('${catOffsetPath}')`,
      offsetDistance: distance,
      WebkitOffsetDistance: distance,
      offsetRotate: "0deg",
      WebkitOffsetRotate: "0deg",
      transform: `scale(${1 + easedProgress * 0.5})`,
    } as CSSProperties;
  }, [catOffsetPath, displayProgress]);

  const cardWrapperClass = classNames(
    "flex flex-col flex-wrap @container",
    isCardVisible
      ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      : "hidden",
  );

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

  const blurMaskStyle = useMemo<CSSProperties>(
    () => ({
      maskImage: "linear-gradient(to bottom, transparent 0px, black 50px)",
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent 0px, black 50px)",
    }),
    [],
  );

  return {
    sectionRef,
    cardWrapperRef,
    treeRef,
    sectionStyle: {
      minHeight: sectionMinHeight ? `${sectionMinHeight}px` : undefined,
      ...blurMaskStyle,
    } satisfies CSSProperties,
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
    rows: {
      first: firstRow,
      second: secondRow,
      third: thirdRow,
    },
  };
};
