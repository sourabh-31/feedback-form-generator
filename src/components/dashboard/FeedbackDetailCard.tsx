import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Heading from "@components/shared/Heading";
import Button from "../shared/Button";
import Card from "../shared/Card";
import FlexBetween from "../shared/FlexBetween";
import Clipboard from "@assets/clipboard.svg";
import { deleteFormData } from "@utils/firestoreActions";
import { incrementViewCountAsync } from "@redux/features/formPropSlice";
import { AppDispatch } from "@redux/store";

interface FeedbackDetailCardProps {
  heading: string;
  submitCount: number;
  viewCount: number;
  datePublished: string;
  formId: string;
}

export default function FeedbackDetailCard({
  heading,
  submitCount,
  viewCount,
  formId,
  datePublished,
}: FeedbackDetailCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleEditForm = () => {
    navigate(`/customize?formId=${formId}`);
  };

  const handleDeleteForm = async () => {
    await deleteFormData(formId);
    window.location.reload();
  };

  const handleViewSubmission = () => {
    dispatch(incrementViewCountAsync(formId));
    navigate(`/submissions?formId=${formId}`);
  };

  return (
    <Card className="flex h-[24rem] w-80 flex-col">
      {/* Card Header */}
      <Card.Header className="flex items-center justify-center bg-[#f5d563] p-3">
        <img src={Clipboard} alt="clipboard" className="size-10" />
      </Card.Header>

      {/* Card Details */}
      <Card.Body className="flex flex-grow flex-col bg-white p-4">
        <Heading heading={heading} className="mt-1" />

        <div className="mt-4 space-y-2 font-workSans">
          <FlexBetween>
            <span className="text-gray-600">Submitted</span>
            <span className="font-medium">{submitCount}</span>
          </FlexBetween>

          <FlexBetween>
            <span className="text-gray-600">Viewed</span>
            <span className="font-medium">{viewCount}</span>
          </FlexBetween>

          <FlexBetween>
            <span className="text-gray-600">Date Published</span>
            <span className="font-medium">{datePublished}</span>
          </FlexBetween>
        </div>

        {/* Card Action Button */}
        <div className="mt-auto flex flex-col items-center">
          <Button
            className="bg-[#9c27b0] text-white"
            onClick={handleViewSubmission}
          >
            View Submission
          </Button>
          <div className="mt-3 flex w-full justify-center gap-2">
            <Button
              className="bg-[#2e7d32] text-white"
              onClick={handleEditForm}
            >
              Edit
            </Button>
            <Button
              className="bg-[#2196f3] text-white"
              onClick={handleDeleteForm}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
