"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { GameProps } from "@/Types";
import { useTelegram } from "@/providers/telegram";

export const Game = ({ id, link, image, title, description }: GameProps) => {
  const { webApp } = useTelegram();

  const handleButtonClick = () => {
    const data = {
      queryId: webApp?.initDataUnsafe.query_id,
      id: webApp?.initDataUnsafe.user?.id,
      gameId: id,
      gameUrl: link,
    };

    fetch("http://localhost:8000/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    webApp?.close();
  };

  return (
    <div className={styles.game} onClick={handleButtonClick}>
      {image && (
        <div className={styles.game__image}>
          <Image src={image.url} fill alt={image.alt} />
        </div>
      )}
      {(title || description) && (
        <div className={styles.game__text}>
          {title && <h4 className={styles.game__title}>{title}</h4>}
          {description && <p>{description}</p>}
        </div>
      )}
    </div>
  );
};
