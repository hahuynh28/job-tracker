import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ApplicationProvider } from "./context/ApplicationContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ApplicationProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ApplicationProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
