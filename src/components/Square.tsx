import { getPlayerIcon } from "../utils/playerIcon";

interface SquareProps {
  player: IPlayer;
  onClick: () => void;
  highlight?: boolean;
}

export function Square({ player, onClick, highlight }: SquareProps) {
  const icon = getPlayerIcon(player);
  return (
    <div className={`square ${highlight ? "highlight" : ""}`} onClick={onClick}>
      <img src={icon} alt="" />
    </div>
  );
}
