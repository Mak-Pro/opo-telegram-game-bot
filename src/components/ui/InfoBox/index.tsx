import styles from "./style.module.scss";
import { InfoBoxProps } from "@/Types";

export const InfoBox = ({ title, content }: InfoBoxProps) => {
  return (
    <div className={styles.infobox}>
      {title && (
        <div className={styles.infobox__header}>
          <h3 className={styles.infobox__title}>{title}</h3>
        </div>
      )}
      {content && <div className={styles.infobox__body}>{content}</div>}
    </div>
  );
};
