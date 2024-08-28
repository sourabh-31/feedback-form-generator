import AppLayout from "@layout/AppLayout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <p className="ml-auto mr-auto mt-[14rem] w-[60%] text-center font-kanit text-4xl font-medium leading-normal">
        Oops! The page you&apos;re looking for doesn&apos;t seem to exist.
      </p>

      <button
        className="mx-auto mt-12 flex items-center gap-3 font-workSans text-2xl font-medium text-[#276cd2]"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={28} />
        <span>Go Back</span>
      </button>
    </AppLayout>
  );
}
