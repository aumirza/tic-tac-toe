import { useState, useImperativeHandle } from "preact/hooks";
import { Square } from "./Square";
import { forwardRef } from "preact/compat";

const emptyBoard = () =>
  new Array(3).fill(0).map(() => new Array(3).fill(0)) as IBoard;

interface BoardProps {
  onMark: (board: IBoard) => void;
  player: IPlayer;
  winningLine: IBoard;
}

export const Board = forwardRef<BoardHandle, BoardProps>(
  ({ onMark, player, winningLine }, ref) => {
    useImperativeHandle(ref, () => ({ resetBoard, computerMove }));

    const [board, setBoard] = useState<IBoard>(emptyBoard());

    const resetBoard = () => {
      setBoard(emptyBoard());
    };

    const emptyCells = () =>
      board
        .map((row, i) => row.map((cell, j) => (cell === 0 ? [i, j] : null)))
        .flat()
        .filter(Boolean) as [number, number][];

    const computerMove = () => {
      const allEmptyCells = emptyCells();
      const randomIndex = Math.floor(Math.random() * allEmptyCells.length);
      const [i, j] = emptyCells()[randomIndex];
      handleMark(i, j);
    };

    const handleMark = (i: number, j: number) => {
      if (board[i][j] !== 0) return;

      const newBoard = board.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((cell, colIndex) => (colIndex === j ? player : cell))
          : row
      );

      onMark(newBoard);
      setBoard(newBoard);
    };

    return (
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((col, j) => (
              <Square
                mark={col as IPlayer}
                player={player}
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
