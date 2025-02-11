export function checkWinner(board: IBoard) {
  const winPatterns = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ], // row 1
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ], // row 2
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ], // row 3
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ], // col 1
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ], // col 2
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ], // col 3
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ], // diagonal
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ], // anti-diagonal
  ];

  for (const pattern of winPatterns) {
    const [[ax, ay], [bx, by], [cx, cy]] = pattern;
    const value = board[ax][ay];

    if (!value) continue; // Skip empty cells
    if (value === board[bx][by] && value === board[cx][cy]) {
      return { winner: value, line: pattern, isTie: false };
    }
  }

  const isTie = board.flat().every((cell) => cell !== 0);
  if (isTie) return { winner: 0, line: [] };

  return { winner: null, line: [] };
}
