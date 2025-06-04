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

// Pages and Layouts
import Dashboard from "./AdminPanelSetup/AdminPanel/Dashboard/Dashboard.jsx";
import AdminLayout from "./AdminPanelSetup/AdminPanel/AdminLayout.jsx";
import Clientlayout from "./AdminPanelSetup/ClientPanel/ClientLayout.jsx";
import Dashboardclient from "./AdminPanelSetup/ClientPanel/Dashboard/Dashboard.jsx";
import Viewusersclient from "./AdminPanelSetup/ClientPanel/User/Viewusers.jsx";
import Home from "./pages/homepage/home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/signup.jsx";
import Viewstores from "./AdminPanelSetup/AdminPanel/Store/Viewstores.jsx";
import Viewusers from "./AdminPanelSetup/AdminPanel/User/Viewusers.jsx";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Routes (Homepage, etc.)
function PublicLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

// Admin Routes Layout
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Viewstores />} />
        <Route path="users" element={<Viewusers />} />
        {/* <Route path="stores" element={<Viewstores />} /> */}
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
        {/* <Route path="users" element={<Viewusersclient />} /> */}
      </Route>
    </Routes>
  );
}

// Auth Routes
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  );
}

// ✅ Admin Protected Route Wrapper
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

// Main App
function App() {
  return (
    <Routes>
      {/* Protected admin route */}
      <Route path="/admin/*" element={<AdminProtectedRoute />} />

      {/* Public and client routes */}
      <Route path="/*" element={<PublicLayout />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* <Route path="/store/*" element={<ClientRoutes />} /> */}
      <Route path="/store/*" element={<StoreProtectedRoute />} />
    </Routes>
  );
}

// Final Wrapper with BrowserRouter
export default function WrappedApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}
