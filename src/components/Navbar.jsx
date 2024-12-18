import React, { useContext } from "react";
import { coinContext } from "../context/coinContext"; // Import the coin context

import logo from "../assets/logo.png"; // Import logo
import arrow from "../assets/arrow_icon.png"; // Import arrow icon

const Navbar = () => {
  // Destructuring the context values
  const { setCurrency, currency } = useContext(coinContext);

  // Handle currency selection from dropdown
  const handleChange = (event) => {
    const selectedCurrency = event.target.value;

    // Update currency based on the selected option
    switch (selectedCurrency) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="w-full h-fit p-3 flex flex-row justify-between gap-4 border-b-2">
      {/* Logo Section */}
      <div className="w-[20%]">
        <img src={logo} className="h-fit w-fit" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <div className="w-[60%] mt-2">
        <ul className="flex flex-row gap-2 justify-evenly">
          <li>Home</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>Blog</li>
        </ul>
      </div>

      {/* Currency Selector */}
      <div className="px-2 w-[20%] flex justify-around">
        <select
          value={currency.name} // Bind the select value to the current currency
          onChange={handleChange} // Handle currency change
          className="rounded-md mr-2"
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>

        {/* Optional SignUp Button (commented out for now) */}
        {/* 
        <button className="bg-white rounded-lg">
          <h1 className="flex flex-row gap-1">
            <span>SignUp</span>
            <img className="h-fit w-fit mt-2" src={arrow} alt="Arrow Icon" />
          </h1>
        </button>
        */}
      </div>
    </div>
  );
};

export default Navbar;
