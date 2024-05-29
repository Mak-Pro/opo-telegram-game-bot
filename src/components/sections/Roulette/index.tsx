"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components";
import styles from "./style.module.scss";

interface RouletteSlice {
  id: string | number;
  color?: string;
  value?: string | number;
  suffix?: string;
  icon?: string;
}

export const Roulette = ({
  data,
  size,
  winner,
  cover,
  logo,
  duration,
}: {
  data: RouletteSlice[];
  size?: number;
  winner: number;
  cover?: string;
  logo?: string;
  duration?: number;
}) => {
  const roulette = useRef<HTMLDivElement>(null);
  const [spin, setSpin] = useState(false);
  const [win, setWin] = useState(winner);

  let zoneSize = 360 / data.length;
  const rotationLoops = 4;
  const diameter = size ? size + 4 : 544;
  const numberOfSlices = data.length;
  const radius = diameter / 2;
  const circumfrance = 6.283185307 * radius;
  const sliceHeight = circumfrance / numberOfSlices;
  const sliceOffeset = sliceHeight / 2;
  const rotation = 360 / numberOfSlices;

  useEffect(() => {
    if (roulette.current !== null) {
      roulette.current.addEventListener("transitionend", () => {
        roulette!.current!.style.transition = "none";
        roulette!.current!.style.transform = `rotate(${
          win * zoneSize - zoneSize
        }deg)`;
        // if need more than one time spin
        fetch(`${process.env.NEXT_PUBLIC_SERVER_API_PATH}/roulette`)
          .then((res) => res.json())
          .then((data) => {
            setWin(data.winner);
            setSpin(false);
          });
      });
    }
  }, [win]);

  const handleSlin = () => {
    setSpin(true);
    if (roulette.current !== null) {
      roulette.current.style.transition = `all ${
        duration ? duration : 5
      }s cubic-bezier(0.3,0,0,1)`;
      roulette.current.style.transform = `rotate(${
        360 * rotationLoops + win * zoneSize - zoneSize
      }deg)`;
    }
  };

  return (
    <>
      <div className={styles.roulette__section}>
        <div className={styles.roulette__section_spinner}>
          <div className={styles.roulette__section_spinner_inner}>
            {data.length >= 4 ? (
              <>
                <div
                  className={styles.roulette__wrapper}
                  style={{
                    width: `${diameter - 4}px`,
                    height: `${diameter - 4}px`,
                    transform: `rotate(${360 / 4 + rotation}deg)`,
                  }}
                >
                  {cover && (
                    <Image
                      src={cover}
                      fill
                      alt="cover"
                      className={styles.roulette__cover}
                      style={{ transform: `rotate(-${360 / 4 + rotation}deg)` }}
                    />
                  )}
                  {logo && (
                    <Image
                      src={logo}
                      width={40}
                      height={40}
                      alt="logo"
                      className={styles.roulette__logo}
                      style={{ transform: `rotate(-${360 / 4 + rotation}deg)` }}
                    />
                  )}
                  <div className={styles.roulette} ref={roulette}>
                    {data.map((slice, i) => (
                      <div
                        key={slice.id}
                        className={styles.roulette__slice}
                        style={{
                          height: `${sliceHeight}px`,
                          top: `calc(50% - ${sliceOffeset + 1}px)`,
                          transform: `rotate(calc(${rotation}deg * ${i}))`,
                        }}
                      >
                        {slice.value && <i>{slice.value}</i>}
                        <span
                          className={styles.roulette__slice_bg}
                          style={{
                            borderRight: `${radius}px solid ${data[i].color}`,
                            borderTop:
                              data.length < 12 && data.length >= 6
                                ? `${
                                    sliceHeight / 2 + sliceHeight * 0.06
                                  }px solid transparent`
                                : data.length < 6
                                ? `${
                                    sliceHeight / 2 + sliceHeight * 0.14
                                  }px solid transparent`
                                : `${sliceHeight / 2 + 2}px solid transparent`,
                            borderBottom:
                              data.length < 12 && data.length >= 6
                                ? `${
                                    sliceHeight / 2 + sliceHeight * 0.06
                                  }px solid transparent`
                                : data.length < 6
                                ? `${
                                    sliceHeight / 2 + sliceHeight * 0.14
                                  }px solid transparent`
                                : `${sliceHeight / 2 + 2}px solid transparent`,
                          }}
                        ></span>
                        {(slice.value || slice.icon) && (
                          <div className={styles.roulette__slice_content}>
                            {/* {slice.id} */}
                            {slice.icon && (
                              <Image
                                src={`/images/${slice.icon}`}
                                width={32}
                                height={32}
                                alt={slice.suffix ? slice.suffix : "icon"}
                              />
                            )}
                            {slice.value && (
                              <svg>
                                <text
                                  x="50%"
                                  y="50%"
                                  fill="white"
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  stroke="black"
                                  paintOrder="stroke"
                                >
                                  {slice.value} {slice.suffix && slice.suffix}
                                </text>
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>The Number of Roulette Slices is lower than 4</div>
            )}
          </div>
        </div>
        {data.length > 0 && (
          <div className={styles.roulette__actions}>
            <Button
              onClick={handleSlin}
              disabled={spin}
              type="large"
              className={styles.roulette__actions_btn}
            >
              Spin
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
