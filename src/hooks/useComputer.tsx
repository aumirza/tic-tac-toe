import { useContext } from "preact/hooks";
import { ComputerContext } from "../contexts/computerContext";

export const useComputer = () => {
  return useContext(ComputerContext);
};
