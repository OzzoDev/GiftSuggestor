import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Gift } from "../../types/types";
import ToggleIconBtn from "../btn/ToggleIconBtn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import GiftCardImageGallery from "./GiftCardImageGallery";

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalImages: number = gift.images.length;

  useEffect(() => {
    if (imagesLoaded >= totalImages && totalImages > 0) {
      setIsLoading(false);
    }
  }, [imagesLoaded, totalImages]);

  const handleImageLoad = (): void => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    // Preload images
    gift.images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Handle broken images too
    });
  }, [gift.images]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton height="100%" width="100%" baseColor="#f3f3f3" highlightColor="#ecebeb" />
        </div>
      )}
      <div
        className={`bg-slate-100 p-6 rounded-lg cursor-pointer ${
          isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
        }`}>
        <ToggleIconBtn
          selected={false}
          onClick={() => {}}
          defualtIcon={<IoIosHeartEmpty size={25} />}
          selectedIcon={<IoIosHeart size={25} color="red" />}
        />
        <p>{gift.gift}</p>
        <p>{gift.description}</p>
        <p>{gift.occasion.join(", ")}</p>
        <p>
          ${gift.price.min}-{gift.price.max}
        </p>
        <a href={gift.url} className="text-blue-600 font-semi-bold underline">
          Read more
        </a>
        <GiftCardImageGallery images={gift.images} />
        {/* <ul className="grid grid-cols-[repeat(2,1fr)]">
          {gift.images.map((image, index) => (
            <li key={image + index}>
              <img src={image} alt={gift.gift} className="w-[200px] h-[200px] block" />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
