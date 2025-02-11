import { getPlayerIcon } from "../utils/playerIcon";

export function Status({ player }: { player: IPlayer }) {
  return (
    <div className="status">
      <span>Current Player:&nbsp;</span>
      <img src={getPlayerIcon(player)} alt="" />
    </div>
  );
}
