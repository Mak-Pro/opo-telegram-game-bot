import styles from "./index.module.scss";

interface SpacerProps {
  height?: number;
}

export const Spacer = ({ height }: SpacerProps) => {
  return (
    <div
      style={{ width: "100%", padding: `${height ? height / 2 : 10}px 0` }}
    ></div>
  );
};
