import { useEffect, useMemo, useState } from "react";
import treeSrc from "../../assets/tree.png";
import { randomInRange } from "../../utils/randomInRange";

type Tree = {
  key: string;
  x: number;
  y: number;
  scale: number;
  brightness: number;
  saturation: number;
  opacity: number;
};

type IRowParam = Omit<Tree, "key">;

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
const delta = 1.5;

const treeRowParams: IRowParam[] = [
  {
    x: 6,
    y: 6,
    scale: 0.05,
    brightness: 1.05,
    saturation: 1.1,
    opacity: 0.95,
  },
  {
    x: 10,
    y: 8,
    scale: 0.1,
    brightness: 1,
    saturation: 1,
    opacity: 0.9,
  },
  {
    x: 14,
    y: 10,
    scale: 0.15,
    brightness: 0.95,
    saturation: 0.95,
    opacity: 0.85,
  },
  {
    x: 18,
    y: 12,
    scale: 0.2,
    brightness: 0.9,
    saturation: 0.9,
    opacity: 0.8,
  },
];

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
    for (let rowIndex = 0; rowIndex <= treeRowCount; rowIndex++) {
      const rowParam =
        treeRowParams[rowIndex] ?? treeRowParams[treeRowParams.length - 1];
      const rowOffset = distanceFromPath + rowIndex * treeRowGap;
      const isSparseRow = rowIndex === treeRowCount;
      const rowStep = treeGap * (isSparseRow ? 3 : 1);

      for (let s = 0; s <= total; s += rowStep) {
        const p = path.getPointAtLength(s);
        const p1 = path.getPointAtLength(Math.max(0, s - delta));
        const p2 = path.getPointAtLength(Math.min(total, s + delta));

        const tx = p2.x - p1.x;
        const ty = p2.y - p1.y;
        const mag = Math.hypot(tx, ty) || 1;
        const ux = tx / mag;
        const uy = ty / mag;
        const nx = -uy;
        const ny = ux;

        const baseScale = randomInRange(treeScaleMin, treeScaleMax, 2);
        const scale = baseScale + rowParam.scale;

        next.push({
          key: `row-${rowIndex}-tree-${Math.round(s)}`,
          x:
            p.x +
            nx * rowOffset +
            randomInRange(-rowParam.x, rowParam.x, 2),
          y:
            p.y +
            ny * rowOffset +
            randomInRange(-rowParam.y, rowParam.y, 2),
          scale,
          brightness: rowParam.brightness,
          saturation: rowParam.saturation,
          opacity: rowParam.opacity,
        });
      }
    }

    setTrees(next);
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
    [trees],
  );

  return {
    forestElems,
  };
};
