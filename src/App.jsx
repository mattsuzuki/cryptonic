import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import "./App.css";
import CryptoSecurtiy from "./components/CryptoSecurtiy";
import TopCoins from "./components/TopCoins";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <header className="header">
          <div className="width">
            <h1>Cryptonic</h1>

            <ul className="header-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search Coins</Link>
              </li>
              <li>
                <Link to="/trending">Trending</Link>
              </li>
              <li>
                <Link to="/storage">Resources</Link>
              </li>
            </ul>
          </div>
        </header>

        <Routes>
          <Route index element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/storage" element={<CryptoSecurtiy />} />
          <Route path="/trending" element={<TopCoins />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
