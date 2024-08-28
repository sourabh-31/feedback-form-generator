import Card from "@components/shared/Card";
import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import LabelledCount from "@components/view-submission/LabelledCount";
import { FormDataType } from "@customTypes/formProp.type";
import AppLayout from "@layout/AppLayout";
import { AppDispatch } from "@redux/store";
import { loadFormData } from "@utils/firestoreActions";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Updated ResponseType to include date
type ResponseType = {
  userId: string;
  value: string;
  date: string; // Include date field for each response
};

export default function ViewSubmission() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // For managing which accordion is open

  const handleGoBack = () => {
    navigate("/");
  };

  // Toggle accordion
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Load form data if editing, and handle navigation
  useEffect(() => {
    const loadFormDetails = async () => {
      setIsLoading(true);
      const urlParams = new URLSearchParams(location.search);
      const formId = urlParams.get("formId");

      if (formId) {
        const res = await loadFormData(formId);
        if (res) {
          setFormData(res);
        }
      }

      setIsLoading(false);
    };

    loadFormDetails();
  }, [dispatch]);

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
      <Card className="mx-auto mt-12 flex max-h-[80vh] max-w-[80rem] flex-col">
        {/* Card Heading */}
        <Card.Header className="flex items-center justify-between gap-3 bg-[#5578f4] px-3 py-4 text-white">
          <button className="flex items-center gap-3" onClick={handleGoBack}>
            <ChevronLeft />
            <span>{formData?.formName ?? ""}</span>
          </button>

          <div className="mr-2 flex gap-2">
            <span>Created Date:</span>
            <span className="font-light tracking-wide">
              {formData?.dateCreated ?? ""}
            </span>
          </div>
        </Card.Header>

        <Card.Body className="flex flex-grow flex-col bg-white p-8">
          {/* Count view */}
          <div className="flex gap-16">
            <LabelledCount count={formData?.viewCount ?? 0} label="Views" />
            <LabelledCount
              count={formData?.submitCount ?? 0}
              label="Submission"
            />
          </div>

          <div className="mt-10 space-y-2 text-lg">
            {formData?.isUrl && (
              <div className="font-workSans font-medium">
                Page URL contains {formData?.url ?? ""}
              </div>
            )}

            {formData?.isSpecificTime && (
              <div className="flex gap-2">
                <span className="font-kanit">Time:</span>
                <span className="font-workSans">
                  {formData.specificTime ?? "00 : 00"}
                </span>
              </div>
            )}

            {formData?.isSpecificDate && (
              <div className="flex gap-2">
                <span className="font-kanit">Date:</span>
                <span className="font-workSans">
                  {formData.specificDate ?? "1 Jan 2001"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Heading heading="Feedback List" weight="normal" size="2xl" />
          </div>

          {/* Accordion for feedback */}
          <div className="mt-4">
            {formData?.submissions?.map((submissionId, index) => (
              <div key={index} className="mb-4 border-b">
                <button
                  className="flex w-full justify-between py-2 text-left font-kanit text-lg"
                  onClick={() => toggleAccordion(index)}
                >
                  {`Feedback ${index + 1} (${
                    formData?.fieldData?.flatMap(
                      (field) =>
                        field.responses?.filter(
                          (response: ResponseType) =>
                            response.userId === submissionId,
                        ),
                      // @ts-expect-error hide
                    )?.[0]?.date ?? "N/A"
                  })`}
                  <span>
                    {activeIndex === index ? <ChevronDown /> : <ChevronUp />}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="mt-2 font-workSans">
                    {formData?.fieldData?.map((field, questionIndex) => {
                      // Ensure field.responses is an array and not undefined
                      const responses = field.responses as
                        | ResponseType[]
                        | undefined;

                      const response = responses?.find(
                        (r) => r.userId === submissionId,
                      );

                      return (
                        <div key={questionIndex} className="mb-4">
                          <span className="font-medium text-gray-800">
                            {field.label}
                          </span>
                          <p>
                            <span className="mr-2">Response:</span>
                            {response ? response.value : "No response"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </AppLayout>
  );
}
