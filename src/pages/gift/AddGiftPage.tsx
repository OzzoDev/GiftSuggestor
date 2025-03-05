import ImageGallary from "../../components/gift/addGift/AddGiftImageGallery";
import AddGiftForm from "../../components/gift/addGift/AddGiftForm";
import { AddGiftProvider } from "../../contexts/AddGiftContext";

export default function AddGiftPage() {
  return (
    <AddGiftProvider>
      <ImageGallary />
      <AddGiftForm />
    </AddGiftProvider>
  );
}
