import React, { useContext } from "react";
import { coinContext } from "../context/coinContext";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import arrow from "../assets/arrow_icon.png";

const Navbar = () => {
  const { setCurrency, currency } = useContext(coinContext);

  const handleChange = (event) => {
    const selectedCurrency = event.target.value;

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
      // default:
      //   setCurrency({ name: "usd", symbol: "$" });
      //   break;
    }
  };

  return (
    <div className="w-full h-fit p-3 flex flex-row justify-between gap-4 border-b-2">
      {/* Logo Section */}
      <div className="w-[20%]">
        <Link to="/">
          <img src={logo} className="h-fit w-fit" alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="w-[60%] mt-2">
        <ul className="flex flex-row gap-2 justify-evenly">
          <Link to="/">
            <li>Home</li>
          </Link>
          <li>Features</li>
          <li>Pricing</li>
          <li>Blog</li>
        </ul>
      </div>

      {/* Currency Selector */}
      <div className="px-2 w-[20%] flex justify-around">
        <select
          value={currency.name}
          onChange={handleChange}
          className="rounded-md mr-2"
        >
          <option value="inr">INR</option>
          <option value="usd">USD</option>
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
