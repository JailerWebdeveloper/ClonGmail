// PrivateRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "../modules/private/pages/dashboard";
import Layout from "../modules/private/layouts/layout";
import PrivateRoute from "../Services/PrivateRoute";


const PrivateRoutes = () => (
  <Routes>
  <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
    <Route index element={<Dashboard/>} />
  </Route>
</Routes>
);

export default PrivateRoutes;
