import { InfoBox, Game } from "@/components";
import { GameProps } from "@/Types";

const games: GameProps[] = [
  {
    id: 1,
    link: "#",
    image: {
      url: "https://iili.io/J6CjPQn.jpg",
      alt: "Tap The Lamp",
    },
    title: "Tap The Lamp",
    description:
      "During the base game Scatters can appear on any reel. Sticky Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
  {
    id: 2,
    link: "#",
    image: {
      url: "https://iili.io/J6CjsBs.jpg",
      alt: "High or Low",
    },
    title: "High or Low",
    description:
      "Scatters can appear on any reel. Sticky Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
  {
    id: 3,
    link: "#",
    image: {
      url: "https://iili.io/J6Cj6hX.jpg",
      alt: "Star Ship",
    },
    title: "Star Ship",
    description:
      "Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
  {
    id: 4,
    link: "#",
    image: {
      url: "https://iili.io/J6CjLEG.jpg",
      alt: "Paw Patrol",
    },
    title: "Paw Patrol",
    description:
      "Appear on any reel. Sticky Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
  {
    id: 5,
    link: "#",
    image: {
      url: "https://iili.io/J6CjPQn.jpg",
      alt: "Tap The Lamp",
    },
    title: "Tap The Lamp",
    description:
      "During the base game Scatters can appear on any reel. Sticky Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
  {
    id: 6,
    link: "#",
    image: {
      url: "https://iili.io/J6CjsBs.jpg",
      alt: "High or Low",
    },
    title: "High or Low",
    description:
      "Scatters can appear on any reel. Sticky Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
  {
    id: 7,
    link: "#",
    image: {
      url: "https://iili.io/J6Cj6hX.jpg",
      alt: "Star Ship",
    },
    title: "Star Ship",
    description:
      "Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
  {
    id: 8,
    link: "#",
    image: {
      url: "https://iili.io/J6CjLEG.jpg",
      alt: "Paw Patrol",
    },
    title: "Paw Patrol",
    description:
      "Appear on any reel. Sticky Wilds trigger a re-spin and stick to the panel until the re-spin ends. Wilds substitute for any symbol except the Scatter.",
  },
];

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/games`, {
    next: {
      revalidate: 1,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }
  return res.json();
}

export const Games = async () => {
  const data: GameProps[] = await getData();

  const gamesList = (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px 0" }}>
      {data.map((game) => (
        <Game key={game.id} {...game} />
      ))}
    </div>
  );

  return <InfoBox title="Games" content={gamesList} />;
};
