import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSession } from "hooks/sessions";
import { withTargetValue } from "utils/events";

const CreateSession = () => {
  const create = useCreateSession();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const onCreate = () => {
    setCreating(true);
    create({ title }).then((session) => navigate(`/${session.id}`));
  };

  return (
    <div className="mb-4">
      <h3 className="w-full text-4xl text-gray-500 font-bold mb-4">
        create session.
      </h3>
      <div className="flex justify-between space-x-4">
        <input
          value={title}
          onChange={withTargetValue<string>(setTitle)}
          placeholder="Title"
          className="flex-1 rounded-full shadow-md py-2 px-4 text-red-500 font-bold border-2 border-red-400 focus:ring-none hover:border-red-500 focus:outline-none focus:border-red-500"
        />

        <button
          disabled={title.length < 3 || title.length > 64 || creating}
          className="rounded-full shadow-md py-2 px-4 bg-white text-red-400 font-bold border-2 border-red-400 disabled:opacity-50 hover:border-red-500 hover:text-red-500 "
          onClick={onCreate}
        >
          Create Session
        </button>
      </div>
      <span className="text-xs text-gray-400 pl-2">minimum 3 characters</span>
    </div>
  );
};

export default CreateSession;
