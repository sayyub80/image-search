import React, { useState, useEffect } from "react";
import { getTopSearches } from "../api/api";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const TopSearches = ({ onSearch }) => {
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSearches = async () => {
      setLoading(true);
      try {
        const { data } = await getTopSearches();
        setTopSearches(data);
      } catch (error) {
        console.error("Failed to fetch top searches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopSearches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Top Searches:
        </span>
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Top Searches:
      </span>
      {topSearches.map((item) => (
        <Badge
          key={item._id}
          variant="secondary"
          onClick={() => onSearch(item._id)}
          className="cursor-pointer hover:bg-accent"
        >
          {item._id}
        </Badge>
      ))}
    </div>
  );
};

export default TopSearches;
