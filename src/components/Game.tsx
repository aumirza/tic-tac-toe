import { useRef, useState } from "preact/hooks";
import "../game.css";

import { Board } from "../components/Board";
import { checkWinner } from "../utils/checkWinner";
import { Controls } from "../components/Controls";
import { useAudio } from "../hooks/useAudio";
import { getPlayerIcon } from "../utils/playerIcon";
import { celebrate } from "../utils/celebrate";
import Winner from "./Winner";

export function Game() {
  const [player, setPlayer] = useState<IPlayer>(1);
  const [winner, setWinner] = useState<IPlayer | null>(null);
  const [winningLine, setWinningLine] = useState<IBoard>([]);

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

  const onMark = (board: IBoard) => {
    if (winner) return;
    playClickAudio();

    const result = checkWinner(board);
    if (result.winner) {
      celebrate();
      playWinAudio();
      setWinner(result.winner as IPlayer);
      setWinningLine(result.line);
      return setPlayer(0);
    } else {
      setWinner(result.winner as IPlayer);
    }

    togglePlayer();
  };

  return (
    <div className="game">
      <div className="status">
        Player:
        <img src={getPlayerIcon(player)} alt="" />
      </div>
      <Controls handleReset={resetGame} />
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
