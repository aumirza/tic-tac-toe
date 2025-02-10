import { useContext } from "preact/hooks";
import { AudioContext } from "../contexts/audioContext";

export const useAudio = () => {
  return useContext(AudioContext);
};
