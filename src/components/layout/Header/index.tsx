"use client";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { Tag } from "@/components";
import styles from "./style.module.scss";
import { useTelegram } from "@/providers/telegram";
import AppContext from "@/providers/context";

export const Header = () => {
  const { user } = useTelegram();
  const { balance } = useContext(AppContext);

  // useEffect(() => {}, [balance]);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Image
          src="/icons/logo.svg"
          width={36}
          height={36}
          alt="logo"
          className={styles.header__logo}
        />
        <span>{user?.first_name}</span>
      </div>

      <div className={styles.header__actions}>
        <Tag
          icon={{ src: "/icons/coin.svg", width: 24, height: 24, alt: "coins" }}
          text={balance}
        />
      </div>
    </header>
  );
};
