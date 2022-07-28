import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Box from "./Box";

export default function TopCoins() {
  // Create state
  const [coins, setCoins] = useState([]);
  const [btc, setBtc] = useState([]);

  // Fetch coins on component mount
  useEffect(() => {
    fetchTopCoins();
  }, []);

  // Function to fetch coins
  const fetchTopCoins = async () => {
    // Fetch bitcoin price
    const res1 = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );

    // Fetch trending coins
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending"
    );

    const btc = res1.data.bitcoin.usd;
    setBtc(btc);

    const coins = res.data.coins;
    setCoins(coins);
  };

  function btcConverter(coinPriceInBTC, currentBTCPrice) {
    // .00001, 210000
    let total = coinPriceInBTC * currentBTCPrice;

    // Create our number formatter.
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
    });

    let formattedTotal = formatter.format(total); /* $2,500.00 */

    return formattedTotal;
  }

  // Render html
  return (
    <div className="width">
      <div className="top-coins">
        <h2>Top Trending Coins</h2>
        <div className="top-coins-grid">
          {coins.map((coin) => {
            return (
              <Box className="top-coin">
                <h3>{coin.item.name}</h3>
                <p>{btcConverter(coin.item.price_btc, btc)}</p>
              </Box>
            );
          })}
        </div>
      </div>
    </div>
  );
}
