import { getPlayerIcon } from "../utils/playerIcon";

interface SquareProps {
  player: IPlayer;
  mark: IPlayer;
  disabled: boolean;
  onClick: () => void;
  highlight?: boolean;
}

export function Square({
  disabled,
  mark,
  player,
  onClick,
  highlight,
}: SquareProps) {
  const clickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  if (!mark) {
    const icon = getPlayerIcon(player);

    return (
      <div className="square" onClick={clickHandler}>
        <img className="faded-image" src={icon} alt="" />
      </div>
    );
  }

  const icon = getPlayerIcon(mark);
  return (
    <div className={`square ${highlight ? "highlight" : ""}`}>
      <img src={icon} alt="" />
    </div>
  );
}
