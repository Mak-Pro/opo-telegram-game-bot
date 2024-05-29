import Image from "next/image";
import styles from "./style.module.scss";
import { TagProps } from "@/Types";

export const Tag = ({ icon, iconPosition, text, bgColor }: TagProps) => {
  return (
    <>
      {(text || icon) && (
        <div
          className={`${styles.tag} ${
            iconPosition === "right" ? styles.tag__reverse : ""
          }`}
          style={{
            backgroundColor: bgColor ? bgColor : "rgba(255, 255, 255, 0.12)",
          }}
        >
          {icon && (
            <Image
              src={icon.src}
              width={icon.width}
              height={icon.height}
              alt={icon.alt ? icon.alt : "icon"}
              className={styles.tag__icon}
            />
          )}
          {text && <span className={styles.tag__text}>{text}</span>}
        </div>
      )}
    </>
  );
};
