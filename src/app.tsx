import { Game } from "./components/Game";
import { AudioProvider } from "./contexts/audioContext";
import "./style.css";

export function App() {
  return (
    <AudioProvider>
      <div className="app-wrapper">
        <header className="app-header">
          <h1 className="app-title text-2xl md:text-3xl font-bold">
            Yet Another Tic Tac Toe
          </h1>
        </header>

        <main className="app-main">
          <Game />
        </main>

        <footer className="app-footer">
          <p>
            Created with <span className="heart-icon">❤️</span>{" "}
            <a href="https://ahamdullah.in">Ahmadullah mirza</a>
          </p>
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </footer>
      </div>
    </AudioProvider>
  );
}
