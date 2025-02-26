import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Gift } from "../../types/types";
import ToggleIconBtn from "../btn/ToggleIconBtn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import GiftCardImageGallery from "./GiftCardImageGallery";
import { joinWithAnd } from "../../utils/helpers";
import GiftCarPriceBadge from "./GiftCarPriceBadge";
import PrimaryBtn from "../btn/PrimaryBtn";
import GhostBtn from "../btn/GhostBtn";
import { useNavigate } from "react-router";

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalImages: number = gift.images.length;

  useEffect(() => {
    if (imagesLoaded >= totalImages && totalImages > 0) {
      setIsLoading(false);
    }
  }, [imagesLoaded, totalImages]);

  useEffect(() => {
    gift.images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
    });
  }, [gift.images]);

  const handleImageLoad = (): void => {
    setImagesLoaded((prev) => prev + 1);
  };

  const navigateToGiftUrl = (): void => {
    window.location.href = gift.url;
  };

  const minPrice = gift.price.min;
  const priceBadgeBackgroundColor =
    minPrice > 100
      ? "rgba(91, 11, 230,0.6)"
      : minPrice > 60
      ? "rgba(27, 98, 250,0.6)"
      : minPrice > 30
      ? "rgba(27, 183, 250,0.6)"
      : "rgba(4, 189, 109, 0.6)";

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton height="100%" width="100%" baseColor="#f3f3f3" highlightColor="#ecebeb" />
        </div>
      )}
      <div
        className={`flex flex-col justify-between h-[700px] bg-slate-100 p-6 rounded-lg cursor-pointer ${
          isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
        }`}>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-start pb-2 border-b-[1px] border-gray-300">
            <p className="text-lg font-semibold">{gift.gift}</p>
            <ToggleIconBtn
              selected={false}
              onClick={() => {}}
              defualtIcon={<IoIosHeartEmpty size={25} />}
              selectedIcon={<IoIosHeart size={25} color="red" />}
            />
          </div>
          <p className="text-gray-500 font-medium col-span-2">{gift.description}</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <p>{joinWithAnd(gift.occasion)}</p>
            <GiftCarPriceBadge
              text={`$${gift.price.min} - ${gift.price.max}`}
              backgroundColor={priceBadgeBackgroundColor}
            />
          </div>
          <GiftCardImageGallery images={gift.images} />
        </div>
        <div className="flex gap-8">
          <PrimaryBtn btnText="Buy here" onClick={navigateToGiftUrl} />
          <GhostBtn btnText="View more" />
        </div>
      </div>
    </div>
  );
}
