import { useState, useImperativeHandle } from "preact/hooks";
import { Square } from "./Square";
import { forwardRef } from "preact/compat";

const emptyBoard = JSON.parse(
  JSON.stringify(new Array(3).fill(0).map(() => new Array(3).fill(0)))
) as IBoard;

interface BoardProps {
  onMark: (board: IBoard) => void;
  player: IPlayer;
  winningLine: IBoard;
}

export const Board = forwardRef<BoardHandle, BoardProps>(
  ({ onMark, player, winningLine }, ref) => {
    const [board, setBoard] = useState<IBoard>(emptyBoard);

    const resetBoard = () => {
      setBoard(emptyBoard);
    };
    useImperativeHandle(ref, () => ({ resetBoard }));

    const handleMark = (i: number, j: number) => {
      if (board[i][j] !== 0) return;

      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[i][j] = player;
      setBoard(newBoard);
      onMark(newBoard);
    };

    return (
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((col, j) => (
              <Square
                player={col as IPlayer}
                onClick={() => handleMark(i, j)}
                key={i + "" + j}
                highlight={winningLine.some(([x, y]) => x === i && y === j)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);
