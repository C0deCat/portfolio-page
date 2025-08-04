import React from "react";
import Accordion from "./Accordion";

interface JobPositionProps {
  title: string;
  place: string;
  site: string;
  date: string;
  location: string;
  description: string;
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
    <div className="flex justify-between w-full">
      <div>
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
      <span>{date}</span>
    </div>
  );

  const body = (
    <div>
      <p className="mb-2 text-secondary">{location}</p>
      <p className="mb-4">{description}</p>
      <p className="text-base text-secondary">
        {stack.map((item) => (
          <span key={item} className="mr-2">{`#${item}`}</span>
        ))}
      </p>
    </div>
  );

  return <Accordion>{[header, body]}</Accordion>;
};

export default JobPosition;
