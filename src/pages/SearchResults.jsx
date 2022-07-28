import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Box from "../components/Box";

export default function SearchResults() {
  // Create state
  const [coins, setCoins] = useState([]);
  const [query, setQuery] = useState("");

  // Search change
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Submit function
  const handleSubmit = async (e) => {
    e?.preventDefault();
    // Fetch all Coins from Search
    const res2 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    const coins = res2.data;

    // coins = all 60 coins
    // query = what they're searching for

    // User the .filter method to find matching coins to their search
    const filteredCoins = coins.filter((coin) => {
      return (
        query.length > 0 &&
        coin.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    });

    console.log({ filteredCoins });

    setCoins(filteredCoins);
  };

  // Fetch coins on component mount
  useEffect(() => {
    handleSubmit();
  }, []);
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  });

  let formattedCoin = formatter.format(coins);
  // Render html
  return (
    <main>
      <div className="width">
        <div className="search-box">
          <h2>Search for a coin</h2>
          <form onSubmit={handleSubmit}>
            <input
              value={query}
              onChange={handleSearchChange}
              type="search"
              placeholder="Search for a coin"
            />
            <button className="button" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="width">
        <div className="coinreturn">
          {coins.map((coin) => {
            return (
              <div key={coin.id}>
                <img src={coin.image} alt="cryptocurreny" />
                <h2>
                  {coin.name}
                  <br />
                </h2>{" "}
                <h3>Current Price: ${coin.current_price}</h3>
                <h4>Market Cap:{coin.market_cap}</h4>
                <button>Add to Watchlist</button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
