interface GiftCardPriceBadgeProps {
  text: string;
  backgroundColor: string;
}

export default function GiftCardPriceBadge({ text, backgroundColor }: GiftCardPriceBadgeProps) {
  return (
    <div style={{ backgroundColor }} className="px-3 py-1 text-white font-medium rounded-md w-fit">
      {text}
    </div>
  );
}
