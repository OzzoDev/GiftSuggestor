import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";
import { IoHomeOutline } from "react-icons/io5";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-12 h-screen">
      <h2 className="text-5xl p-4 text-red-500 font-semibold">404 - Page not found</h2>
      <div>
        <PrimaryBtn onClick={() => navigate("/")}>
          <IoHomeOutline size={24} />
          <span>Home</span>
        </PrimaryBtn>
      </div>
    </div>
  );
}
