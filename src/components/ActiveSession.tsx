import { useSession } from "hooks/sessions";
import Timer from "components/Timer";

interface IActiveSessionProps {
  id: string;
}

const ActiveSession = (props: IActiveSessionProps) => {
  const session = useSession(props.id);

  if (!session) throw new Error("Must choose session");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Timer sessionId={session.id} />
      <h3 className="text-4xl text-gray-500 mt-8">{session.title}</h3>
    </div>
  );
};

export default ActiveSession;
