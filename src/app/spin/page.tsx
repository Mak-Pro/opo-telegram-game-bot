import { Roulette } from "@/components";
import { getData } from "@/helpers";

export default async function SpinPage() {
  const data = await getData(`${process.env.SERVER_API_PATH}/roulette`, 84600);
  const { roulette, winner } = data;

  return (
    <>
      {roulette && roulette.length > 0 && (
        <Roulette
          data={roulette.reverse()}
          size={470}
          winner={winner}
          cover="/images/wof-frame.png"
          logo="/icons/short-logo.svg"
        />
      )}
    </>
  );
}
