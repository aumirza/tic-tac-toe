import { checkWinner } from "./checkWinner";

// TODO: add alpha beta pruning
export const minimax = (board: number[], isMaximizing: boolean) => {
  const twoDBoard: IBoard = Array.from({ length: 3 }, (_, i) =>
    board.slice(i * 3, i * 3 + 3)
  );
  const result = checkWinner(twoDBoard);
  if (result.winner === 1) return -10;
  if (result.winner === -1) return 10;
  if (!board.includes(0)) return 0;

  const scores: number[] = [];
  board.forEach((cell, index) => {
    if (cell === 0) {
      const newBoard = [...board];
      newBoard[index] = isMaximizing ? -1 : 1;
      scores.push(minimax(newBoard, !isMaximizing));
    }
  });

  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
};

export function minimaxMove(board: number[]) {
  let bestScore = -Infinity;

  let moveIndex: number | null = null;

  board.forEach((cell, index) => {
    if (!cell) {
      const newBoard = [...board];
      newBoard[index] = -1;
      const score = minimax(newBoard, false);
      if (score > bestScore) {
        bestScore = score;
        moveIndex = index;
      }
    }
  });

  return moveIndex;
}
