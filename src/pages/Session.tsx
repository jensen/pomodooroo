import { useParams, Routes, Route } from "react-router-dom";
import { LoadingBoundary } from "components/common";
import ActiveSession from "components/ActiveSession";
import CompleteSession from "components/CompleteSession";

const Session = () => {
  const { id } = useParams();

  if (!id) throw new Error("Must select session");

  return (
    <Routes>
      <Route
        path=""
        element={
          <LoadingBoundary>
            <ActiveSession id={id} />
          </LoadingBoundary>
        }
      />
      <Route
        path="details"
        element={
          <LoadingBoundary>
            <CompleteSession id={id} />
          </LoadingBoundary>
        }
      />
    </Routes>
  );
};

export default Session;
