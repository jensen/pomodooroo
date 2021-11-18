import { useSession } from "hooks/sessions";
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";

interface IRecoveredSession {
  totalDuration: string;
  totalPauses: number;
  totalPauseDuration: number;
  cycles: number;
}

const generateSession = (events: IEventResource[]): IRecoveredSession => {
  const list = [...events].sort(byDate);
  const cycles = list.filter((event) => event.type === "ACTIVE").length;

  const firstEvent = list[0];
  const lastEvent = list[events.length - 1];

  const totalPauses = list.filter((event) => event.type === "PAUSE").length;
  const totalPauseDuration = list.reduce((duration, event, index, list) => {
    if (event.type === "PAUSE") {
      const next = list.slice(index).find((event) => event.type === "RESUME");

      if (!next) return duration;

      return duration + next.duration - event.duration;
    }

    return duration;
  }, 0);

  return {
    totalDuration: formatDistance(
      new Date(lastEvent.created_at),
      new Date(firstEvent.created_at)
    ),
    totalPauses,
    totalPauseDuration,
    cycles,
  };
};

const byDate = (a: IEventResource, b: IEventResource) =>
  new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

interface ISessionDetailsProps {
  totalDuration: string;
  cycles: number;
  totalPauses: number;
  totalPauseDuration: number;
}

const SessionDetails = (props: ISessionDetailsProps) => {
  return (
    <>
      <p className="my-4 text-lg">
        {"The entire session lasted "}
        <span className="font-bold">{props.totalDuration}</span>
        {"."}
      </p>
      <p className="text-sm text-gray-500">
        {`It consisted of ${props.cycles} Working/Break cycle${
          props.cycles > 1 ? "s" : ""
        }.`}
      </p>
      <p className="text-sm text-gray-500">
        {props.totalPauses > 0
          ? `Pause was used ${props.totalPauses} times, lasting a total of ${props.totalPauseDuration} seconds.`
          : "No pauses used. Pure focus!"}
      </p>
    </>
  );
};

interface ICompleteSessionProps {
  id: string;
}

const CompleteSession = (props: ICompleteSessionProps) => {
  const navigate = useNavigate();
  const session = useSession(props.id);

  if (!session) throw new Error("Must choose session");

  const sessionDetails =
    session.events.length > 0 ? generateSession(session.events) : null;

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h3 className="text-4xl text-gray-500 mt-8">{session.title}</h3>
      {sessionDetails && <SessionDetails {...sessionDetails} />}
      <button
        className="mt-4 w-48 rounded-full shadow-md py-2 px-4 bg-white text-red-400 font-bold border-2 border-red-400 disabled:opacity-50 hover:border-red-500 hover:text-red-500 "
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
};

export default CompleteSession;
