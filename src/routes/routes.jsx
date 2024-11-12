import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./publicroutes";
import PrivateRoutes from "./privateroutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoutes/>} />
        <Route path="/dashboard/*" element={<PrivateRoutes />} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
