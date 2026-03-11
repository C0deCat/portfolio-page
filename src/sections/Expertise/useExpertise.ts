import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useAnimationProgress } from "./useAnimationProgress";

const catSize = 150;

export const useExpertise = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const treeRef = useRef<HTMLButtonElement | null>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sectionMinHeight, setSectionMinHeight] = useState<number>();

  const { progress } = useAnimationProgress({
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
    progress,
    isCardVisible,
    isSmallScreen,
    hasReachedKitty,
    showCallToAction,
    handleOpenRequest,
    onClose,
  };
};
