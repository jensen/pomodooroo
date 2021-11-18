import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSessions } from "hooks/sessions";

const ListSessions = () => {
  const navigate = useNavigate();
  const sessions = useSessions();

  return (
    <div className="mb-4">
      <h3 className="w-full text-4xl text-gray-500 font-bold mb-4">
        sessions.
      </h3>
      <ul className="flex flex-col space-y-2">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="group px-6 py-5 max-w-full border border-red-500 border-opacity-25 cursor-pointer rounded-lg select-none space-y-1 bg-red-50 hover:bg-white hover:shadow-lg hover:border-transparent"
            onClick={() => navigate(`/${session.id}/details`)}
          >
            <div className="font-bold text-red-600 group-hover:text-gray-900">
              {session.title}
            </div>
            <div className="font-light text-red-600 group-hover:text-gray-500">
              {format(new Date(session.created_at), "MMMM do, hh:mmaa")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSessions;
