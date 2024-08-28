import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Heading from "./Heading";
import Logo from "@assets/logo.png";
import Button from "./Button";
import { FormDataType } from "@customTypes/formProp.type";
import {
  publishForm,
  resetFormData,
  saveForm,
  setShakeUrlInput,
} from "@redux/features/formPropSlice";
import generateFormId from "@utils/generateFormId";
import { AppDispatch } from "@redux/store";

export default function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = location.pathname;
  const isCustomizePage = pathname === "/customize";
  const isRootPage = pathname === "/";

  const { isPublished, isUrl, url } = useSelector(
    (state: { formProp: FormDataType }) => state.formProp,
  );

  const urlParams = new URLSearchParams(location.search);
  const formId = urlParams.get("formId");

  // Handle Navigate back to home
  const handleGoBack = () => {
    if (!isPublished && isCustomizePage) {
      const confirmMessage =
        "Changes may not be saved. Please publish your changes before going back. Do you still want to go back?";
      if (window.confirm(confirmMessage)) {
        dispatch(resetFormData());
        navigate("/", { replace: true });
      }
    } else {
      dispatch(resetFormData());
      navigate("/", { replace: true });
    }
  };

  // Handle Publish
  const handlePublish = () => {
    if (isUrl && !url.trim()) {
      dispatch(setShakeUrlInput(true));
      setTimeout(() => dispatch(setShakeUrlInput(false)), 500);
      return;
    }
    const newFormId = generateFormId();
    dispatch(publishForm(newFormId)).then(() => {
      // After successful publish, update the URL with the new form ID
      navigate(`/customize?formId=${newFormId}`, { replace: true });
    });
  };

  // Handle Save
  const handleSave = () => {
    if (formId) {
      dispatch(saveForm(formId));
    }
  };

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-7 py-[0.45rem] shadow">
      <div className="flex items-center" role="button" onClick={handleGoBack}>
        <img src={Logo} alt="logo" className="size-10" />
        <Heading
          heading="USER FEEDBACK"
          weight="semibold"
          size="xl"
          className="tracking-wide"
        />
      </div>

      {isCustomizePage && (
        <div>
          {!isPublished ? (
            <Button
              className="bg-[#2e7d32] text-sm text-white"
              onClick={handlePublish}
            >
              Publish
            </Button>
          ) : (
            <Button
              className="bg-[#2196f3] text-sm text-white"
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </div>
      )}

      {isRootPage && (
        <Button
          className="bg-[#2196f3] text-sm text-white"
          onClick={() => navigate("/demo")}
        >
          Demo
        </Button>
      )}
    </nav>
  );
}
