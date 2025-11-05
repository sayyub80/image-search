import React, { useState, useEffect } from "react";
import { getSearchHistory } from "../api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SearchHistory = ({ searchCount }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data } = await getSearchHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [searchCount]);

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Your Search History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : history.length === 0 ? (
          <p className="text-sm text-muted-foreground">No searches yet.</p>
        ) : (
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {history.map((item) => (
              <li key={item._id} className="pb-2 border-b border-border/50">
                <span className="text-sm font-medium">{item.term}</span>
                <span className="block text-xs text-muted-foreground mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchHistory;
