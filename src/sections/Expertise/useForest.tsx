import { useEffect, useMemo, useState } from "react";
import treeSrc from "../../assets/tree.png";

type Tree = {
  key: string;
  x: number;
  y: number;
  scale: number;
  brightness: number;
  saturation: number;
  opacity: number;
};

export type TUseForestProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  svgSize: { width: number; height: number };
  catOffsetPath: string;
};

// Настройки деревьев
const treeGap = 10; // зазор между деревьями (от центра до центра)
const treeRowGap = 40; // расстояние между рядами деревьев вдоль пути (плотность рядов)
const treeRowCount = 3; // количество рядов деревьев
const treeScaleMin = 0.3;
const treeScaleMax = 0.7;
const distanceFromPath = 100; // расстояние от края пути до нижней точки первого ряда деревьев

export const useForest = ({
  sectionRef,
  svgSize,
  catOffsetPath,
}: TUseForestProps) => {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    const svg = sectionRef.current?.querySelector("svg");
    const path = svg?.querySelector<SVGPathElement>("#roadPath");
    if (!svg || !path) return;

    const total = path.getTotalLength();

    const next: Tree[] = [];
  }, [svgSize.width, svgSize.height, catOffsetPath]);

  const forestElems = useMemo(
    () =>
      trees.map((tree) => (
        <img
          key={tree.key}
          src={treeSrc}
          className="pixelated absolute"
          style={{
            transformOrigin: "50% 50%",
            transform: `translate(${tree.x}px, ${tree.y}px) scale(${tree.scale})`,
            opacity: tree.opacity,
            filter: `brightness(${tree.brightness}) saturate(${tree.saturation})`,
          }}
        />
      )),
    [],
  );

  return {
    forestElems,
  };
};
