import { useEffect, useMemo } from "react";
import classNames from "classnames";
import { expertiseContent } from "../../data/expertise";
import type { DescriptonBlockProps } from "../../types";

type UseCharacterCardProps = {
  cardWrapperRef: React.RefObject<HTMLDivElement | null>;
  isCardVisible: boolean;
};

const firstRow: DescriptonBlockProps[] = [
  {
    title: "Portrait",
    classname:
      "aspect-square self-stretch min-h-[200px] grow @md:grow-0 @max-md:border-b-0 @md:border-r-0",
  },
  {
    title: "Character Info",
    classname: "grow",
    children: expertiseContent["Character Info"],
  },
];

const secondRow: DescriptonBlockProps[] = [
  {
    title: "Frontend",
    classname: "w-full border-t-0 border-b-0",
    children: expertiseContent.Frontend,
  },
];

const thirdRow: DescriptonBlockProps[] = [
  {
    title: "Software Engineer",
    classname: "flex-1 basis-[250px] @max-md:border-b-0 @md:border-r-0",
    children: expertiseContent["Software Engineer"],
  },
  {
    title: "Miscellaneous",
    classname: "flex-1 basis-[250px]",
    children: expertiseContent.Miscellaneous,
  },
];

export const useCharacterCard = ({
  cardWrapperRef,
  isCardVisible,
}: UseCharacterCardProps) => {
  const cardWrapperClass = classNames(
    "flex flex-col flex-wrap @container",
    isCardVisible
      ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      : "hidden",
  );

  useEffect(() => {
    if (!isCardVisible) {
      return;
    }

    const scrollToCenter = () => {
      const card = cardWrapperRef.current;

      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const offsetY = rect.top + rect.height / 2 - window.innerHeight / 2;

      window.scrollBy({ top: offsetY, behavior: "smooth" });
    };

    const frame = window.requestAnimationFrame(scrollToCenter);

    return () => window.cancelAnimationFrame(frame);
  }, [cardWrapperRef, isCardVisible]);

  const rows = useMemo(
    () => ({
      first: firstRow,
      second: secondRow,
      third: thirdRow,
    }),
    [],
  );

  return {
    cardWrapperClass,
    rows,
  };
};
