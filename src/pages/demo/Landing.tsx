import DemoHero from "@assets/demo-hero.jpg";

export default function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative flex-grow overflow-hidden bg-white">
        <div className="mx-auto h-full max-w-7xl">
          <div className="relative z-10 h-full bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block font-kanit xl:inline">
                    Beautiful landing page
                  </span>{" "}
                  <span className="block font-workSans text-indigo-600 xl:inline">
                    for your product
                  </span>
                </h1>
                <p className="mt-4 font-workSans text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-5 gap-6 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-kanit text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:ml-3 sm:mt-0">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 font-kanit text-base font-medium text-indigo-700 hover:bg-indigo-200 md:px-10 md:py-4 md:text-lg"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="mt-20 lg:absolute lg:inset-y-0 lg:right-20 lg:w-1/2 xl:mt-6">
          <img
            src={DemoHero}
            alt="Hero image"
            className="object-cover xl:scale-[75%]"
          />
        </div>
      </div>
    </div>
  );
}
