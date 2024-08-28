import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { format, parse } from "date-fns";
import {
  FieldDataType,
  FieldType,
  FormDataType,
} from "@customTypes/formProp.type";
import { FieldAndLogicDataType } from "@customTypes/customizeFeedback.type";
import {
  addField,
  setSpecificDate,
  setSpecificTime,
  setUrl,
  toggleSpecificDate,
  toggleSpecificTime,
  toggleUrl,
} from "@redux/features/formPropSlice";
import generateFieldId from "@utils/generateFieldId";
import Sidebar from "../shared/Sidebar";
import Heading from "@components/shared/Heading";
import Switch from "@components/shared/Switch";
import FlexBetween from "@components/shared/FlexBetween";

// Assets import
import TextArea from "@assets/textarea.svg";
import NumericRating from "@assets/numeric-rating.svg";
import StarRating from "@assets/star-rating.svg";
import SmileyRating from "@assets/smiley-rating.svg";
import SingleLineInput from "@assets/single-line-input.svg";
import RadioButton from "@assets/radio-button.svg";
import Categories from "@assets/categories.svg";
import Plus from "@assets/plus.svg";

const fieldAndLogicData: FieldAndLogicDataType[] = [
  { id: 1, fieldName: "Textarea", action: "textarea", img: TextArea },
  {
    id: 2,
    fieldName: "Numeric rating",
    action: "numericRating",
    img: NumericRating,
  },
  { id: 3, fieldName: "Star rating", action: "starRating", img: StarRating },
  {
    id: 4,
    fieldName: "Smiley rating",
    action: "smileyRating",
    img: SmileyRating,
  },
  {
    id: 5,
    fieldName: "Single line input",
    action: "singleLineInput",
    img: SingleLineInput,
  },
  { id: 6, fieldName: "Radio button", action: "radioButton", img: RadioButton },
  { id: 7, fieldName: "Categories", action: "categories", img: Categories },
];

