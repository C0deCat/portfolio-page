import classNames from "classnames";
import catStanding from "../../assets/CatStanding.png";
import ExpertiseDecorCanvas from "./ExpertiseDecorCanvas";
import { useWalkingKittyAnimation } from "./useWalkingKittyAnimation";

type WalkingKittyAnimationProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  treeRef: React.RefObject<HTMLButtonElement | null>;
  progress: number;
  onOpenRequest: () => void;
};

const WalkingKittyAnimation: React.FC<WalkingKittyAnimationProps> = ({
  sectionRef,
  treeRef,
  progress,
  onOpenRequest,
}) => {
  const { svgSize, catOffsetPath, catMotionStyles } = useWalkingKittyAnimation({
    sectionRef,
    treeRef,
    progress,
  });

  return (
    <>
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={`0 0 ${svgSize.width || 1} ${svgSize.height || 1}`}
      >
        <path
          id="roadPath"
          d={catOffsetPath}
          fill="none"
          stroke="none"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          // Alternative line style.
          strokeDasharray="10 8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ExpertiseDecorCanvas
        sectionRef={sectionRef}
        svgSize={svgSize}
        catOffsetPath={catOffsetPath}
      />
      <div
        onClick={onOpenRequest}
        className={classNames(
          "absolute z-10 top-0 left-0 h-[150px] w-auto bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
        )}
        style={catMotionStyles}
      >
        <img
          src={catStanding}
          alt="Cat standing with a letter"
          className="h-full w-auto pixelated pointer-events-none select-none"
        />
      </div>
    </>
  );
};

export default WalkingKittyAnimation;
