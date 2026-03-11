import { useEffect, useRef, useState } from "react";
import treeSrc from "../../../../assets/tree.png";
import { randomInRange } from "../../../../utils/randomInRange";

type Tile = {
  x: number;
  y: number;
  angle: number;
  w: number;
  h: number;
  opacity: number;
};

type Tree = {
  x: number;
  y: number;
  scale: number;
  brightness: number;
  saturation: number;
  opacity: number;
  zIndex: number;
};

type ExpertiseDecorCanvasProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  svgSize: { width: number; height: number };
  catOffsetPath: string;
};

const widthStart = 140;
const widthEnd = 280;
const rowStep = 32;
const tileGap = 2;
const tileSize = 20;
const tileScaleStart = 0.5;
const tileScaleEnd = 1.0;
const tileSizeStart = tileSize * tileScaleStart;
const tileSizeEnd = tileSize * tileScaleEnd;
const rowStepStart = rowStep * tileScaleStart;
const rowStepEnd = rowStep * tileScaleEnd;
const tileOpactityBase = 0.5;
const tileOpacityDegradation = 0.1;
const tileOpacityDegradationStart = 0.9;
const treeGap = 400;
const treeRowGap = 75;
const treeRowCount = 3;
const treeScaleMin = 2.1;
const treeScaleMax = 2.5;
const distanceFromPath = 300;
const delta = 1.5;

const treeRowParams = [
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
] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const buildTiles = (path: SVGPathElement) => {
  const total = path.getTotalLength();
  const next: Tile[] = [];
  let tileOpacity = tileOpactityBase;

  for (
    let s = 0;
    s <= total;
    s += lerp(rowStepStart, rowStepEnd, s / total)
  ) {
    const t = s / total;
    tileOpacity -=
      t >= tileOpacityDegradationStart ? tileOpacityDegradation : 0;

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
    const roadW = lerp(widthStart, widthEnd, t);
    const approxCols = 8;
    const tileW = lerp(tileSizeStart, tileSizeEnd, t);
    const tileH = lerp(tileSizeStart, tileSizeEnd, t);
    const angle = Math.atan2(uy, ux);
    const start = -roadW / 2 + tileW / 2;

    for (let col = 0; col < approxCols; col++) {
      const offset = start + col * (tileW + tileGap);
      const cx = p.x + nx * offset;
      const cy = p.y + ny * offset;

      next.push({
        x: cx - tileW / 2 + randomInRange(-2, 2, 3),
        y: cy - tileH / 2 + randomInRange(-2, 2, 3),
        angle: angle + randomInRange(-0.1, 0.1, 3),
        w: tileW + randomInRange(-2, 2, 3),
        h: tileH + randomInRange(-2, 2, 3),
        opacity: tileOpacity,
      });
    }
  }

  return next;
};

const buildTrees = (path: SVGPathElement) => {
  const total = path.getTotalLength();
  const next: Tree[] = [];

  for (let rowIndex = 0; rowIndex <= treeRowCount; rowIndex++) {
    const rowParam =
      treeRowParams[rowIndex] ?? treeRowParams[treeRowParams.length - 1];
    const rowOffset = distanceFromPath + rowIndex * treeRowGap;
    const isSparseRow = rowIndex === treeRowCount;
    const rowStepValue = treeGap * (isSparseRow ? 3 : 1);

    for (let s = 0; s <= total; s += rowStepValue) {
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
      const scale = randomInRange(treeScaleMin, treeScaleMax, 2) + rowParam.scale;
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

  return next.sort((left, right) => left.zIndex - right.zIndex);
};

const drawTiles = (ctx: CanvasRenderingContext2D, tiles: Tile[]) => {
  tiles.forEach((tile) => {
    ctx.save();
    ctx.translate(tile.x + tile.w / 2, tile.y + tile.h / 2);
    ctx.rotate(tile.angle);
    ctx.fillStyle = `rgba(187, 191, 163, ${tile.opacity.toFixed(2)})`;
    ctx.fillRect(-tile.w / 2, -tile.h / 2, tile.w, tile.h);
    ctx.restore();
  });
};

const drawTrees = (
  ctx: CanvasRenderingContext2D,
  treeImage: HTMLImageElement,
  trees: Tree[],
) => {
  const treeWidth = treeImage.naturalWidth || treeImage.width;
  const treeHeight = treeImage.naturalHeight || treeImage.height;

  trees.forEach((tree) => {
    const scaledWidth = treeWidth * tree.scale;
    const scaledHeight = treeHeight * tree.scale;
    const drawX = tree.x + ((1 - tree.scale) * treeWidth) / 2;
    const drawY = tree.y + ((1 - tree.scale) * treeHeight) / 2;

    ctx.save();
    ctx.globalAlpha = tree.opacity;
    ctx.filter = `brightness(${tree.brightness}) saturate(${tree.saturation})`;
    ctx.drawImage(treeImage, drawX, drawY, scaledWidth, scaledHeight);
    ctx.restore();
  });
};

const ExpertiseDecorCanvas: React.FC<ExpertiseDecorCanvasProps> = ({
  sectionRef,
  svgSize,
  catOffsetPath,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [treeImage, setTreeImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let isDisposed = false;
    const image = new Image();
    image.src = treeSrc;
    image.decoding = "async";

    const handleLoad = () => {
      if (!isDisposed) {
        setTreeImage(image);
      }
    };

    if (image.complete) {
      handleLoad();
      return () => {
        isDisposed = true;
      };
    }

    image.addEventListener("load", handleLoad);

    return () => {
      isDisposed = true;
      image.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const path = sectionRef.current?.querySelector<SVGPathElement>("#roadPath");

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    if (!path || !svgSize.width || !svgSize.height) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(svgSize.width * dpr));
    canvas.height = Math.max(1, Math.round(svgSize.height * dpr));
    canvas.style.width = `${svgSize.width}px`;
    canvas.style.height = `${svgSize.height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, svgSize.width, svgSize.height);
    ctx.imageSmoothingEnabled = false;

    drawTiles(ctx, buildTiles(path));

    if (treeImage) {
      drawTrees(ctx, treeImage, buildTrees(path));
    }
  }, [catOffsetPath, sectionRef, svgSize.height, svgSize.width, treeImage]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
};

export default ExpertiseDecorCanvas;
