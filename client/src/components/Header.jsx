import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image as ImageIcon } from "lucide-react"; // Icon for the logo

// Helper to get initials from a name
const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">Image Search</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <UserMenu user={user} onLogout={handleLogout} />
            </>
          ) : (
            <>
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const UserMenu = ({ user, onLogout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image} alt={user.displayName} />
          <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.displayName}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Header;
