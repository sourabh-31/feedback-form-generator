export default function ContactUs() {
  return (
    <div className="flex-grow overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-kanit text-4xl font-bold text-gray-900">
          Contact Us
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="mt-2">
            <p className="mb-4 font-workSans text-lg text-gray-600">
              We'd love to hear from you. Please fill out the form below or use
              our contact information.
            </p>
            <div className="mt-8">
              <h2 className="mb-2 font-kanit text-2xl font-semibold text-indigo-600">
                Our Office
              </h2>
              <p className="font-workSans text-gray-600">
                123 Demo Street
                <br />
                City, State 12345
                <br />
                Country
              </p>
              <p className="mt-4 font-workSans text-gray-600">
                Phone: (123) 456-7890
                <br />
                Email: info@democompany.com
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 font-kanit text-2xl font-semibold text-indigo-600">
              Contact Form
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-workSans text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-1 shadow-sm outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-workSans text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-1 shadow-sm outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block font-workSans text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 rounded-md bg-indigo-600 px-4 py-2 font-kanit text-sm font-medium text-white hover:bg-indigo-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
