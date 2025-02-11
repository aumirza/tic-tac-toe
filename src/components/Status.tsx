import { getPlayerIcon } from "../utils/playerIcon";

export function Status({ player }: { player: IPlayer }) {
  return (
    <div className="status">
      Player:
      <img src={getPlayerIcon(player)} alt="" />
    </div>
  );
}
