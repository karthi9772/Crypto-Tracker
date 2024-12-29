import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { coinContext } from "../context/coinContext";

const Coin = () => {
  const { currency } = useContext(coinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoinData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        { method: "GET", headers: { accept: "application/json" } }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const json = await res.json();
      setCoinData(json);
    } catch (err) {
      console.error("Failed to fetch coin data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency, coinId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!coinData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>{coinData?.name || "No Name Available"}</h1>
      {coinData?.image?.large ? (
        <img src={coinData.image.large} alt={coinData?.name || "Coin Image"} />
      ) : (
        <p>No image available</p>
      )}
      <p>
        Symbol: {coinData?.symbol?.toUpperCase() || "N/A"} | Rank:{" "}
        {coinData?.market_cap_rank || "N/A"}
      </p>
      <p>
        Current Price: {currency?.symbol || "$"}{" "}
        {coinData?.market_data?.current_price?.[currency?.code] || "N/A"}
      </p>
    </div>
  );
};

export default Coin;
