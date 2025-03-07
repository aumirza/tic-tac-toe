import { Game } from "./components/Game";
import { AudioProvider } from "./contexts/audioContext";
import { ComputerProvider } from "./contexts/computerContext";

import logo from "./assets/yet-another-tic-tac-toe.png";
import "./style.css";

export function App() {
  return (
    <AudioProvider>
      <ComputerProvider>
        <div className="app-wrapper">
          <header className="app-header">
            <img src={logo} alt="logo" className="app-logo" />
            <h1 className="app-title text-2xl md:text-3xl font-bold">
              Yet Another Tic Tac Toe
            </h1>
          </header>

          <main className="app-main">
            <Game />
          </main>

          <footer className="app-footer">
            <p>
              Created with <span className="heart-icon">❤️</span> by&nbsp;
              <a href="https://ahmadullah.in">Ahmadullah mirza</a>
            </p>
            <p>&copy; {new Date().getFullYear()} All rights reserved</p>
          </footer>
        </div>
      </ComputerProvider>
    </AudioProvider>
  );
}
