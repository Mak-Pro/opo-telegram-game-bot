"use client";
import { useId } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./style.module.scss";

const slides = [
  {
    id: 1,
    image: "/images/slider-img-1.svg",
    content: {
      title: "Order Game",
      text: "We develop games to order, we can develop them for you",
    },
    colors: ["#A9DBFF", "#489FDF"],
  },
  {
    id: 2,
    image: "/images/slider-img-1.svg",
    content: {
      title: "Aliens and Humanoids",
      text: "We develop games to order, we can develop them for you",
    },
    colors: ["#FFD799", "#FF9F0A"],
  },
  {
    id: 3,
    image: "/images/slider-img-1.svg",
    content: {
      title: "Super Sport",
      text: "We develop games to order, we can develop them for you",
    },
    colors: ["#A8FFBE", "#30D158"],
  },
  {
    id: 4,
    image: "/images/slider-img-1.svg",
    content: {
      title: "Great Battle",
      text: "We develop games to order, we can develop them for you",
    },
    colors: ["#B2B0FF", "#5856D6"],
  },

  {
    id: 5,
    image: "/images/slider-img-1.svg",
    content: {
      title: "Space Shooters",
      text: "We develop games to order, we can develop them for you",
    },
    colors: ["#FF96AA", "#FF2D55"],
  },
];

export function HeroSlider() {
  const id = useId().replace(/:/g, "");
  return (
    <div className={styles.hero__slider_wrapper}>
      <div className={styles.hero__slider_wrapper_body}>
        <Swiper
          className={`${styles.hero__slider}`}
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{
            dynamicBullets: true,
            el: `#pagination-${id}`,
            type: "bullets",
          }}
          loop={true}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className={styles.hero__slider_slide}
                style={{
                  background: `linear-gradient(135deg, ${slide.colors[0]} 0%, ${slide.colors[1]} 100%)`,
                }}
              >
                <Image
                  src={slide.image}
                  width={320}
                  height={58}
                  alt={slide.content.title}
                  className={styles.hero__slider_slide_image}
                />
                <div className={styles.hero__slider_slide_text}>
                  <h2>{slide.content.title}</h2>
                  <p>{slide.content.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.hero__slider_footer}>
        <div
          id={`pagination-${id}`}
          className={styles.hero__slider_pagination}
        ></div>
      </div>
    </div>
  );
}
