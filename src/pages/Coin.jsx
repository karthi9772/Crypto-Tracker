import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";
import { coinContext } from "../context/coinContext";

const Coin = () => {
  const { currency } = useContext(coinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  const fetchCoinData = () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((json) => {
        setCoinData(json);
        fetchPriceHistory();
      })
      .catch((err) => console.error(err));
  };

  const fetchPriceHistory = () => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7`
    )
      .then((res) => res.json())
      .then((json) => {
        const formattedData = [
          ["Date", "Price"],
          ...json.prices.map(([timestamp, price]) => [
            new Date(timestamp).toLocaleDateString(),
            price,
          ]),
        ];
        setPriceHistory(formattedData);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchPriceHistory();
  }, [currency]);

  if (!coinData) {
    return <div className="text-center text-xl py-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-[#00171F] shadow-lg rounded-lg mt-5 text-white">
      {/* Coin Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={coinData?.image?.large}
          alt={`${coinData?.name} logo`}
          className="w-20 h-20"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {coinData?.name} ({coinData?.symbol?.toUpperCase()})
          </h1>
          <p className="text-gray-300">Rank: #{coinData?.market_cap_rank}</p>
        </div>
      </div>

      {/* Market Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-800 rounded-md shadow">
          <h2 className="text-lg font-semibold">Current Price</h2>
          <p className="text-2xl font-bold text-green-600">
            {currency.symbol}
            {coinData?.market_data?.current_price?.[
              currency.name
            ]?.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-md shadow">
          <h2 className="text-lg font-semibold">Market Cap</h2>
          <p>
            {currency.symbol}
            {coinData?.market_data?.market_cap?.[
              currency.name
            ]?.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-md shadow">
          <h2 className="text-lg font-semibold">24h Price Change</h2>
          <p
            className={`${
              coinData?.market_data?.price_change_percentage_24h > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {coinData?.market_data?.price_change_percentage_24h}%
          </p>
        </div>
      </div>

      {/* Supply Details */}
      <div className="p-4 bg-gray-800 rounded-md shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Supply Details</h2>
        <ul>
          <li>
            <strong>Total Supply:</strong>{" "}
            {coinData?.market_data?.total_supply?.toLocaleString()}
          </li>
          <li>
            <strong>Max Supply:</strong>{" "}
            {coinData?.market_data?.max_supply?.toLocaleString()}
          </li>
          <li>
            <strong>Circulating Supply:</strong>{" "}
            {coinData?.market_data?.circulating_supply?.toLocaleString()}
          </li>
        </ul>
      </div>

      {/* Price History Chart */}
      <div className="p-4 bg-gray-800 rounded-md shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Price History (Last 7 Days)</h2>
        {priceHistory.length > 1 ? (
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={priceHistory}
            options={{
              hAxis: { title: "Date" },
              vAxis: { title: `Price (${currency.name})` },
              legend: "none",
              curveType: "function",
            }}
          />
        ) : (
          <p>Loading Chart...</p>
        )}
      </div>

      {/* Community Stats */}
      <div className="p-4 bg-gray-800 rounded-md shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Community Stats</h2>
        <ul>
          <li>
            <strong>Twitter Followers:</strong>{" "}
            {coinData?.community_data?.twitter_followers}
          </li>
          <li>
            <strong>Stars on GitHub:</strong> {coinData?.developer_data?.stars}
          </li>
          <li>
            <strong>Forks on GitHub:</strong> {coinData?.developer_data?.forks}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
