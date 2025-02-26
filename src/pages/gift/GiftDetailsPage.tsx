import { useParams } from "react-router";

export default function GiftDetailsPage() {
  const { giftid: giftId } = useParams();
  return <div>Gift details page for {giftId}</div>;
}
