const emptyCells = (board: number[]) =>
  board.map((cell, i) => (cell === 0 ? i : null)).filter(Boolean) as number[];

export const randomMove = (board: number[]) => {
  const allEmptyCells = emptyCells(board);
  if (allEmptyCells.length === 0) return null; // Handle case when no empty cells exist
  const randomIndex = Math.floor(Math.random() * allEmptyCells.length);
  return allEmptyCells[randomIndex];
};
