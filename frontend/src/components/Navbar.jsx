// components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authApi.logout();
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="relative bg-surface text-text-primary flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="left font-bold text-2xl">Jobtrack</div>
        <div className="right">
          {!token && (
            <>
              <button
                className="border border-primary text-primary px-4 py-2 rounded-md font-medium mr-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md font-medium"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}

          {token && (
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4">
                <span>Account</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" className="w-40">
                {/* The items inside the dropdown */}
                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  {/* Each clickable item */}
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
