import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { coinContext } from "../context/coinContext";

const Coin = () => {
  const { curreny } = useContext(coinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState([]);

  const fetchCoinData = () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((json) => setCoinData(json))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
  }, [curreny]);

  if (coinData) {
    return (
      <div>
        <h1>{coinData?.name}</h1>
        <img src={coinData?.image.large} alt="" />
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default Coin;
