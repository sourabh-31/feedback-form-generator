export default function Solutions() {
  return (
    <div className="flex-grow overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-10 font-kanit text-4xl font-bold text-gray-900">
          Our Solutions
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Solution Card 1 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 font-kanit text-2xl font-semibold text-indigo-600">
              Solution 1
            </h2>
            <p className="font-workSans text-gray-600">
              Description of Solution 1 and its benefits to the customer.
            </p>
          </div>

          {/* Solution Card 2 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 font-kanit text-2xl font-semibold text-indigo-600">
              Solution 2
            </h2>
            <p className="font-workSans text-gray-600">
              Description of Solution 2 and its benefits to the customer.
            </p>
          </div>

          {/* Solution Card 3 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 font-kanit text-2xl font-semibold text-indigo-600">
              Solution 3
            </h2>
            <p className="font-workSans text-gray-600">
              Description of Solution 3 and its benefits to the customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
