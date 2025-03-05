import { useNavigate, useParams } from "react-router";
import { Gift } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchGift } from "../../api/api";
import { PuffLoader } from "react-spinners";
import GiftDetails from "../../components/gift/giftDetails/GiftDetails";
import { IoIosArrowRoundBack } from "react-icons/io";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import GiftDetailsImageGallery from "../../components/gift/giftDetails/GiftDetailsImageGallery";

export default function GiftDetailsPage() {
  const navigate = useNavigate();
  const { giftid: giftId } = useParams();
  const { data: gift, isLoading } = useQuery<Gift>({
    queryKey: ["gift", giftId],
    queryFn: () => fetchGift(giftId || ""),
  });

  if (isLoading) {
    return (
      <PuffLoader
        size={50}
        className="absoulte top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  if (!gift) {
    return <h2 className="text-2xl p-4 text-red-500 font-semibold">Gift not found</h2>;
  }

  const navigateToGiftUrl = (): void => {
    window.location.href = gift.url;
  };

  return (
    <div className="flex flex-col gap-24">
      <div className="flex justify-between items-center p-8">
        <IoIosArrowRoundBack size={32} onClick={() => navigate("/")} className="cursor-pointer" />
        <div>
          <PrimaryBtn onClick={navigateToGiftUrl}>
            <span>Buy here</span>
          </PrimaryBtn>
        </div>
      </div>
      <GiftDetails gift={gift} />
      <GiftDetailsImageGallery images={gift.images} />
    </div>
  );
}
