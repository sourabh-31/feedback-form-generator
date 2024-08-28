import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ChevronLeft, Pencil } from "lucide-react";
import Card from "../shared/Card";
import Modal from "@components/shared/Modal";
import Heading from "@components/shared/Heading";
import { useModal } from "@hooks/useModal";
import { FormDataType } from "@customTypes/formProp.type";
import Field from "./Fields";
import {
  deleteField,
  setSelectedField,
  handleFormName,
  resetFormData,
} from "@redux/features/formPropSlice";
import { WindowNameType } from "@customTypes/customizeFeedback.type";

interface CustomizeFormCardProps {
  heading: string;
  handleWindow: (winName: WindowNameType) => void;
}

export default function CustomizeFormCard({
  heading,
  handleWindow,
}: CustomizeFormCardProps) {
  const { close } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isCustomizePage = pathname === "/customize";
  const { fieldData, isPublished } = useSelector(
    (state: { formProp: FormDataType }) => state.formProp,
  );
  const [editFormName, setEditFormName] = useState(heading);
  const [isShaking, setIsShaking] = useState(false);
  const isEmpty = !fieldData.length;

  // Handle Modal Cancel
  const handleCancel = () => {
    setEditFormName(heading);
    close();
  };

  // Handle Modal Save
  const handleSave = () => {
    if (editFormName.trim() === "") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    dispatch(handleFormName(editFormName));
    close();
  };

  // Handle Edit Field
  const handleEditField = (fieldId: string) => {
    handleWindow("edit-field");
    dispatch(setSelectedField(fieldId));
  };

  // Handle Delete Field
  const handleDeleteField = (fieldId: string) => {
    dispatch(deleteField(fieldId));
  };

  // Handle navigate back to home
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

  return (
    <>
      <Card className="flex max-h-[80vh] w-[32rem] flex-col">
        {/* Card Heading */}
        <Card.Header className="flex items-center gap-3 bg-[#5578f4] px-3 py-4 text-white">
          <button onClick={handleGoBack}>
            <ChevronLeft />
          </button>
          <Modal.Open opens="edit-feedback-form-name">
            <button className="flex items-center gap-3">
              {heading}
              <Pencil size={20} />
            </button>
          </Modal.Open>
        </Card.Header>

        {/* Card Details */}
        <Card.Body className="flex max-h-[80vh] flex-grow flex-col overflow-y-auto bg-white p-6">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center font-kanit text-2xl font-medium tracking-wide text-gray-500">
              Add Fields
            </div>
          ) : (
            <div className="space-y-6">
              {fieldData.map((field) => (
                <Field
                  field={field}
                  key={field.id}
                  onEditClick={() => handleEditField(field.id)}
                  onDeleteClick={() => handleDeleteField(field.id)}
                  onInputChange={() => null}
                />
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Edit form name modal window */}
      <Modal.Window name="edit-feedback-form-name">
        <div>
          <Heading
            heading="Edit feedback form name"
            weight="normal"
            size="2xl"
          />
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <input
              placeholder="Enter feedback form name"
              name="editFormName"
              type="text"
              value={editFormName}
              onChange={(e) => setEditFormName(e.target.value)}
              className="mt-3 w-[20rem] border-b-2 border-gray-600 py-2 font-workSans text-lg font-medium text-gray-600 outline-none placeholder:font-normal sm:w-[30rem]"
            />
          </motion.div>
          <div className="-mb-2 mt-10 flex items-center justify-end gap-6 font-kanit text-xl font-medium">
            <button className="text-[#189657]" onClick={handleSave}>
              Save
            </button>
            <button className="text-gray-400" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Window>
    </>
  );
}
