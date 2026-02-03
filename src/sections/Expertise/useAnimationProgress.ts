import { useCallback, useEffect, useState } from "react";

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

  const updateProgress = useCallback(() => {
    if (!sectionRef.current || isCardVisible) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const thresholdDistance = picSize * 2;
    const distanceIntoViewport = Math.max(0, window.innerHeight - rect.top);
    const totalDistance = rect.height + window.innerHeight - thresholdDistance;

    const rawProgress =
      ((window.innerHeight - rect.top - thresholdDistance) / totalDistance) * 2;
    let clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    if (distanceIntoViewport < thresholdDistance) {
      clampedProgress = 0;
    }

    // Since the progress value in the function changes only after isCardVisible changes,
    // this fragment simply freezes progress at 1 if the card has been opened at least once.
    // This is cheaper than writing a separate useEffect to watch isCardVisible.
    if (clampedProgress < progress) {
      clampedProgress = 1;
    }

    setProgress(clampedProgress);
  }, [isCardVisible, progress, sectionRef, picSize]);

  useEffect(() => {
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

  return { progress, displayProgress };
};
