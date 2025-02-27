import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Gift, GiftFavoriteToggleMessage } from "../../types/types";
import ToggleIconBtn from "../btn/ToggleIconBtn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import GiftCardImageGallery from "./GiftCardImageGallery";
import { calcGiftAverageRating, giftPriceBadgeBg, joinWithAnd } from "../../utils/helpers";
import GiftCardPriceBadge from "./GiftCardPriceBadge";
import PrimaryBtn from "../btn/PrimaryBtn";
import GhostBtn from "../btn/GhostBtn";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleGiftInFavorites } from "../../api/api";
import GiftCardRating from "./GiftCardRating";
import Toast from "../common/Toast";
import { useGiftListContext } from "../../hooks/useGiftListContext";

interface GiftCardProps {
  gift: Gift;
  isFavorite: boolean;
}

export default function GiftCard({ gift, isFavorite }: GiftCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [showToast, setShowToast] = useState<boolean>(false);
  // const [toastMessage, setToastMessage] = useState<string>("");
  const totalImages: number = gift.images.length;

  const { state: giftListState, setState: setGiftListState } = useGiftListContext();

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

  const mutation = useMutation<GiftFavoriteToggleMessage, Error, Gift>({
    mutationFn: toggleGiftInFavorites,
    onSuccess: (data) => {
      const message =
        data === "Added"
          ? `${gift.gift} successfully marked as favorite gift`
          : `${gift.gift} is no longer marked as favorite gift`;
      setGiftListState({ favGiftToggleMessage: message });

      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
    onError: (error) => {
      console.error("Error toggling favorite:", error);
    },
  });

  const handleToggleFavorite = async () => {
    mutation.mutate(gift);
  };

  const handleImageLoad = (): void => {
    setImagesLoaded((prev) => prev + 1);
  };

  const navigateToGiftUrl = (): void => {
    window.location.href = gift.url;
  };

  const navigteToGiftDetails = (): void => {
    navigate(`gift/${gift.id}`);
  };

  const averageRating = calcGiftAverageRating(gift.reviews);

  const minPrice = gift.price.min;
  const priceBadgeBackgroundColor = giftPriceBadgeBg(minPrice);

  return (
    <>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <Skeleton height="100%" width="100%" baseColor="#f3f3f3" highlightColor="#ecebeb" />
          </div>
        )}
        <div
          className={`flex flex-col justify-between h-[700px] bg-slate-100 p-6 rounded-lg${
            isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
          }`}>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-start pb-2 border-b-[1px] border-gray-300">
              <p className="text-lg font-semibold">{gift.gift}</p>
              <ToggleIconBtn
                selected={isFavorite}
                onClick={handleToggleFavorite}
                defualtIcon={<IoIosHeartEmpty size={25} />}
                selectedIcon={<IoIosHeart size={25} color="red" />}
              />
            </div>
            <p className="text-gray-500 font-medium col-span-2">{gift.description}</p>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <p>{joinWithAnd(gift.occasion)}</p>
              <div className="flex justify-between">
                <GiftCardPriceBadge
                  text={`$${gift.price.min} - ${gift.price.max}`}
                  backgroundColor={priceBadgeBackgroundColor}
                />
                <GiftCardRating rating={averageRating} />
              </div>
            </div>
            <GiftCardImageGallery images={gift.images} />
          </div>
          <div className="flex gap-8">
            <PrimaryBtn btnText="Buy here" onClick={navigateToGiftUrl} />
            <GhostBtn btnText="View more" onClick={navigteToGiftDetails} />
          </div>
        </div>
      </div>
      <Toast
        message={giftListState.favGiftToggleMessage}
        show={!!giftListState.favGiftToggleMessage}
        visibilityDuration={4}
        onClose={() => setGiftListState({ favGiftToggleMessage: "" })}
      />
    </>
  );
}
