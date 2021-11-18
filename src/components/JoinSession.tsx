import { useNavigate } from "react-router-dom";

interface IJoinSessionProps {
  sessionId: string;
}

const JoinSession = (props: IJoinSessionProps) => {
  const navigate = useNavigate();

  return (
    <button
      className="rounded-full py-2 px-4 text-blue-400 font-bold border-2 border-blue-400"
      onClick={() => navigate(`/${props.sessionId}`)}
    >
      Join
    </button>
  );
};

export default JoinSession;
