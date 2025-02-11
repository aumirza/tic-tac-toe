import { useRef, useState } from "preact/hooks";
import "../game.css";

import { checkWinner } from "../utils/checkWinner";
import { useAudio } from "../hooks/useAudio";
import { throwConfetti } from "../utils/confetti";
import { Board } from "./Board";
import { Controls } from "./Controls";
import { Winner } from "./Winner";
import { Status } from "./Status";

export function Game() {
  const [player, setPlayer] = useState<IPlayer>(1);
  const [winner, setWinner] = useState<IPlayer | null>(null);
  const [winningLine, setWinningLine] = useState<IBoard>([]);
  const [isMutli, setIsMulti] = useState(false);

  const boardRef = useRef<BoardHandle>(null);

  const { playClickAudio, playWinAudio } = useAudio();

  const resetGame = () => {
    setPlayer(1);
    setWinner(null);
    setWinningLine([]);
    boardRef.current?.resetBoard();
  };

  const togglePlayer = () => {
    setPlayer(player === 1 ? -1 : 1);
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
      celebrateWin();
      setWinner(result.winner as IPlayer);
      setWinningLine(result.line);
      return setPlayer(0);
    } else {
      setWinner(result.winner as IPlayer);
    }

    if (!isMutli && player === 1) {
      setTimeout(() => boardRef.current?.computerMove(), 500);
    }
    togglePlayer();
  };

  return (
    <div className="game">
      <Status player={player} />
      <Controls
        handleReset={resetGame}
        isMulti={isMutli}
        setItMulti={setIsMulti}
      />
      <div className="game-board">
        {winner !== null && <Winner winner={winner} onReset={resetGame} />}
        <Board
          ref={boardRef}
          player={player}
          onMark={onMark}
          winningLine={winningLine}
        />
      </div>
    </div>
  );
}
