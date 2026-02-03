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
  zIndex?: number;
};

type IRowParam = Omit<Tree, "key"> & {
  xRandomOffset: number;
  yRandomOffset: number;
};

export type TUseForestProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  svgSize: { width: number; height: number };
  catOffsetPath: string;
};

// Настройки деревьев
const treeGap = 400; // зазор между деревьями (от центра до центра)
const treeRowGap = 75; // расстояние между рядами деревьев вдоль пути (плотность рядов)
const treeRowCount = 3; // количество рядов деревьев
const treeScaleMin = 2.1;
const treeScaleMax = 2.5;
const distanceFromPath = 300; // расстояние от края пути до нижней точки первого ряда деревьев
const delta = 1.5;

const treeRowParams: IRowParam[] = [
  {
    x: 150,
    y: 0,
    xRandomOffset: 20,
    yRandomOffset: 20,
    scale: 0.2,
    brightness: 1,
    saturation: 1,
    opacity: 0.95,
  },
  {
    x: 0,
    y: 0,
    xRandomOffset: 25,
    yRandomOffset: 25,
    scale: 0.1,
    brightness: 0.8,
    saturation: 1,
    opacity: 0.9,
  },
  {
    x: 150,
    y: 0,
    xRandomOffset: 25,
    yRandomOffset: 25,
    scale: 0.15,
    brightness: 0.6,
    saturation: 0.95,
    opacity: 0.85,
  },
  {
    x: 0,
    y: 0,
    xRandomOffset: 16,
    yRandomOffset: 16,
    scale: 0.1,
    brightness: 0.5,
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

        const tangentX = p2.x - p1.x;
        const tangentY = p2.y - p1.y;
        const tangentMagnitude = Math.hypot(tangentX, tangentY) || 1;
        const unitTangentX = tangentX / tangentMagnitude;
        const unitTangentY = tangentY / tangentMagnitude;
        const normalX = -unitTangentY;
        const normalY = unitTangentX;

        const baseScale = randomInRange(treeScaleMin, treeScaleMax, 2);
        const scale = baseScale + rowParam.scale;

        const normalJitter = randomInRange(
          -rowParam.yRandomOffset,
          rowParam.yRandomOffset,
          2,
        );
        const tangentJitter = randomInRange(
          -rowParam.xRandomOffset,
          rowParam.xRandomOffset,
          2,
        );
        const normalOffset = rowOffset + rowParam.y + normalJitter;
        const tangentOffset = rowParam.x + tangentJitter;

        next.push({
          key: `row-${rowIndex}-tree-${Math.round(s)}`,
          x: p.x + normalX * normalOffset + unitTangentX * tangentOffset,
          y: p.y + normalY * normalOffset + unitTangentY * tangentOffset,
          scale,
          brightness: rowParam.brightness,
          saturation: rowParam.saturation,
          opacity: rowParam.opacity,
          zIndex: treeRowCount + 1 - rowIndex,
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
            zIndex: tree.zIndex,
          }}
        />
      )),
    [trees],
  );

  return {
    forestElems,
  };
};
