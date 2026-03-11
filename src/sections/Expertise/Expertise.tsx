import CharacterCard from "./CharacterCard";
import WalkingKittyAnimation from "./WalkingKittyAnimation";
import WanterPosterTree from "./WanterPosterTree";
import { useExpertise } from "./useExpertise";

// Notes for future features:
// - Add a walking animation for the cat while it is moving.

const Expertise: React.FC = () => {
  const {
    sectionRef,
    cardWrapperRef,
    treeRef,
    sectionStyle,
    progress,
    isCardVisible,
    isSmallScreen,
    hasReachedKitty,
    showCallToAction,
    handleOpenRequest,
    onClose,
  } = useExpertise();

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="p-8 relative flex min-h-[100vh] justify-end items-end max-sm:pl-0 max-sm:pr-0 overflow-hidden"
      style={sectionStyle}
    >
      <WalkingKittyAnimation
        sectionRef={sectionRef}
        treeRef={treeRef}
        progress={progress}
        onOpenRequest={handleOpenRequest}
      />
      <WanterPosterTree
        hasReachedKitty={hasReachedKitty}
        isCardVisible={isCardVisible}
        showCallToAction={showCallToAction}
        treeRef={treeRef}
        onOpenRequest={handleOpenRequest}
      />
      <CharacterCard
        cardWrapperRef={cardWrapperRef}
        isSmallScreen={isSmallScreen}
        isCardVisible={isCardVisible}
        onClose={onClose}
      />
    </section>
  );
};

export default Expertise;
