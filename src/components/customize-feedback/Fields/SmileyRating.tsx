import { useState } from "react";
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";
import FieldSkeleton from "@components/shared/FieldSkeleton";
import { EmojiDataType } from "@customTypes/customizeFeedback.type";
import { FieldPropType } from "@customTypes/formProp.type";

const emojis: EmojiDataType[] = [
  {
    icon: Angry,
    color: "text-red-500",
    hoverColor: "hover:text-red-400",
    feeling: "Angry",
  },
  {
    icon: Frown,
    color: "text-orange-500",
    hoverColor: "hover:text-orange-400",
    feeling: "Unhappy",
  },
  {
    icon: Meh,
    color: "text-yellow-500",
    hoverColor: "hover:text-yellow-400",
    feeling: "Neutral",
  },
  {
    icon: Smile,
    color: "text-green-500",
    hoverColor: "hover:text-green-400",
    feeling: "Happy",
  },
  {
    icon: Laugh,
    color: "text-blue-500",
    hoverColor: "hover:text-blue-400",
    feeling: "Very Happy",
  },
];

export default function EmojiRating({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  const [selectedEmoji, setSelectedEmoji] = useState<null | number>(null);

  const handleSelect = (index: number) => {
    setSelectedEmoji(index);
    onInputChange(emojis[index].feeling);
  };

  return (
    <FieldSkeleton
      label={field.label}
      isRequired={field.isRequired}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    >
      <div className="flex items-center space-x-2">
        {emojis.map((emoji, index) => {
          const Icon = emoji.icon;
          return (
            <button
              key={index}
              className={`flex size-12 items-center justify-center rounded-full transition-colors duration-200 ease-in-out ${
                selectedEmoji === index ? emoji.color : "text-gray-300"
              } ${selectedEmoji !== index ? emoji.hoverColor : ""}`}
              onClick={() => handleSelect(index)}
            >
              <Icon className="size-10" />
            </button>
          );
        })}
      </div>
    </FieldSkeleton>
  );
}
