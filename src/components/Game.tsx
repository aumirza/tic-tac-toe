import { useRef, useState } from "preact/hooks";
import "../game.css";

import { checkWinner } from "../utils/checkWinner";
import { useAudio } from "../hooks/useAudio";
import { throwConfetti } from "../utils/confetti";
import { Board } from "./Board";
import { Controls } from "./Controls";
import { Winner } from "./Winner";
import { Status } from "./Status";
import { useComputer } from "../hooks/useComputer";

export function Game() {
  const [player, setPlayer] = useState<IPlayer>(1);
  const [winner, setWinner] = useState<IPlayer | null>(null);
  const [winningLine, setWinningLine] = useState<IBoard>([]);
  const [isMulti, setIsMulti] = useState(false);

  const boardRef = useRef<BoardHandle>(null);
  const { onGameEnd } = useComputer();

  const { playClickAudio, playWinAudio, playLooseAudio, playDrawSound } =
    useAudio();

  const resetGame = () => {
    setPlayer(1);
    setWinner(null);
    setWinningLine([]);
    boardRef.current?.resetBoard();
  };

  const togglePlayer = () => {
    setPlayer((prev) => (prev === 1 ? -1 : 1));
  };

  const celebrateWin = () => {
    throwConfetti();
    playWinAudio();
  };

  const onMark = (board: IBoard) => {
    if (winner) return;
    playClickAudio();

    const result = checkWinner(board);
    if (result.winner) {
      if (!isMulti) {
        if (result.winner === -1) {
          playLooseAudio();
        } else {
          celebrateWin();
        }
        onGameEnd(result.winner as IPlayer);
      }

      setWinner(result.winner as IPlayer);
      setWinningLine(result.line);
      return setPlayer(0);
    } else if (result.winner === 0) {
      playDrawSound();
      if (!isMulti) onGameEnd(result.winner as IPlayer);
      return setWinner(0);
    }

    if (!isMulti && player === 1) {
      setTimeout(() => boardRef.current?.computerMove(), 500);
    }
    togglePlayer();
  };

  return (
    <div className="game">
      <Status player={player} isMulti={isMulti} />
      <Controls
        handleReset={resetGame}
        isMulti={isMulti}
        setItMulti={setIsMulti}
      />
      <div className="game-board">
        {winner !== null && (
          <Winner isMulti={isMulti} winner={winner} onReset={resetGame} />
        )}
        <Board
          isMulti={isMulti}
          ref={boardRef}
          player={player}
          onMark={onMark}
          winningLine={winningLine}
        />
      </div>
    </div>
  );
}
