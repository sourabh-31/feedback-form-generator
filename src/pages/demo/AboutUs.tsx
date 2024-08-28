export default function AboutUs() {
  return (
    <div className="flex-grow overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-kanit text-4xl font-bold text-gray-900">
          About Us
        </h1>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 font-workSans text-lg text-gray-600">
              We are a company dedicated to providing innovative solutions to
              our customers. Our mission is to make a positive impact on
              businesses through technology and creativity.
            </p>
            <p className="font-workSans text-lg text-gray-600">
              Founded in 2024, we have grown to become a leader in technology.
              Our team of experts is committed to delivering high-quality
              products and services.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 font-kanit text-2xl font-semibold text-indigo-600">
              Our Values
            </h2>
            <ul className="list-inside list-disc font-workSans text-gray-600">
              <li>Innovation</li>
              <li>Customer-centric approach</li>
              <li>Integrity</li>
              <li>Collaboration</li>
              <li>Continuous improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
