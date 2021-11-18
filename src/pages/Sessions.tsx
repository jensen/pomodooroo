import React from "react";
import { LoadingBoundary } from "components/common";
import CreateSession from "components/CreateSession";

const ListSessions = React.lazy(() => import("components/ListSessions"));

const Sessions = () => {
  return (
    <>
      <CreateSession />
      <h3 className="w-full text-4xl text-gray-500 font-bold mb-4">
        sessions.
      </h3>
      <LoadingBoundary>
        <ListSessions />
      </LoadingBoundary>
    </>
  );
};

export default Sessions;
