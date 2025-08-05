import classNames from "classnames";
import { defaultContainer } from "../stylizers";
import QuoteIcon from "../assets/Quote.svg?react";
import UnquoteIcon from "../assets/Unquote.svg?react";

interface QuoteProps {
  text: string;
  author: string;
  position: string;
  textSize?: "text-xl" | "text-2xl";
  textAlign?: "text-center" | "text-left";
}

export const Quote: React.FC<QuoteProps> = ({
  text,
  author,
  position,
  textSize = "text-2xl",
  textAlign = "text-center",
}) => {
  return (
    <div
      className={classNames(
        defaultContainer(),
        "border-r-0 border-l-0 flex w-full items-center pl-4 pr-4 pt-14 pb-16"
      )}
    >
      <div className="absolute top-0 left-3 text-(--color-primary) opacity-50">
        <QuoteIcon />
      </div>
      <div className={classNames(textSize, textAlign, "w-full")}>{text}</div>
      <div className="absolute bottom-0 left-3">
        <p>-- {author}</p>
        <p>{position}</p>
      </div>
      <div className="absolute bottom-0 right-3 text-(--color-primary) opacity-50">
        <UnquoteIcon />
      </div>
    </div>
  );
};
