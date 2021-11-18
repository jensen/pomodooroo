import { useParams, Routes, Route } from "react-router-dom";
import { LoadingBoundary } from "components/common";
import ActiveSession from "components/ActiveSession";
import CompleteSession from "components/CompleteSession";

const Session = () => {
  const { id } = useParams();

  if (!id) throw new Error("Must select session");

  return (
    <LoadingBoundary>
      <Routes>
        <Route path="" element={<ActiveSession id={id} />} />
        <Route path="details" element={<CompleteSession id={id} />} />
      </Routes>
    </LoadingBoundary>
  );
};

export default Session;
