import { useState } from "react";

interface GiftCardImageGalleryProps {
  images: string[];
}

export default function GiftCardImageGallery({ images }: GiftCardImageGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getGridStyle = () => {
    const totalImages = images.length;
    switch (totalImages) {
      case 2:
        return "grid grid-cols-1 grid-row-2 gap-2 h-[400px]";
      case 3:
      case 4:
        return "grid grid-cols-2 grid-row-2 gap-2 h-[400px]";
      case 5:
        return "grid grid-cols-2 grid-row-3 gap-2 h-[400px]";
      default:
        return "grid grid-cols-1 gap-2 h-[400px]"; // Default case
    }
  };

  const getPlacement = (index: number): string => {
    switch (index) {
      case 0:
      case 1:
        return "col-span-1 row-span-1";
      case 2:
      case 3:
        if (images.length % 2 === 0 || images.length > 4) {
          return "col-span-1 row-span-1";
        }
        return "col-span-2 row-span-1";
      case 4:
        return "col-span-2 row-span-1";
      default:
        return "";
    }
  };

  const gridStyle = getGridStyle();

  return (
    <div className={`relative ${gridStyle}`}>
      {images.map((src, index) => (
        <div
          key={index}
          className={`relative overflow-hidden ${getPlacement(index)}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg transition duration-300 ease-in-out"
          />
        </div>
      ))}
      {hoveredIndex !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 pointer-events-none">
          <img
            src={images[hoveredIndex]}
            alt={`Hovered Image ${hoveredIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ pointerEvents: "none" }}
          />
        </div>
      )}
    </div>
  );
}
