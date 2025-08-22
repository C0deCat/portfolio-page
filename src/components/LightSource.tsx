import type { PropsWithChildren } from "react";

interface LightSourceProps {
  color: string;
  left: number;
  top: number;
}

export const LightSource: React.FC<PropsWithChildren<LightSourceProps>> = ({
  color,
  left,
  top,
  children,
}) => {
  const style = {
    left: `${left}%`,
    top: `${top}%`,
    "--light-color": color,
  } as React.CSSProperties & { "--light-color": string };

  return (
    <div className="relative h-fit">
      {children}
      <span className="light-source" style={style} />
    </div>
  );
};
