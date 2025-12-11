import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ResponsiveNumber = {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
};

type BackgroundImage = {
  src: string;
  scale?: number;
};

type PositionedImage = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type LoadedImageMeta = {
  src: string;
  width: number;
  height: number;
  scale: number;
};

type DynamicParallaxBackgroundProps = {
  images: BackgroundImage[];
  scatter?: ResponsiveNumber;
  imageSize?: ResponsiveNumber;
  speed?: number;
  edgeBlur?: number;
  children: React.ReactNode;
};

const remBreakpoints: Record<
  Exclude<keyof ResponsiveNumber, "base">,
  number
> = {
  sm: 40,
  md: 48,
  lg: 64,
  xl: 80,
  "2xl": 96,
};

const defaultScatter: ResponsiveNumber = { base: 80 };
const defaultImageSize: ResponsiveNumber = { base: 1 };
const defaultSpeed = 0.2;

const getResponsiveValue = (
  values: ResponsiveNumber,
  viewportWidth: number
) => {
  const remSize = parseFloat(
    typeof window !== "undefined"
      ? window.getComputedStyle(document.documentElement).fontSize || "16"
      : "16"
  );

  let currentValue = values.base;

  (Object.keys(remBreakpoints) as (keyof typeof remBreakpoints)[]).forEach(
    (key) => {
      const threshold = remBreakpoints[key] * remSize;
      if (viewportWidth >= threshold && values[key] !== undefined) {
        currentValue = values[key] as number;
      }
    }
  );

  return currentValue;
};

const distanceBetweenRects = (
  next: { x: number; y: number; width: number; height: number },
  existing: PositionedImage
) => {
  const dx = Math.max(
    0,
    existing.x - (next.x + next.width),
    next.x - (existing.x + existing.width)
  );
  const dy = Math.max(
    0,
    existing.y - (next.y + next.height),
    next.y - (existing.y + existing.height)
  );

  return Math.hypot(dx, dy);
};

