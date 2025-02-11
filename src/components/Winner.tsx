import { getPlayerIcon } from "../utils/playerIcon";

interface WinnerProps {
  winner: IPlayer;
  onReset: () => void;
}

export default function Winner({ winner, onReset }: WinnerProps) {
  const src = getPlayerIcon(winner);
  return (
    <div className="winner">
      <h3>Winner</h3>
      <div className="winner-player">
        Player <img src={src} alt="" /> Won
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
