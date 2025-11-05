import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import TopSearches from "../components/TopSearches";
import ImageGrid from "../components/ImageGrid";
import SearchHistory from "../components/SearchHistory";
import { postSearch } from "../api/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = async (term) => {
    if (!term) return;

    setLoading(true);
    setLastSearchTerm(term);
    setSelectedImages([]);

    try {
      const { data } = await postSearch(term);
      setSearchResults(data);
      setSearchCount((count) => count + 1);
      if (data.length === 0) {
        toast.info(`No images found for "${term}".`);
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search Failed", {
        description: error.message || "Could not fetch images.",
      });
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (image, isSelected) => {
    if (isSelected) {
      setSelectedImages((prev) => [...prev, image]);
    } else {
      setSelectedImages((prev) => prev.filter((img) => img.id !== image.id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <SearchBar onSearch={handleSearch} />
        <TopSearches onSearch={handleSearch} />

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {lastSearchTerm
              ? `Results for "${lastSearchTerm}"`
              : "Search Results"}
          </h2>

          {selectedImages.length > 0 && (
            <span className="font-medium text-primary">
              {selectedImages.length} selected
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <ImageGrid
            images={searchResults}
            onSelect={handleImageSelect}
            selectedImageIds={selectedImages.map((img) => img.id)}
          />
        )}
      </div>
      <div className="lg:col-span-1">
        <SearchHistory searchCount={searchCount} />
      </div>
    </div>
  );
};

export default DashboardPage;
