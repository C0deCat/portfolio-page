import { useCallback, useEffect, useRef, useState } from "react";

type TUseAnimationProgressProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  isCardVisible: boolean;
  picSize: number;
};

export const useAnimationProgress = ({
  sectionRef,
  isCardVisible,
  picSize,
}: TUseAnimationProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const progressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const hasOpenedCardRef = useRef(false);
  const measureFrameRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const setProgressValue = useCallback((nextProgress: number) => {
    progressRef.current = nextProgress;
    setProgress((current) =>
      current === nextProgress ? current : nextProgress
    );
  }, []);

  const updateProgress = useCallback(() => {
    if (!sectionRef.current) {
      return;
    }

    if (isCardVisible || hasOpenedCardRef.current) {
      setProgressValue(1);
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const thresholdDistance = picSize;
    const distanceIntoViewport = Math.max(0, window.innerHeight - rect.top);
    const totalDistance = rect.height + window.innerHeight - thresholdDistance;

    const rawProgress =
      ((window.innerHeight - rect.top - thresholdDistance) / totalDistance) * 2;
    let clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    if (distanceIntoViewport < thresholdDistance) {
      clampedProgress = 0;
    }

    setProgressValue(clampedProgress);
  }, [isCardVisible, sectionRef, picSize, setProgressValue]);

  useEffect(() => {
    if (isCardVisible) {
      hasOpenedCardRef.current = true;
    }
  }, [isCardVisible]);

  useEffect(() => {
    const scheduleUpdate = () => {
      if (measureFrameRef.current !== null) {
        return;
      }

      measureFrameRef.current = window.requestAnimationFrame(() => {
        measureFrameRef.current = null;
        updateProgress();
      });
    };

    if (isCardVisible) {
      updateProgress();

      return () => {
        if (measureFrameRef.current !== null) {
          window.cancelAnimationFrame(measureFrameRef.current);
          measureFrameRef.current = null;
        }
      };
    }

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (measureFrameRef.current !== null) {
        window.cancelAnimationFrame(measureFrameRef.current);
        measureFrameRef.current = null;
      }
    };
  }, [isCardVisible, updateProgress]);

  useEffect(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const targetProgress = progressRef.current;
    const currentDisplayProgress = displayProgressRef.current;

    if (Math.abs(targetProgress - currentDisplayProgress) < 0.001) {
      displayProgressRef.current = targetProgress;
      setDisplayProgress((current) =>
        current === targetProgress ? current : targetProgress
      );
      return undefined;
    }

    const smoothProgress = () => {
      const diff = targetProgress - displayProgressRef.current;

      if (Math.abs(diff) < 0.001) {
        displayProgressRef.current = targetProgress;
        setDisplayProgress(targetProgress);
        animationFrameRef.current = null;
        return;
      }

      const nextProgress = displayProgressRef.current + diff * 0.02;
      displayProgressRef.current = nextProgress;
      setDisplayProgress(nextProgress);

      animationFrameRef.current = window.requestAnimationFrame(smoothProgress);
    };

    animationFrameRef.current = window.requestAnimationFrame(smoothProgress);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [progress]);

  return { progress, displayProgress };
};