export default function FieldAndLogic() {
  // Redux hooks
  const dispatch = useDispatch();
  const {
    isUrl,
    isSpecificDate,
    isSpecificTime,
    url,
    specificDate,
    specificTime,
    numFields,
    shakeUrlInput,
  } = useSelector((state: { formProp: FormDataType }) => state.formProp);

  const [isLimitReached, setIsLimitReached] = useState(false);

  let defaultLabel: string;
  let defaultOptions: string[];

  // Handle Field Btn Click
  const handleFieldClick = (fieldType: FieldType) => {
    if (numFields >= 7) {
      setIsLimitReached(true);
      return;
    }

    switch (fieldType) {
      case "textarea":
        defaultLabel = "Would you like to add a comment?";
        break;
      case "numericRating":
        defaultLabel =
          "How likely is it that you will recommend us to your family and friends?";
        break;
      case "starRating":
        defaultLabel = "Give a star rating for the website.";
        break;
      case "smileyRating":
        defaultLabel = "What is your opinion of this page?";
        break;
      case "singleLineInput":
        defaultLabel = "Do you have any suggestions to improve our website?";
        break;
      case "radioButton":
        defaultLabel = "Multiple Choice Question";
        defaultOptions = ["Radio 1", "Radio 2", "Radio 3"];
        break;
      case "categories":
        defaultLabel = "Pick a subject and provide your feedback.";
        defaultOptions = ["Category 1", "Category 2", "Category 3"];
        break;
      default:
        break;
    }

    const fieldData: FieldDataType = {
      id: generateFieldId(),
      type: fieldType,
      label: defaultLabel,
      value: [],
      inputValue: "",
      isRequired: false,
      errorMessage: "",
      options: defaultOptions ?? [],
      responses: [],
    };

    dispatch(addField(fieldData));
  };

  // Handle field limit reached
  useEffect(() => {
    if (isLimitReached) {
      const timer = setTimeout(() => setIsLimitReached(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLimitReached]);

  // Set current date as default
  useEffect(() => {
    if (isSpecificDate) {
      const currentDate = format(new Date(), "dd MMM yyyy");
      dispatch(setSpecificDate(currentDate));
    } else {
      dispatch(setSpecificDate(""));
    }
  }, [isSpecificDate, dispatch]);

  // Set current time as default
  useEffect(() => {
    if (isSpecificTime) {
      const currentTime = format(new Date(), "hh:mm a");
      dispatch(setSpecificTime(currentTime));
    } else {
      dispatch(setSpecificTime(""));
    }
  }, [isSpecificTime, dispatch]);

  // Handle specific date field change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = format(date, "dd MMM yyyy");
    dispatch(setSpecificDate(formattedDate));
  };

  // Handle specific time field change
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time24 = e.target.value;
    const [hours, minutes] = time24.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    const time12 = format(date, "hh:mm a");
    dispatch(setSpecificTime(time12));
  };

  // Convert date format for input field
  const dateForInput = specificDate
    ? format(parse(specificDate, "dd MMM yyyy", new Date()), "yyyy-MM-dd")
    : "";

  // Convert time format for input field
  const timeForInput = specificTime
    ? format(parse(specificTime, "hh:mm a", new Date()), "HH:mm")
    : "";

  return (
    <Sidebar>
      <FlexBetween>
        <Heading heading="Add Fields" />
        <motion.div
          animate={{
            color: isLimitReached ? "#ff0000" : "#000000",
          }}
          transition={{ duration: 0.1 }}
          className="tracking-wide, rounded px-2 py-1 font-kanit font-medium"
        >
          {numFields}/7
        </motion.div>
      </FlexBetween>

      {/* Input field options */}
      <div className="mt-4">
        {fieldAndLogicData.map((data) => (
          <motion.button
            key={data.id}
            className="flex w-full items-center justify-between rounded px-3 py-4 hover:bg-gray-100"
            onClick={() => handleFieldClick(data.action as FieldType)}
            animate={isLimitReached ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <img src={data.img} alt={data.action} />
              <span className="font-workSans font-medium text-gray-800">
                {data.fieldName}
              </span>
            </div>
            <img src={Plus} alt="plus" className="size-3" />
          </motion.button>
        ))}
      </div>

      {/* URL condition */}
      <div className="mt-8 px-2 font-workSans">
        <Switch
          label="Show based on URL conditions"
          isOn={isUrl}
          onToggle={() => {
            dispatch(toggleUrl());
            if (!isUrl) dispatch(setUrl(""));
          }}
        />
        <motion.div
          animate={shakeUrlInput ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <input
            placeholder="http://"
            name="urlConditions"
            type="text"
            value={url}
            onChange={(e) => dispatch(setUrl(e.target.value))}
            disabled={!isUrl}
            className={`mt-2 w-full border-b-2 py-2 font-medium text-gray-600 outline-none placeholder:font-normal disabled:opacity-50 ${shakeUrlInput ? "border-[#ff0000]" : "border-gray-600"}`}
          />
        </motion.div>
      </div>

      {/* Specific date condition */}
      <div className="mt-10 px-2 font-workSans">
        <Switch
          label="Show based on a specific date"
          isOn={isSpecificDate}
          onToggle={() => dispatch(toggleSpecificDate())}
        />
        <input
          placeholder="dd MMM yyyy"
          name="dateConditions"
          aria-label="Date"
          type="date"
          value={dateForInput}
          onChange={handleDateChange}
          disabled={!isSpecificDate}
          className="mt-2 w-full border-b-2 border-gray-600 py-2 font-medium text-gray-600 outline-none placeholder:font-normal disabled:opacity-50"
        />
      </div>

      {/* Specific time condition */}
      <div className="mt-10 px-2 font-workSans">
        <Switch
          label="Show based on a specific time"
          isOn={isSpecificTime}
          onToggle={() => dispatch(toggleSpecificTime())}
        />
        <input
          placeholder="hh:mm a"
          name="timeConditions"
          aria-label="Time"
          type="time"
          value={timeForInput}
          onChange={handleTimeChange}
          disabled={!isSpecificTime}
          className="mt-2 w-full cursor-pointer border-b-2 border-gray-600 py-2 font-medium text-gray-600 outline-none placeholder:font-normal disabled:opacity-50"
        />
      </div>
    </Sidebar>
  );
}
