import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Gift } from "../../types/types";
import ToggleIconBtn from "../btn/ToggleIconBtn";

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  return (
    <div className="bg-slate-100 p-6 rounded-lg cursor-pointer">
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
      <ul className="grid grid-cols-[repeat(2,1fr)]">
        {gift.images.map((image, index) => {
          return (
            <li key={image + index}>
              <img src={image} alt={gift.gift} className="w-[200px] h-[200px]" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
