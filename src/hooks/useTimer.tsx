import { usePomodoroMachine } from "../machines/pomodoro";

export interface IUseTimer {
  cycle: number;
  time?: string;
  toggle: () => void;
  reset: () => void;
  matches: (parentStateValue: string) => boolean;
}

const zeroPadding = (value: number) => (value < 10 ? `0${value}` : value);

const formatTime = (value: number) => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return `${zeroPadding(minutes)}:${zeroPadding(seconds)}`;
};

const useTimer = (sessionId: string): IUseTimer => {
  const [current, send] = usePomodoroMachine(sessionId);

  const toggle = () => send("TOGGLE");
  const reset = () => send("RESET");

  if (current.matches("idle") === false) {
    const sessionDuration = current.context.duration;
    const timeElapsed = Math.round(
      current.context.currentTime - current.context.startedTime
    );

    return {
      cycle: current.context.cycle,
      time: formatTime(sessionDuration - timeElapsed),
      toggle,
      reset,
      matches: current.matches,
    };
  }

  return {
    cycle: current.context.cycle,
    toggle,
    reset,
    matches: current.matches,
  };
};

export default useTimer;
