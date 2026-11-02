import React from "react";
import Accordion from "./Accordion";
import { unorderedList } from "../stylizers";

interface JobPositionProps {
  title: string;
  place: string;
  site: string;
  date: string;
  location: string;
  description: string[];
  stack: string[];
}

const JobPosition: React.FC<JobPositionProps> = ({
  title,
  place,
  site,
  date,
  location,
  description,
  stack,
}) => {
  const header = (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 w-full">
      <div className="min-w-0">
        {title} |{" "}
        <a
          href={site}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {place}
        </a>
      </div>
      <span className="text-base sm:text-lg shrink-0">{date}</span>
    </div>
  );

  const body = (
    <div>
      <p className="mb-2 text-secondary">{location}</p>
      <ul className={unorderedList}>
        {description.map((item) => (
          <li key={item} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
      <p className="flex flex-wrap gap-x-2 gap-y-1 text-base text-secondary">
        {stack.map((item) => (
          <span key={item}>{`#${item}`}</span>
        ))}
      </p>
    </div>
  );

  return <Accordion defaultOpen={true}>{[header, body]}</Accordion>;
};

export default JobPosition;
