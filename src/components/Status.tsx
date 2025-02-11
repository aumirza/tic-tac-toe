import { getPlayerIcon } from "../utils/playerIcon";
import rotate from "../assets/rotate-ccw.svg";

export function Status({
  player,
  isMulti,
}: {
  player: IPlayer;
  isMulti: boolean;
}) {
  return (
    <div className="status">
      <span>Current Player:&nbsp;</span>
      {!isMulti && player === -1 ? (
        <img className="rotate" src={rotate} alt="" />
      ) : (
        <img src={getPlayerIcon(player)} alt="" />
      )}
    </div>
  );
}
