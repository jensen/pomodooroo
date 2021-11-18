import classnames from "classnames";
import useTimer from "../hooks/useTimer";

interface IControlButton {}

const ControlButton = (props) => {
  return (
    <button
      className="rounded-full px-8 py-2 bg-red-400 text-white disabled:opacity-50"
      {...props}
    >
      {props.children}
    </button>
  );
};

interface IControlPanelProps {}

const ControlPanel = ({ toggle, matches, reset }: IControlPanelProps) => {
  return (
    <div className="w-full mt-4 flex justify-center space-x-8">
      {(matches("idle") || matches("start")) && (
        <ControlButton disabled={matches("start")} onClick={toggle}>
          Start
        </ControlButton>
      )}
      {(matches("active.running") || matches("break.running")) && (
        <ControlButton onClick={toggle}>Pause</ControlButton>
      )}
      {(matches("active.paused") || matches("break.paused")) && (
        <ControlButton onClick={toggle}>Resume</ControlButton>
      )}
      {(matches("active") || matches("break")) && (
        <ControlButton onClick={reset}>Reset</ControlButton>
      )}
    </div>
  );
};

interface ICyclesProps {
  cycle: number;
  matches: (value: string) => void;
}

const Cycles = (props: ICyclesProps) => {
  return (
    <ul className="flex space-x-2">
      {Array.from(new Array(props.cycle + 1)).map((_, index) => (
        <li
          key={index}
          className={classnames("flex flex-col rounded-full border-8", {
            "bg-red-400 border-red-400": props.cycle === index,
            "bg-red-100 border-red-200": props.cycle > index,
          })}
        >
          <div
            className={classnames("rounded-full", {
              "bg-white": props.cycle === index && props.matches("active"),
            })}
          >
            &nbsp;
          </div>
          <div
            className={classnames("px-2 py-1 font-bold", {
              "text-white": props.cycle === index,
              "text-red-200": props.cycle > index,
            })}
          >
            {index + 1}
          </div>
          <div
            className={classnames("rounded-full", {
              "bg-white": props.cycle === index && props.matches("break"),
            })}
          >
            &nbsp;
          </div>
        </li>
      ))}
    </ul>
  );
};

interface ITimerProps {
  sessionId: string;
}

const Timer = (props: ITimerProps) => {
  const timer = useTimer(props.sessionId);

  const { time } = timer;

  return (
    <>
      <Cycles {...timer} />
      <div
        className={classnames(
          "w-64 h-64 rounded-full shadow-md border-4 border-red-500",
          "flex justify-center items-center",
          "text-6xl font-bold text-red-500",
          "timer",
          "mt-4"
        )}
      >
        {time}
      </div>
      <ControlPanel {...timer} />
    </>
  );
};

export default Timer;
