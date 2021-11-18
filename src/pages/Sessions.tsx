import { LoadingBoundary } from "components/common";
import CreateSession from "components/CreateSession";
import ListSessions from "components/ListSessions";

const Sessions = () => {
  return (
    <>
      <LoadingBoundary>
        <ListSessions />
      </LoadingBoundary>
      <CreateSession />
    </>
  );
};

export default Sessions;
