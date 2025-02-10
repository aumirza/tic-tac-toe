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
    const [a, b, c] = pattern;
    const value = board[a[0]][a[1]];

    if (
      value !== 0 &&
      value === board[b[0]][b[1]] &&
      value === board[c[0]][c[1]]
    ) {
      return { winner: value, line: pattern };
    }
  }

  return { winner: 0, line: [] };
}
