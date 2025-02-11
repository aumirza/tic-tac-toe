import { getPlayerIcon } from "../utils/playerIcon";

interface SquareProps {
  player: IPlayer;
  mark: IPlayer;
  onClick: () => void;
  highlight?: boolean;
}

export function Square({ mark, player, onClick, highlight }: SquareProps) {
  if (!mark) {
    const icon = getPlayerIcon(player);

    return (
      <div className="square" onClick={onClick}>
        <img className="faded-image" src={icon} alt="" />
      </div>
    );
  }

  const icon = getPlayerIcon(mark);
  return (
    <div className={`square ${highlight ? "highlight" : ""}`} onClick={onClick}>
      <img src={icon} alt="" />
    </div>
  );
}
