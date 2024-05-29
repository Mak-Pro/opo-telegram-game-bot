export interface TagProps {
  bgColor?: string;
  text?: string | number;
  icon?: {
    src: string;
    width: number;
    height: number;
    alt?: string;
  } | null;
  iconPosition?: "left" | "right";
}

export interface GameProps {
  id?: string | number;
  link?: string;
  image?: {
    url: string;
    alt: string;
  };
  title?: string;
  description?: string;
}

export interface InfoBoxProps {
  title?: string;
  content?: React.ReactNode;
}
