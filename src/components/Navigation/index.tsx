"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Discover from "@public/icons/discover.svg";
import Games from "@public/icons/play.svg";
import Quests from "@public/icons/quests.svg";
import Spin from "@public/icons/spin.svg";
import Market from "@public/icons/market.svg";
import styles from "./style.module.scss";

const navigationItems = [
  { link: "/", icon: <Discover />, text: "Discover" },
  { link: "/games", icon: <Games />, text: "Games" },
  { link: "/quests", icon: <Quests />, text: "Quests" },
  { link: "/spin", icon: <Spin />, text: "Spin" },
  { link: "/market", icon: <Market />, text: "Market" },
];

export const Navigation = () => {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      {navigationItems.map((item) => (
        <div
          key={item.text}
          className={`${styles.nav__item} ${
            path === item.link ? styles.nav__item_active : ""
          }`}
        >
          <Link href={item.link} className={styles.nav__item_link}>
            Link
          </Link>
          <div className={styles.nav__item_icon}>{item.icon}</div>
          <span className={styles.nav__item_text}>{item.text}</span>
        </div>
      ))}
    </nav>
  );
};
