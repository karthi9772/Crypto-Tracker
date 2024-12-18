import { createContext, useEffect, useState } from "react";

// Creating the context
export const coinContext = createContext();

// CoinContextProvider Component
const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]); // State for coins
  const [currency, setCurrency] = useState({
    name: "inr", // Default currency name
    symbol: "₹", // Default currency symbol
  });

  // Function to fetch coins data from API
  const fetchAllCoin = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-aAH7aYN51uYFGsGVz61EfYhm	",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setAllCoin(json))
      .catch((err) => console.error(err));
  };

  // Fetch coins whenever the currency changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  return (
    <coinContext.Provider value={{ allCoin, currency, setCurrency }}>
      {props.children} {/* Ensure this wraps your app or other components */}
    </coinContext.Provider>
  );
};

export default CoinContextProvider;
