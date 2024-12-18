const Home = () => {
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
        <form className="mt-8">
          <input
            type="text"
            placeholder="Search crypto..."
            className="h-[2rem] p-2 rounded-md w-[16rem] text-black"
          />
          <input
            type="submit"
            className="bg-orange-400 cursor-pointer text-yellow-100 rounded-md h-[1.5rem] px-2 ml-[-4.4rem] "
          />
        </form>
      </div>

      {/* Table */}
      <div className="w-[80%] mx-auto bg-orange-400 rounded-lg py-2 text-yellow-100 font-medium">
        <div className="flex flex-row justify-evenly">
          <p className="text-start">#</p>
          <p>Coin</p>
          <p>Price</p>
          <p>24H Change</p>
          <p className="text-end">Market Cap</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
