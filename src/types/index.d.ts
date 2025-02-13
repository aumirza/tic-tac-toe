type IPlayer = 1 | 0 | -1;

type IBoard = number[][];
type IBoardCord = [number, number];

interface BoardHandle {
  resetBoard: () => void;
  computerMove: () => void;
}
