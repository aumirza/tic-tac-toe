import xIcon from "../assets/x.svg";
import circleIcon from "../assets/circle.svg";

export const getPlayerIcon = (player: IPlayer) => {
  return player ? (player === 1 ? xIcon : circleIcon) : "";
};
