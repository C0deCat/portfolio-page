import { useEffect, useMemo, useState } from "react";
import { randomInRange } from "../../utils/randomInRange";

type Tile = {
  key: string;
  x: number;
  y: number;
  angle: number;
  w: number;
  h: number;
  opacity: number;
};

type TUseTilesProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  svgSize: { width: number; height: number };
  catOffsetPath: string;
};

// Настройки "перспективы"
const widthStart = 150; // узко в начале
const widthEnd = 300; // широко в конце
const rowStep = 32; // шаг вдоль пути (плотность рядов)
const tileGap = 2; // зазор между плитками
const tileSize = 20; // базовая сторона квадрата плитки

const tileScaleStart = 0.6;
const tileScaleEnd = 1.0;

const tileSizeStart = tileSize * tileScaleStart;
const tileSizeEnd = tileSize * tileScaleEnd;

const rowStepStart = rowStep * tileScaleStart;
const rowStepEnd = rowStep * tileScaleEnd;

const tileOpactityBase = 0.5;
const tileOpacityDegradation = 0.1;
const tileOpacityDegradationStart = 0.9; // from progress 0.85 to 1.0

// Малый дельта-отрезок для tangent
const delta = 1.5;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const useTiles = ({
  sectionRef,
  svgSize,
  catOffsetPath,
}: TUseTilesProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    const svg = sectionRef.current?.querySelector("svg");
    const path = svg?.querySelector<SVGPathElement>("#roadPath");
    if (!svg || !path) return;

    // Координаты берём в user units SVG (у вас viewBox ~= px, preserveAspectRatio="none")
    const total = path.getTotalLength(); // :contentReference[oaicite:3]{index=3}

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

      // Точка на осевой линии
      const p = path.getPointAtLength(s); // :contentReference[oaicite:4]{index=4}

      // Точка чуть дальше/раньше для касательной
      const p1 = path.getPointAtLength(Math.max(0, s - delta));
      const p2 = path.getPointAtLength(Math.min(total, s + delta));

      const tx = p2.x - p1.x;
      const ty = p2.y - p1.y;

      const mag = Math.hypot(tx, ty) || 1;
      const ux = tx / mag;
      const uy = ty / mag;

      // Нормаль (перпендикуляр вправо)
      const nx = -uy;
      const ny = ux;

      const roadW = lerp(widthStart, widthEnd, t);

      // Сколько плиток укладываем поперёк: по сути "колонки"
      // Делайте tileW так, чтобы их было 3..9 в зависимости от ширины
      const approxCols = 12;
      const tileW = lerp(tileSizeStart, tileSizeEnd, t);
      const tileH = lerp(tileSizeStart, tileSizeEnd, t);

      // Угол плиток по касательной
      const angle = Math.atan2(uy, ux);

      // Центрируем ряд по ширине: offsets от -roadW/2 до +roadW/2
      const start = -roadW / 2 + tileW / 2;

      for (let col = 0; col < approxCols; col++) {
        const offset = start + col * (tileW + tileGap);

        // Позиция центра плитки (вокруг осевой линии)
        const cx = p.x + nx * offset;
        const cy = p.y + ny * offset;

        // translate ставит top-left, поэтому сдвигаем на половину размера
        next.push({
          key: `${Math.round(s)}:${col}`,
          x: cx - tileW / 2 + randomInRange(-2, 2, 3),
          y: cy - tileH / 2 + randomInRange(-2, 2, 3),
          angle: angle + randomInRange(-0.1, 0.1, 3),
          w: tileW,
          h: tileH,
          opacity: tileOpacity,
        });
      }
    }

    setTiles(next);
  }, [catOffsetPath, svgSize.width, svgSize.height]);

  const tilesElems = useMemo(
    () =>
      tiles.map((t) => (
        <div
          key={t.key}
          className="absolute rounded-sm"
          style={{
            backgroundColor: `rgba(255, 166, 0, ${t.opacity.toFixed(2)})`,
            width: `${t.w}px`,
            height: `${t.h}px`,
            transformOrigin: "50% 50%",
            transform: `translate(${t.x}px, ${t.y}px) rotate(${t.angle}rad)`,
          }}
        />
      )),
    [tiles],
  );

  return {
    tilesElems,
  };
};
