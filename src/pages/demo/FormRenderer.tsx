import { useEffect, useState } from "react";
import { FormDataType } from "@customTypes/formProp.type";
import { useLocation } from "react-router-dom";
import Field from "@components/customize-feedback/Fields";
import { X } from "lucide-react";
import Card from "@components/shared/Card";
import { editFormData } from "@utils/firestoreActions";
import { format, isEqual, parse } from "date-fns";
import { getDeviceFingerprint } from "@utils/getDeviceFingerPrint";

interface FormRendererProps {
  forms: { [id: string]: FormDataType } | null;
}

interface Response {
  userId: string;
  value: string;
  date: string; // New field to store the response date
}

export default function FormRenderer({ forms }: FormRendererProps) {
  const [formToRender, setFormToRender] = useState<FormDataType | null>(null);
  const [formId, setFormId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [showForm, setShowForm] = useState<boolean>(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string | null>(
    null,
  );
  const location = useLocation();

  useEffect(() => {
    const fetchDeviceFingerprint = async () => {
      const fingerprint = await getDeviceFingerprint();
      setDeviceFingerprint(fingerprint);
    };

    fetchDeviceFingerprint();
  }, []);

  useEffect(() => {
    if (forms) {
      const matchingForm = Object.values(forms).find(
        (form) => form.url === window.location.href,
      );

      const matchingId = Object.keys(forms).find(
        (id) => forms[id].url === window.location.href,
      );

      if (matchingId) {
        setFormId(matchingId);
      } else {
        setFormId(null);
      }

      if (matchingForm) {
        setFormToRender(matchingForm);
        checkDateAndTime(matchingForm);
      } else {
        setFormToRender(null);
        setShowForm(false);
      }
    }
  }, [forms, location.pathname]);

  useEffect(() => {
    if (formId && deviceFingerprint) {
      const isSubmitted = localStorage.getItem(`form_${formId}_submitted`);
      if (isSubmitted === deviceFingerprint) {
        setShowForm(false);
      }
    }
  }, [formId, deviceFingerprint]);

  const checkDateAndTime = (form: FormDataType) => {
    const { specificDate, specificTime } = form;

    if (!specificDate && !specificTime) {
      setShowForm(true);
      return;
    }

    const now = new Date();
    const currentDate = format(now, "dd MMM yyyy");
    const currentTime = format(now, "hh:mm aa");

    const isDateEqual =
      !specificDate ||
      isEqual(
        parse(specificDate, "dd MMM yyyy", new Date()),
        parse(currentDate, "dd MMM yyyy", new Date()),
      );

    const isTimeEqual =
      !specificTime ||
      isEqual(
        parse(specificTime, "hh:mm aa", new Date()),
        parse(currentTime, "hh:mm aa", new Date()),
      );

    if (isDateEqual && isTimeEqual) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: number]: string } = {};
    let isValid = true;

    formToRender?.fieldData.forEach((field, index) => {
      if (
        field.isRequired &&
        (!field.inputValue || field.inputValue.trim() === "")
      ) {
        newErrors[index] = field.errorMessage || "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!formToRender || !deviceFingerprint) return;

    if (!validateForm()) {
      return;
    }

    // Check if this device has already submitted
    if (
      formToRender.submissions &&
      formToRender.submissions.includes(deviceFingerprint)
    ) {
      alert("You have already submitted this form.");
      return;
    }

    const now = new Date();
    const currentDate = format(now, "dd MMM yyyy"); // Get current date

    const updatedFieldData = formToRender.fieldData.map((field) => {
      if (field.inputValue) {
        const newResponse: Response = {
          userId: deviceFingerprint,
          value: field.inputValue,
          date: currentDate, // Add the date to the response
        };
        return {
          ...field,
          responses: [...(field.responses || []), newResponse],
          inputValue: "",
        };
      }
      return field;
    });

    const updatedForm = {
      ...formToRender,
      fieldData: updatedFieldData,
      submitCount: (formToRender.submitCount || 0) + 1,
      submissions: [...(formToRender.submissions || []), deviceFingerprint],
    };

    setFormToRender(updatedForm);
    setErrors({});

    if (formId) {
      editFormData(formId, updatedForm);
      // Store submission status in localStorage
      localStorage.setItem(`form_${formId}_submitted`, deviceFingerprint);
    }

    console.log("Updated form data:", updatedForm);

    // Close the form after successful submission
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormToRender(null);
  };

  if (!formToRender || !showForm) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="flex max-h-[80vh] w-[32rem] flex-col border-none">
        <Card.Header className="flex items-center justify-between gap-3 bg-[#5578f4] px-4 py-4 text-white">
          {formToRender.formName}
          <button onClick={handleCloseForm}>
            <X size={24} className="text-white" />
          </button>
        </Card.Header>

        <Card.Body className="flex max-h-[80vh] flex-grow flex-col overflow-y-auto bg-white p-6">
          <div className="space-y-4">
            {formToRender.fieldData.map((field, index) => (
              <div key={index}>
                <Field
                  field={field}
                  onEditClick={() => null}
                  onDeleteClick={() => null}
                  onInputChange={(value: string) => {
                    const updatedFields = formToRender.fieldData.map((f, i) =>
                      i === index ? { ...f, inputValue: value } : f,
                    );
                    setFormToRender((prevForm) =>
                      prevForm
                        ? { ...prevForm, fieldData: updatedFields }
                        : prevForm,
                    );
                    if (errors[index]) {
                      setErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors[index];
                        return newErrors;
                      });
                    }
                  }}
                />
                {errors[index] && (
                  <p className="-mt-10 font-workSans text-red-500">
                    * {errors[index]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4 mt-4 bg-white">
            <button
              className="w-full rounded bg-blue-500 py-3 font-kanit text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
