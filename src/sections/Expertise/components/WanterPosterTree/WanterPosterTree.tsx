import wantedKitty from "../../../../assets/WantedKitty.png";
import wantedKittyActive from "../../../../assets/WantedKitty_active.png";
import { useWanterPosterTree } from "./useWanterPosterTree";

type WanterPosterTreeProps = {
  hasReachedKitty: boolean;
  isCardVisible: boolean;
  showCallToAction: boolean;
  treeRef: React.RefObject<HTMLButtonElement | null>;
  onOpenRequest: () => void;
};

const WanterPosterTree: React.FC<WanterPosterTreeProps> = ({
  hasReachedKitty,
  isCardVisible,
  showCallToAction,
  treeRef,
  onOpenRequest,
}) => {
  const { posterClassName, callToActionClassName } = useWanterPosterTree({
    hasReachedKitty,
    isCardVisible,
    showCallToAction,
  });

  return (
    <>
      <button
        type="button"
        onClick={onOpenRequest}
        className={posterClassName}
        aria-label="Open message"
        ref={treeRef}
      >
        <img
          src={showCallToAction ? wantedKittyActive : wantedKitty}
          alt="Wanted kitty poster"
          className="h-full w-auto pixelated pointer-events-none select-none"
        />
      </button>
      {showCallToAction && (
        <button
          type="button"
          onClick={onOpenRequest}
          className={callToActionClassName}
          style={{ bottom: "350px" }}
        >
          <span>Click to open message</span>
          <span className="text-2xl leading-none">&darr;</span>
        </button>
      )}
    </>
  );
};

export default WanterPosterTree;
