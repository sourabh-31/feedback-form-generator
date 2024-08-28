import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@components/shared/Button";
import Heading from "@components/shared/Heading";
import Sidebar from "@components/shared/Sidebar";
import Switch from "@components/shared/Switch";
import { WindowNameType } from "@customTypes/customizeFeedback.type";
import useSelectedField from "@hooks/useSelectedField";
import { ChevronLeft, Trash, Plus } from "lucide-react";
import { updateField } from "@redux/features/formPropSlice";
import { motion } from "framer-motion";

interface EditFieldProps {
  handleWindow: (winName: WindowNameType) => void;
}

export default function EditField({ handleWindow }: EditFieldProps) {
  // Redux hooks and states
  const dispatch = useDispatch();
  const selectedField = useSelectedField();
  const [label, setLabel] = useState(selectedField?.label || "");
  const [isRequired, setIsRequired] = useState(
    selectedField?.isRequired || false,
  );
  const [errorMessage, setErrorMessage] = useState(
    selectedField?.errorMessage || "",
  );
  const [options, setOptions] = useState(selectedField?.options || []);
  const [isShaking, setIsShaking] = useState(false);
  const [shakingInputIndex, setShakingInputIndex] = useState(-1);

  //   Handle add options
  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  //   Handle remove options
  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      setShakingInputIndex(index);
      setTimeout(() => setShakingInputIndex(-1), 500);
    }
  };

  // Handle option change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handle Save
  const handleSave = () => {
    if (isRequired && !errorMessage.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    if (options.length > 0 && options.some((option) => !option.trim())) {
      const emptyIndex = options.findIndex((option) => !option.trim());
      setShakingInputIndex(emptyIndex);
      setTimeout(() => setShakingInputIndex(-1), 500);
      return;
    }
    if (selectedField) {
      dispatch(
        updateField({
          id: selectedField.id,
          updates: {
            label,
            isRequired,
            errorMessage: isRequired ? errorMessage : "",
            options: options.length > 0 ? options : [],
          },
        }),
      );
      handleWindow("add-field");
    }
  };

  return (
    <Sidebar>
      {/* Back Btn */}
      <button
        className="flex items-center gap-3"
        onClick={() => handleWindow("add-field")}
      >
        <ChevronLeft size={22} />
        <Heading heading="Back to Add Fields" size="lg" />
      </button>

      {/* label */}
      <div className="mt-8 px-2 font-workSans">
        <label className="text-lg font-medium text-gray-800">Label</label>
        <input
          name="fieldLabel"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="mt-1 w-full border-b-2 border-gray-600 py-2 font-medium text-gray-600 outline-none placeholder:font-normal"
        />
      </div>

      {/* Required Switch */}
      <div className="mt-10 px-2">
        <Switch
          label="Required *"
          isOn={isRequired}
          onToggle={() => setIsRequired(!isRequired)}
          labelClassName="text-lg font-workSans"
        />
      </div>

      {/* Error message field */}
      {isRequired && (
        <motion.div
          className="mt-8 px-2 font-workSans"
          animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <label className="text-lg font-medium text-gray-800">
            Error Message
          </label>
          <input
            name="errorMessage"
            placeholder="Enter error message"
            type="text"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            className="mt-1 w-full border-b-2 border-gray-600 py-2 font-medium text-gray-600 outline-none placeholder:font-normal"
          />
        </motion.div>
      )}

      {/* Options for Radio Btn and Categories */}
      {(selectedField?.type === "radioButton" ||
        selectedField?.type === "categories") && (
        <div className="mt-10 px-2 font-workSans">
          <div className="flex items-center justify-between">
            <label className="text-lg font-medium text-gray-800">Options</label>
            <button onClick={handleAddOption}>
              <Plus size={24} />
            </button>
          </div>
          {options.map((option, index) => (
            <motion.div
              key={index}
              className="mt-5 flex items-end gap-4"
              animate={
                shakingInputIndex === index ? { x: [-5, 5, -5, 5, 0] } : {}
              }
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-grow border-b-2 border-gray-600 py-2 font-medium text-gray-600 outline-none"
              />
              <button onClick={() => handleRemoveOption(index)}>
                <Trash size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Action Btn */}
      <div className="mt-14 flex w-full justify-start gap-4 px-2">
        <Button className="bg-[#2196f3] text-white shadow" onClick={handleSave}>
          Save
        </Button>
        <Button
          className="border border-gray-200 bg-[#f3f3f3] shadow"
          onClick={() => handleWindow("add-field")}
        >
          Cancel
        </Button>
      </div>
    </Sidebar>
  );
}
