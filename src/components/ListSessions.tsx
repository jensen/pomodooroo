import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { format } from "date-fns";
import { useSessions } from "hooks/sessions";
import { fetchSession } from "services/sessions";

const ListSessions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const sessions = useSessions();

  return (
    <div className="mb-4">
      <ul className="flex flex-col space-y-2">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="group px-6 py-5 max-w-full border border-red-500 border-opacity-25 cursor-pointer rounded-lg select-none space-y-1 bg-red-50 hover:bg-white hover:shadow-lg hover:border-transparent"
            onClick={() => navigate(`/${session.id}/details`)}
            onMouseOver={() =>
              queryClient.prefetchQuery(
                ["session", session.id],
                fetchSession(session.id) as any
              )
            }
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
