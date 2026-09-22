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
import CreateApplicationDialog from "./CreateApplicationDialog";

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
              <button className="...">Login</button>
              <button className="...">Register</button>
            </>
          )}

          {token && (
            <div className="flex items-center gap-3">
              <CreateApplicationDialog />
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4">
                  <span>Account</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-40">
                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
