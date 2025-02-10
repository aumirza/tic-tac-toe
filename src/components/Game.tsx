import { useRef, useState } from "preact/hooks";
import "../game.css";

import { Board } from "../components/Board";
import { checkWinner } from "../utils/checkWinner";
import { Controls } from "../components/Controls";
import { useAudio } from "../hooks/useAudio";
import { getPlayerIcon } from "../utils/playerIcon";
import { celebrate } from "../utils/celebrate";

export function Game() {
  const [player, setPlayer] = useState<IPlayer>(1);
  const [winner, setWinner] = useState<IPlayer>(0);
  const [winningLine, setWinningLine] = useState<IBoard>([]);

  const boardRef = useRef<BoardHandle>(null);

  const { playClickAudio, playWinAudio } = useAudio();

  const resetGame = () => {
    setPlayer(1);
    setWinner(0);
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
    }
    togglePlayer();
  };

  return (
    <div className="game">
      <div className="status">
        Next player:
        <img src={getPlayerIcon(player)} alt="" />
      </div>
      <div className="winner status" style={winner ? { color: "green" } : {}}>
        Winner: <img src={getPlayerIcon(winner)} alt="" />
      </div>
      <Controls handleReset={resetGame} />
      <div className="game-board">
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
