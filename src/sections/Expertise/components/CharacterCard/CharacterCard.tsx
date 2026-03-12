import classNames from "classnames";
import { defaultContainer } from "../../../../stylizers";
import type { DescriptonBlockProps } from "../../../../types";
import CloseIcon from "../../../../assets/Close.svg?react";
import { useCharacterCard } from "./useCharacterCard";

type CharacterCardProps = {
  cardWrapperRef: React.RefObject<HTMLDivElement | null>;
  isSmallScreen: boolean;
  isCardVisible: boolean;
  onClose: () => void;
};

const DescriptonBlock: React.FC<DescriptonBlockProps> = ({
  title,
  classname,
  children,
}) => {
  const block = classNames(
    defaultContainer(),
    "text-base sm:text-[2.65cqw] pt-2.5 pb-2.5 pr-5 pl-5",
    classname,
  );

  return (
    <div className={block}>
      <h2 className="uppercase text-xl sm:text-[4cqw] pt">{title}</h2>
      {children}
    </div>
  );
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  cardWrapperRef,
  isSmallScreen,
  isCardVisible,
  onClose,
}) => {
  const { cardWrapperClass, rows } = useCharacterCard({
    cardWrapperRef,
    isCardVisible,
  });

  return (
    <div
      id="cardWrapper"
      className={cardWrapperClass}
      ref={cardWrapperRef}
      style={{ width: "min(max(40vw,36rem),100vw)" }}
    >
      {!isSmallScreen && (
        <button
          className="text-3xl leading-none absolute right-[10px] top-[10px] text-(--color-primary) cursor-pointer z-20"
          onClick={onClose}
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      )}
      <div className="flex flex-wrap @md:flex-nowrap items-stretch w-full">
        {rows.first.map((block, idx) => (
          <DescriptonBlock key={idx} {...block} />
        ))}
      </div>
      {rows.second.map((block, idx) => (
        <DescriptonBlock key={idx} {...block} />
      ))}
      <div className="flex flex-wrap @md:flex-nowrap w-full">
        {rows.third.map((block, idx) => (
          <DescriptonBlock key={idx} {...block} />
        ))}
      </div>
    </div>
  );
};

export default CharacterCard;
