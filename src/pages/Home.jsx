import { useContext, useEffect, useState } from "react";
import { coinContext } from "../context/coinContext";

const Home = () => {
  const { allCoin, currency } = useContext(coinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const HandleChange = (e) => {
    setInput(e.target.value);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  return (
    <div>
      <div className="max-w-screen m-6  text-white text-center flex flex-col mx-auto">
        <h1 className="font-bold text-4xl text-white">
          Your Gateway to <br />
          Real-Time Crypto Market
          <br /> Insights
        </h1>
        <h1 className="mt-2 font-normal ">
          up-to-date, live data of all CryptoCoins.
        </h1>
        {/* Serach box */}
        <form className="mt-8" onSubmit={HandleSubmit}>
          <input
            type="text"
            placeholder="Search crypto..."
            value={input}
            onChange={HandleChange}
            className="h-[2rem] p-2 rounded-md w-[16rem] text-black"
            list="coinlist"
          />
          <input
            type="submit"
            className="bg-orange-400 cursor-pointer text-white rounded-md h-[1.5rem] px-2 ml-[-4.4rem] "
          />

          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name}></option>
            ))}
          </datalist>
        </form>
      </div>

      {/* Table */}
      <div className="w-[80%] mx-auto bg-[#00171F] rounded-lg py-2 text-white font-medium">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Coin</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">24Hr Change</th>
                <th className="px-4 py-2 text-right">MarketCap</th>
              </tr>
            </thead>

            {/* Data */}
            <tbody>
              {displayCoin?.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[#003459]">
                  {/* Rank */}
                  <td className="px-4 py-2 text-left text-sm md:text-base">
                    {item.market_cap_rank}
                  </td>

                  {/* Coin */}
                  <td className="px-4 py-2 flex items-center text-sm md:text-base">
                    <img src={item?.image} alt="Img" className="w-6 h-6 mr-2" />
                    <span>{item.name}</span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-2 text-sm md:text-base">
                    {currency.symbol}
                    {item.current_price}
                  </td>

                  {/* 24Hr Change */}
                  <td
                    className={`px-4 py-2 text-sm md:text-base ${
                      item.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    {item.price_change_percentage_24h}
                  </td>

                  {/* Market Cap */}
                  <td className="px-4 py-2 text-right text-sm md:text-base">
                    {currency.symbol}
                    {item.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div
className="flex flex-row justify-around border-spacing-6 border-b p-4"
key={index}
>
<p className="flex justify-start">{item.market_cap_rank}</p>
<div className="flex flex-row gap-1 justify-start">
  <img src={item?.image} className="w-8 h-8 mx-auto" />
  <p>{item.name}</p>
</div>
<p>{item.current_price}</p>
<p
  className={`font-semibold ${
    item.price_change_percentage_24h >= 0
      ? "text-green-500"
      : "text-red-500"
  }`}
>
  {item.price_change_percentage_24h}
</p>
<p className="text-end">{item.market_cap}</p>
</div> */
}
