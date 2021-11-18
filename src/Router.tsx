import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "pages/index";
import Sessions from "pages/Sessions";
import Session from "pages/Session";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Sessions />} />
          <Route path=":id/*" element={<Session />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
