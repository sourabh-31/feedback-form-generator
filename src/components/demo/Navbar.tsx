import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span
                className="font-kanit text-3xl font-bold text-indigo-600"
                role="button"
                onClick={() => navigate("/demo")}
              >
                Demo
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden text-sm sm:ml-6 sm:flex sm:space-x-8 md:text-base">
              <button
                onClick={() => navigate("/demo/solutions")}
                className="rounded-md px-3 py-2 font-workSans font-medium text-gray-600 hover:text-gray-900"
              >
                Solutions
              </button>
              <button
                onClick={() => navigate("/demo/about")}
                className="rounded-md px-3 py-2 font-workSans font-medium text-gray-600 hover:text-gray-900"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/demo/contact")}
                className="rounded-md px-3 py-2 font-workSans font-medium text-gray-600 hover:text-gray-900"
              >
                Contact Us
              </button>
            </div>
            <div className="ml-12">
              <button className="rounded-md bg-indigo-600 px-4 py-2 font-kanit text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
