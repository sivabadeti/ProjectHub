import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Datasets from "./pages/Datasets";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CustomerService from "./pages/CustomerService";
import FindTeammates from "./pages/FindTeammates";
import About from "./pages/about";
import LoginRequired from "./pages/LoginRequired";


function App() {

  const location = useLocation();

  const isProfilepage =
    location.pathname === "/profile";


  return (
    <>
      {!isProfilepage && <Navbar />}

      <Routes>

        {/* =========================================
            PUBLIC PAGES
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/customer-service"
          element={<CustomerService />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login-required"
          element={<LoginRequired />}
        />


        {/* =========================================
            PROTECTED PAGES
        ========================================= */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />


        <Route
          path="/datasets"
          element={
            <ProtectedRoute>
              <Datasets />
            </ProtectedRoute>
          }
        />


        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <FindTeammates />
            </ProtectedRoute>
          }
        />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}


export default App;