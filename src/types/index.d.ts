type IPlayer = 1 | 0 | -1;

type IBoard = number[][];

interface BoardHandle {
  resetBoard: () => void;
  computerMove: () => void;
}
