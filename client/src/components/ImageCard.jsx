import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const ImageCard = ({ image, onSelect, isSelected }) => {
  const handleSelect = (newCheckedState) => {
    onSelect(image, newCheckedState);
  };

  return (
    <Card className="relative overflow-hidden rounded-lg group cursor-pointer">
      <div className="absolute top-3 left-3 z-20">
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleSelect}
          className="w-5 h-5 bg-background/80"
          aria-label="Select image"
        />
      </div>

      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => handleSelect(!isSelected)}
        className={`w-full h-48 object-cover transition-all duration-300
                    group-hover:scale-105
                    ${
                      isSelected
                        ? "opacity-50 border-2 border-primary"
                        : "opacity-100"
                    }`}
      />
    </Card>
  );
};

export default ImageCard;
