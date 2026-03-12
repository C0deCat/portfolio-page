import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useAnimationPath } from "./useAnimationPath";

type UseWalkingKittyAnimationProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  treeRef: React.RefObject<HTMLButtonElement | null>;
  progress: number;
};

const catSize = 150;

export const useWalkingKittyAnimation = ({
  sectionRef,
  treeRef,
  progress,
}: UseWalkingKittyAnimationProps) => {
  const { catOffsetPath, svgSize } = useAnimationPath({
    sectionRef,
    treeRef,
    picSize: catSize,
  });
  const [displayProgress, setDisplayProgress] = useState(0);
  const displayProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const targetProgress = progress;
    const currentDisplayProgress = displayProgressRef.current;

    if (Math.abs(targetProgress - currentDisplayProgress) < 0.001) {
      displayProgressRef.current = targetProgress;
      setDisplayProgress((current) =>
        current === targetProgress ? current : targetProgress,
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

  return {
    svgSize,
    catOffsetPath,
    catMotionStyles,
  };
};
