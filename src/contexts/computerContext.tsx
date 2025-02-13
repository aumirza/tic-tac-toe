import { createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { aiMove, createModel, trainModel } from "../utils/ai";
import { Sequential } from "@tensorflow/tfjs";
import { minimaxMove } from "../utils/miniMax";
import { ReactElement } from "preact/compat";
import { randomMove } from "../utils/random";

interface IComputerContext {
  bestMove: (board: IBoard) => Promise<IBoardCord | null>;
  onGameEnd: (winner: IPlayer) => void;
}

export const ComputerContext = createContext<IComputerContext>({
  bestMove: async () => null,
  onGameEnd: () => {},
});

export const ComputerProvider = ({ children }: { children: ReactElement }) => {
  const [model, setModel] = useState<Sequential | null>(null);
  const [isAiTrained, setIsAiTrained] = useState(false);
  const [gameHistory, setGameHistory] = useState<
    { board: number[]; move: number; reward?: number }[]
  >([]);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    setModel(createModel());
  }, []);

  const bestMove = async (board: IBoard) => {
    const flatBoard = board.flat();
    let moveIndex: number | null;

    if (!isAiTrained || !model) {
      moveIndex =
        Math.random() < 0.2 ? randomMove(flatBoard) : minimaxMove(flatBoard);
    } else {
      moveIndex =
        Math.random() < 0.3
          ? minimaxMove(flatBoard)
          : await aiMove(model, flatBoard);
    }

    if (moveIndex !== null) {
      setGameHistory((prev) => [
        ...prev,
        { board: [...flatBoard], move: moveIndex }, // Store move history
      ]);
    }

    return moveIndex !== null
      ? ([Math.floor(moveIndex / 3), moveIndex % 3] as IBoardCord)
      : null;
  };

  const onGameEnd = async (winner: IPlayer) => {
    const reward = winner === 1 ? 1 : winner === -1 ? -1 : 0.5;

    // Assign reward to all moves in this game
    const updatedHistory = gameHistory.map((entry) => ({
      ...entry,
      reward,
    }));

    if (model) await trainModel(model, updatedHistory);

    setGameHistory([]); // Clear history for next game
    setGamesPlayed((prev) => prev + 1);

    if (gamesPlayed >= 10) {
      setIsAiTrained(true); // Enable AI after 10 games
    }
  };

  return (
    <ComputerContext.Provider value={{ bestMove, onGameEnd }}>
      {children}
    </ComputerContext.Provider>
  );
};
