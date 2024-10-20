import { useEffect, useState } from "react";
import { getCoinsList } from "./api/endpoints";
import CoinDetails from "./components/CoinDetails";
import { coinDummyData } from "./constants";
import { useStore } from "./store";
import { CoinData } from "./types";

const App: React.FC = () => {
  const { setCoinsList } = useStore((state) => state);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCoins = async () => {
      try {
        if (coinDummyData && coinDummyData.id) {
          setSelectedCoin(coinDummyData);
          setCoinsList([coinDummyData]);
        } else {
          const fetchedCoinsList = await getCoinsList();
          setCoinsList(fetchedCoinsList);
          if (fetchedCoinsList.length > 0) {
            setSelectedCoin(fetchedCoinsList[0]);
          } else {
            setError("No coins available.");
          }
        }
      } catch (err) {
        console.error("Error setting up coin data:", err);
        setError("Failed to load coin data.");
      }
    };

    initializeCoins();
  }, [setCoinsList]);

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!selectedCoin) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex mx-auto my-20 max-w-screen-md">
      <CoinDetails coin={selectedCoin} />
    </div>
  );
};

export default App;
