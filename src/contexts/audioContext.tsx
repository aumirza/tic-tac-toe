import { createContext } from "preact";
import { ReactElement, useEffect, useState, useRef } from "preact/compat";
import { Howl } from "howler";

interface IAudioContext {
  soundEnabled: boolean;
  musicEnabled: boolean;
  playClickAudio: () => void;
  playWinAudio: () => void;
  toggleSound: () => void;
  toggleMusic: () => void;
}

export const AudioContext = createContext<IAudioContext>({
  soundEnabled: true,
  musicEnabled: true,
  playClickAudio: () => {},
  playWinAudio: () => {},
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

  // Store Howl instances in refs so they persist across renders
  const clickAudioRef = useRef(new Howl({ src: ["/click.mp3"], volume: 1 }));

  const bgMusicRef = useRef(
    new Howl({ src: ["/background.mp3"], loop: true, volume: 0.5 })
  );

  const winSoundRef = useRef(new Howl({ src: ["/win.mp3"], volume: 1 }));

  const playWinAudio = () => {
    if (!soundEnabled) return;
    bgMusicRef.current.pause();
    winSoundRef.current.play();

    winSoundRef.current.on("end", () => {
      if (musicEnabled) {
        setTimeout(() => {
          bgMusicRef.current.play();
        }, 1000);
      }
    });
  };

  const playClickAudio = () => {
    if (!soundEnabled) return;
    clickAudioRef.current.play();
  };

  useEffect(() => {
    if (musicEnabled) {
      bgMusicRef.current.play();
    } else {
      bgMusicRef.current.stop();
    }

    return () => bgMusicRef.current.stop();
  }, [musicEnabled]);

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        musicEnabled,
        playClickAudio,
        playWinAudio,
        toggleSound,
        toggleMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
