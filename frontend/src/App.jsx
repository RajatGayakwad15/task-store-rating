import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Cookies from "js-cookie";

import AdminLayout from "./AdminPanelSetup/AdminPanel/AdminLayout.jsx";
import Clientlayout from "./AdminPanelSetup/ClientPanel/ClientLayout.jsx";
import Viewusersclient from "./AdminPanelSetup/ClientPanel/User/Viewusers.jsx";
import Home from "./pages/homepage/home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/signup.jsx";
import Viewstores from "./AdminPanelSetup/AdminPanel/Store/Viewstores.jsx";
import Viewusers from "./AdminPanelSetup/AdminPanel/User/Viewusers.jsx";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


function PublicLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Viewstores />} />
        <Route path="users" element={<Viewusers />} />
      </Route>
    </Routes>
  );
}

// Client Routes Layout
function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Clientlayout />}>
        <Route index element={<Viewusersclient />} />
      </Route>
    </Routes>
  );
}


function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  );
}


function AdminProtectedRoute() {
  const role = Cookies.get("userRole");
  console.log("role", typeof role);
  if (role  == 1) {
    return <AdminRoutes />;
  }
 
  return <Navigate to="/auth/login" replace />;
}

function StoreProtectedRoute() {
  const role = Cookies.get("userRole");
  if (role == 2) {
     return <ClientRoutes />;
  }
 
   return <Navigate to="/auth/login" replace />;
}


function App() {
  return (
    <Routes>
      
      <Route path="/admin/*" element={<AdminProtectedRoute />} />

      
      <Route path="/*" element={<PublicLayout />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    
      <Route path="/store/*" element={<StoreProtectedRoute />} />
    </Routes>
  );
}


export default function WrappedApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}
