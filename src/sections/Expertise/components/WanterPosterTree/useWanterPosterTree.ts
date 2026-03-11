import classNames from "classnames";

type UseWanterPosterTreeProps = {
  hasReachedKitty: boolean;
  isCardVisible: boolean;
  showCallToAction: boolean;
};

export const useWanterPosterTree = ({
  hasReachedKitty,
  isCardVisible,
  showCallToAction,
}: UseWanterPosterTreeProps) => {
  const posterClassName = classNames(
    "absolute bottom-[32px] left-1/4 h-[600px] w-[541px] -translate-x-1/2 bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
    hasReachedKitty || isCardVisible ? "cursor-pointer" : "cursor-default",
  );

  const callToActionClassName = classNames(
    "absolute left-1/4 -translate-x-1/2 z-10 bg-transparent px-6 py-3 flex flex-col items-center text-[#f4ff00] uppercase text-2xl animate-bounce",
    !showCallToAction && "hidden",
  );

  return {
    posterClassName,
    callToActionClassName,
  };
};
