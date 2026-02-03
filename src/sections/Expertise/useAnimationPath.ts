import { useEffect, useMemo, useState } from "react";

export type TUseAnimationPathProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  treeRef: React.RefObject<HTMLButtonElement | null>;
  picSize: number;
};

export const useAnimationPath = ({
  sectionRef,
  treeRef,
  picSize,
}: TUseAnimationPathProps) => {
  const [maxTranslation, setMaxTranslation] = useState({ x: 0, y: 0 });
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateTranslationLimits = () => {
      if (!sectionRef.current || !treeRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const treeRect = treeRef.current.getBoundingClientRect();

      // Размеры SVG/viewBox (в user units)
      const nextSvgSize = { width: rect.width, height: rect.height };
      setSvgSize((prev) =>
        prev.width === nextSvgSize.width && prev.height === nextSvgSize.height
          ? prev
          : nextSvgSize,
      );

      const treeOffset = treeRect.left + treeRect.width * 1.3;
      const nextTranslation = {
        x: Math.max(rect.width - treeOffset, 220),
        y: Math.max(rect.height - picSize, 260),
      };

      setMaxTranslation((prev) =>
        prev.x === nextTranslation.x && prev.y === nextTranslation.y
          ? prev
          : nextTranslation,
      );
    };

    updateTranslationLimits();

    window.addEventListener("resize", updateTranslationLimits);

    return () => {
      window.removeEventListener("resize", updateTranslationLimits);
    };
  }, []);

  const catOffsetPath = useMemo(() => {
    const { x, y } = maxTranslation;
    const W = svgSize.width;
    const H = svgSize.height;

    if (x === 0 && y === 0) return "M 0 0";
    if (W <= 0) return "M 0 0";

    const controlPointY = y * 1;

    return `M ${W * 1.2} ${H * 0.3} Q ${W} ${controlPointY} ${W - x} ${y}`;
  }, [maxTranslation, svgSize]);

  return {
    catOffsetPath,
    svgSize,
  };
};
