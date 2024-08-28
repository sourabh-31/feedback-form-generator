import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomizeFormCard from "@components/customize-feedback/CustomizeFormCard";
import EditField from "@components/customize-feedback/EditField";
import FieldAndLogic from "@components/customize-feedback/FieldAndLogic";
import { WindowNameType } from "@customTypes/customizeFeedback.type";
import { FormDataType } from "@customTypes/formProp.type";
import AppLayout from "@layout/AppLayout";
import { AppDispatch } from "@redux/store";
import { loadForm } from "@redux/features/formPropSlice";
import Spinner from "@components/shared/Spinner";

export default function CustomizeFeedback() {
  const [windowName, setWindowName] = useState<WindowNameType>("add-field");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { formName, isPublished } = useSelector(
    (state: { formProp: FormDataType }) => state.formProp,
  );

  // Handle Window Change
  const handleWindow = useCallback((winName: WindowNameType) => {
    setWindowName(winName);
  }, []);

  // Load form data if editing, and handle navigation
  useEffect(() => {
    const loadFormData = async () => {
      setIsLoading(true);
      const urlParams = new URLSearchParams(location.search);
      const formId = urlParams.get("formId");

      if (formId) {
        setIsEditing(true);
        await dispatch(loadForm(formId));
      }

      setIsLoading(false);
    };

    loadFormData();
  }, [dispatch, location.search]);

  // Navigate back to home if form name is empty (only for new forms)
  useEffect(() => {
    if (!isLoading && !isEditing && !formName) {
      navigate("/");
    }
  }, [formName, navigate, isLoading, isEditing]);

  // Handle page refresh
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isPublished) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPublished]);

  // Loading spinner when page is loading
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex">
        {/* Customize Section Body */}
        <div className="flex flex-1 justify-center px-8 py-12">
          <CustomizeFormCard heading={formName} handleWindow={handleWindow} />
        </div>

        {/* Sidebar Window */}
        {windowName === "add-field" && <FieldAndLogic />}
        {windowName === "edit-field" && (
          <EditField handleWindow={handleWindow} />
        )}
      </div>
    </AppLayout>
  );
}
