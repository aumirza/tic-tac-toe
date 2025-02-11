import { useAudio } from "../hooks/useAudio";

interface ControlsProps {
  isMulti: boolean;
  setItMulti: (isMulti: boolean) => void;
  handleReset: () => void;
}

export function Controls({ handleReset, isMulti, setItMulti }: ControlsProps) {
  const { soundEnabled, musicEnabled, toggleMusic, toggleSound } = useAudio();

  const toggleMulti = () => {
    setItMulti(!isMulti);
  };

  return (
    <div className="controls">
      <button className="audio-button" onClick={toggleSound}>
        {soundEnabled ? (
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
            class="lucide lucide-volume-2"
          >
            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
            <path d="M16 9a5 5 0 0 1 0 6" />
            <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
          </svg>
        ) : (
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
            class="lucide lucide-volume-off"
          >
            <path d="M16 9a5 5 0 0 1 .95 2.293" />
            <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
            <path d="m2 2 20 20" />
            <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" />
            <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
          </svg>
        )}
      </button>
      <button className="audio-button" onClick={toggleMusic}>
        {musicEnabled ? (
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
            class="lucide lucide-headphones"
          >
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
          </svg>
        ) : (
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
            class="lucide lucide-headphone-off"
          >
            <path d="M21 14h-1.343" />
            <path d="M9.128 3.47A9 9 0 0 1 21 12v3.343" />
            <path d="m2 2 20 20" />
            <path d="M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3" />
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364" />
          </svg>
        )}
      </button>
      <button onClick={handleReset} className="reset-button">
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
      <button
        className={`multi-button ${!isMulti ? "active" : ""}`}
        onClick={toggleMulti}
      >
        {isMulti ? "Multiplayer" : "computer"}
      </button>
    </div>
  );
}
