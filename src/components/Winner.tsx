import { getPlayerIcon } from "../utils/playerIcon";

interface WinnerProps {
  winner: IPlayer;
  isMulti: boolean;
  onReset: () => void;
}

export function Winner({ isMulti, winner, onReset }: WinnerProps) {
  return (
    <div className="winner">
      <h3>
        {isMulti
          ? winner
            ? "Winner"
            : "Draw"
          : new Map([
              [1, "Winner"],
              [0, "Draw"],
              [-1, "Looser"],
            ]).get(winner) || ""}
      </h3>

      <div className="winner-player">
        {isMulti && winner ? (
          <span>
            Player <img src={getPlayerIcon(winner)} alt="" /> Won
          </span>
        ) : (
          ""
        )}

        {!winner ? <span>Its draw</span> : ""}
      </div>
      <button onClick={onReset} className="again-button">
        <span>Play Again</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-rotate-ccw"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
}