const DynamicParallaxBackground: React.FC<DynamicParallaxBackgroundProps> = ({
  images,
  scatter = defaultScatter,
  imageSize = defaultImageSize,
  speed = defaultSpeed,
  edgeBlur,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [loadedImages, setLoadedImages] = useState<LoadedImageMeta[]>([]);
  const [positions, setPositions] = useState<PositionedImage[]>([]);

  const scatterValue = useMemo(
    () => getResponsiveValue(scatter, viewportWidth),
    [scatter, viewportWidth]
  );

  const imageSizeValue = useMemo(
    () => getResponsiveValue(imageSize, viewportWidth),
    [imageSize, viewportWidth]
  );

  useEffect(() => {
    const resizeListener = () => setViewportWidth(window.innerWidth);

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      setContainerSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadImages = useCallback(async () => {
    const promises = images.map(
      (image) =>
        new Promise<LoadedImageMeta>((resolve) => {
          const img = new Image();
          img.src = image.src;
          img.onload = () =>
            resolve({
              src: image.src,
              width: img.naturalWidth || 100,
              height: img.naturalHeight || 100,
              scale: image.scale ?? 1,
            });
          img.onerror = () =>
            resolve({
              src: image.src,
              width: 100,
              height: 100,
              scale: image.scale ?? 1,
            });
        })
    );

    const result = await Promise.all(promises);
    setLoadedImages(result);
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const getScaledSize = useCallback(
    (meta: LoadedImageMeta) => {
      const multiplier = meta.scale * imageSizeValue;
      return {
        width: meta.width * multiplier,
        height: meta.height * multiplier,
      };
    },
    [imageSizeValue]
  );

  const averageArea = useMemo(() => {
    if (!loadedImages.length) {
      return 10000;
    }

    const totalArea = loadedImages.reduce((sum, meta) => {
      const size = getScaledSize(meta);
      return sum + size.width * size.height;
    }, 0);

    return Math.max(totalArea / loadedImages.length, 1);
  }, [getScaledSize, loadedImages]);

  const tryPlaceImage = useCallback(
    (
      width: number,
      height: number,
      currentPositions: PositionedImage[],
      idSeed: number
    ) => {
      if (!loadedImages.length) {
        return null;
      }

      const meta =
        loadedImages[Math.floor(Math.random() * loadedImages.length)];
      const size = getScaledSize(meta);

      if (size.width > width || size.height > height) {
        return null;
      }

      const maxX = Math.max(width - size.width, 0);
      const maxY = Math.max(height - size.height, 0);
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      const hasSpacing = currentPositions.every(
        (position) =>
          distanceBetweenRects(
            { x, y, width: size.width, height: size.height },
            position
          ) >= scatterValue
      );

      if (!hasSpacing) {
        return null;
      }

      return {
        id: `${meta.src}-${idSeed}-${Math.random().toString(36).slice(2, 8)}`,
        src: meta.src,
        x,
        y,
        width: size.width,
        height: size.height,
      } as PositionedImage;
    },
    [getScaledSize, loadedImages, scatterValue]
  );

  useEffect(() => {
    if (!containerSize.width || !containerSize.height || !loadedImages.length) {
      return;
    }

    setPositions((previousPositions) => {
      const adjusted = previousPositions
        .map((position) => {
          const meta = loadedImages.find((item) => item.src === position.src);
          if (!meta) {
            return null;
          }

          const size = getScaledSize(meta);
          return {
            ...position,
            width: size.width,
            height: size.height,
          } as PositionedImage;
        })
        .filter(Boolean) as PositionedImage[];

      const withinBounds = adjusted.filter(
        (position) =>
          position.x + position.width <= containerSize.width &&
          position.y + position.height <= containerSize.height
      );

      const targetCount = Math.max(
        withinBounds.length,
        Math.ceil(
          (containerSize.width * containerSize.height) / (averageArea * 2)
        )
      );

      const nextPositions = [...withinBounds];
      let attempts = 0;
      const maxAttempts = targetCount * 10;

      while (nextPositions.length < targetCount && attempts < maxAttempts) {
        const placed = tryPlaceImage(
          containerSize.width,
          containerSize.height,
          nextPositions,
          attempts
        );

        if (placed) {
          nextPositions.push(placed);
        }

        attempts += 1;
      }

      return nextPositions;
    });
  }, [
    averageArea,
    containerSize.height,
    containerSize.width,
    getScaledSize,
    loadedImages,
    scatterValue,
    tryPlaceImage,
  ]);

  useEffect(() => {
    setPositions([]);
  }, [imageSizeValue, scatterValue, images]);

  const parallaxLoopHeight = Math.max(containerSize.height, 1);
  const rawOffset = parallaxOffset * speed;
  const loopOffset =
    ((rawOffset % parallaxLoopHeight) + parallaxLoopHeight) %
    parallaxLoopHeight;

  const blurMaskStyle = edgeBlur
    ? {
        maskImage: `linear-gradient(to bottom, transparent 0px, black ${edgeBlur}px, black calc(100% - ${edgeBlur}px), transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, black ${edgeBlur}px, black calc(100% - ${edgeBlur}px), transparent 100%)`,
      }
    : undefined;

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={blurMaskStyle}
      >
        {[0, parallaxLoopHeight].map((offset) => (
          <div
            key={offset}
            className="absolute inset-0"
            style={{
              transform: `translate3d(0, ${-loopOffset + offset}px, 0)`,
            }}
          >
            {positions.map((position) => (
              <img
                key={`${position.id}-${offset}`}
                src={position.src}
                alt=""
                className="absolute object-contain select-none pixelated"
                draggable={false}
                style={{
                  left: position.x,
                  top: position.y,
                  width: position.width,
                  height: position.height,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DynamicParallaxBackground;
