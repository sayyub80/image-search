import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, History, Search, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const HeroSection = ({ isAuthenticated }) => {
  const targetUrl = isAuthenticated ? "/dashboard" : "/login";
  const buttonText = isAuthenticated
    ? "Go to Dashboard"
    : "Get Started For Free";

  return (
    <div className="text-center py-20">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        Find Your Next Image. <span className="text-primary">Instantly.</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        Our app harnesses the power of the Unsplash API to bring you stunning,
        high-resolution images in seconds.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link to={targetUrl}>
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

const FeatureSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <FeatureCard
      icon={<Search className="h-8 w-8 text-primary" />}
      title="Powerful Search"
      description="Tap into the entire Unsplash library with any search term."
    />
    <FeatureCard
      icon={<History className="h-8 w-8 text-primary" />}
      title="Search History"
      description="We save your past searches so you can easily find them again."
    />
    <FeatureCard
      icon={<Star className="h-8 w-8 text-primary" />}
      title="Top Searches"
      description="See what's trending and discover new images."
    />
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <Card>
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className="p-4 bg-primary/10 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Homepage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-24">
      <HeroSection isAuthenticated={isAuthenticated} />
      <FeatureSection />
      <div className="pb-20" />
    </div>
  );
};

export default Homepage;
