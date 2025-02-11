import { createContext } from "preact";
import { ReactElement, useEffect, useState, useRef } from "preact/compat";
import { Howl } from "howler";

import clickSound from "../assets/click.mp3";
import backgroundMusic from "../assets/background.mp3";
import winSound from "../assets/win.mp3";
import looseSound from "../assets/loose.mp3";
import drawSound from "../assets/draw.mp3";

interface IAudioContext {
  soundEnabled: boolean;
  musicEnabled: boolean;
  playClickAudio: () => void;
  playLooseAudio: () => void;
  playDrawSound: () => void;
  playWinAudio: () => void;
  toggleSound: () => void;
  toggleMusic: () => void;
}

export const AudioContext = createContext<IAudioContext>({
  soundEnabled: true,
  musicEnabled: true,
  playClickAudio: () => {},
  playWinAudio: () => {},
  playLooseAudio: () => {},
  playDrawSound: () => {},
  toggleSound: () => {},
  toggleMusic: () => {},
});

export const AudioProvider = ({ children }: { children: ReactElement }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);

  const toggleMusic = () => {
    setMusicEnabled((prev) => !prev);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const clickAudioRef = useRef<Howl | null>(null);
  const bgMusicRef = useRef<Howl | null>(null);
  const winSoundRef = useRef<Howl | null>(null);
  const looseSoundRef = useRef<Howl | null>(null);
  const drawSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    clickAudioRef.current = new Howl({ src: [clickSound], volume: 1 });
    bgMusicRef.current = new Howl({
      src: [backgroundMusic],
      loop: true,
      volume: 0.5,
    });
    winSoundRef.current = new Howl({ src: [winSound], volume: 1 });
    looseSoundRef.current = new Howl({ src: [looseSound], volume: 1 });
    drawSoundRef.current = new Howl({ src: [drawSound], volume: 1 });
  }, []);

  const playLooseAudio = () => {
    if (!soundEnabled) return;
    bgMusicRef.current?.pause();
    looseSoundRef.current?.play();

    looseSoundRef.current?.on("end", () => {
      if (musicEnabled) {
        setTimeout(() => {
          bgMusicRef.current?.play();
        }, 1000);
      }
    });
  };

  const playDrawSound = () => {
    if (!soundEnabled) return;
    bgMusicRef.current?.pause();
    drawSoundRef.current?.play();

    drawSoundRef.current?.on("end", () => {
      if (musicEnabled) {
        setTimeout(() => {
          bgMusicRef.current?.play();
        }, 1000);
      }
    });
  };

  const playWinAudio = () => {
    if (!soundEnabled) return;
    bgMusicRef.current?.pause();
    winSoundRef.current?.play();

    winSoundRef.current?.on("end", () => {
      if (musicEnabled) {
        setTimeout(() => {
          bgMusicRef.current?.play();
        }, 1000);
      }
    });
  };

  const playClickAudio = () => {
    if (!soundEnabled) return;
    clickAudioRef.current?.play();
  };

  useEffect(() => {
    if (musicEnabled) {
      bgMusicRef.current?.play();
    } else {
      bgMusicRef.current?.stop();
    }

    return () => bgMusicRef.current?.stop();
  }, [musicEnabled]);

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        musicEnabled,
        playClickAudio,
        playWinAudio,
        playLooseAudio,
        playDrawSound,
        toggleSound,
        toggleMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
