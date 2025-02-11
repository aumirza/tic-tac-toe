import { minimax } from "./miniMax";

const emptyCells = (board: IBoard) =>
  board
    .map((row, i) => row.map((cell, j) => (cell === 0 ? [i, j] : null)))
    .flat()
    .filter(Boolean) as [number, number][];

export const randomMove = (board: IBoard) => {
  const allEmptyCells = emptyCells(board);
  const randomIndex = Math.floor(Math.random() * allEmptyCells.length);
  return allEmptyCells[randomIndex];
};

export function bestMove(board: IBoard) {
  const flatBoard = board.flat();
  let bestScore = -Infinity;

  let moveIndex: number | null = null;

  flatBoard.forEach((cell, index) => {
    if (!cell) {
      const newBoard = [...flatBoard];
      newBoard[index] = -1;
      const score = minimax(newBoard, false);
      if (score > bestScore) {
        bestScore = score;
        moveIndex = index;
      }
    }
  });

  const index: [number, number] | null =
    moveIndex !== null
      ? [Math.floor(moveIndex / 3), moveIndex % 3] // Convert 1D index to [row, col]
      : null;

  return index;
}
