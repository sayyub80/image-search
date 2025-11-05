import React from "react";
import ImageCard from "./ImageCard";
import { Card, CardContent } from "@/components/ui/card";

const ImageGrid = ({ images, onSelect, selectedImageIds }) => {
  if (images.length === 0) {
    return (
      <Card className="flex items-center justify-center h-64">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No images found. Try a new search!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onSelect={onSelect}
          isSelected={selectedImageIds.includes(image.id)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
