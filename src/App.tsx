import { lazy, Suspense } from "react";
import Modal from "@components/shared/Modal";
import CustomizeFeedback from "@pages/customize-feedback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@pages/dashboard";
import NotFound from "@pages/not-found";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewSubmission from "@pages/view-submission";
import Spinner from "@components/shared/Spinner";

// Lazy load the components
const DemoPage = lazy(() => import("@pages/demo"));
const Landing = lazy(() => import("@pages/demo/Landing"));
const Solutions = lazy(() => import("@pages/demo/Solutions"));
const AboutUs = lazy(() => import("@pages/demo/AboutUs"));
const ContactUs = lazy(() => import("@pages/demo/ContactUs"));

function MiddleSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

function App() {
  return (
    <>
      <Modal>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customize" element={<CustomizeFeedback />} />
            <Route path="/submissions" element={<ViewSubmission />} />
            <Route
              path="/demo"
              element={
                <Suspense fallback={<MiddleSpinner />}>
                  <DemoPage />
                </Suspense>
              }
            >
              {/* Set Landing as the index route for /demo */}
              <Route
                index
                element={
                  <Suspense fallback={<MiddleSpinner />}>
                    <Landing />
                  </Suspense>
                }
              />
              <Route
                path="solutions"
                element={
                  <Suspense fallback={<MiddleSpinner />}>
                    <Solutions />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<MiddleSpinner />}>
                    <AboutUs />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<MiddleSpinner />}>
                    <ContactUs />
                  </Suspense>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
