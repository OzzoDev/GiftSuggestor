import { Gift } from "../../types/types";

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  return (
    <div className="bg-red-900">
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
