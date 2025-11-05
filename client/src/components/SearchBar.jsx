import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full space-x-2">
      <div className="relative grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for high-resolution images..."
          className="pl-10"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
