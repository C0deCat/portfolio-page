import React from "react";

export interface ProjectCardProps {
  title: string;
  tags: string[];
  image: string;
  stack: string[];
  content: React.ReactNode;
  projectLink?: string;
}

export interface DescriptonBlockProps {
  title?: string;
  classname?: string;
  children?: React.ReactNode;
}
