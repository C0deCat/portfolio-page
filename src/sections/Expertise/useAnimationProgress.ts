import { useEffect, useState } from "react";

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

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current || isCardVisible) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const thresholdDistance = picSize * 2;
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

  return { progress, displayProgress };
};
