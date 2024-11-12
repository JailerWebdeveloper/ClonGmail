// PublicRoutes.jsx
import { Routes, Route } from "react-router-dom";
import LayoutPublic from "../modules/public/layout/layoutPublic";
import Home from "../modules/public/pages/home";
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";



const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPublic />}>
        <Route index element={<Home/>} />
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register/>}/>
       </Route>

    </Routes>
  );
};

export default PublicRoutes;
