import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image as ImageIcon, Github, Facebook } from "lucide-react";

const GoogleIcon = () => (
  <svg
    className="mr-2 h-4 w-4"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-67.7 67.7C318.5 102.3 285.3 88 248 88c-88.3 0-160 71.7-160 160s71.7 160 160 160c94.4 0 151.3-64.4 156.4-98.2H248v-66.6h239.6c2.6 14.7 4.4 30.2 4.4 46.6z"
    ></path>
  </svg>
);

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <Card className="w-full max-w-md border-border/60">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <ImageIcon className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold tracking-tight">
              Image Search
            </span>
          </div>
          <CardTitle className="text-2xl">Log in to your account</CardTitle>
          <CardDescription>Choose a provider to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full" variant="outline">
            <a href="/auth/google">
              <GoogleIcon /> Login with Google
            </a>
          </Button>
          <Button
            asChild
            className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
          >
            <a href="/auth/facebook">
              <Facebook className="mr-2 h-4 w-4" /> Login with Facebook
            </a>
          </Button>
          <Button
            asChild
            className="w-full bg-[#333] hover:bg-[#333]/90 text-white"
          >
            <a href="/auth/github">
              <Github className="mr-2 h-4 w-4" /> Login with GitHub
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
