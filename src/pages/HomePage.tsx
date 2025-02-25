import GiftList from "../components/gift/GiftList";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold">Home page</h1>
      <GiftList />
    </div>
  );
}
