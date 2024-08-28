import React from "react";

interface SwitchProps {
  label: string;
  isOn: boolean;
  onToggle: () => void;
  labelClassName?: string;
}

const Switch: React.FC<SwitchProps> = ({
  label,
  isOn,
  onToggle,
  labelClassName,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className={`mr-3 font-medium text-gray-800 ${labelClassName}`}>
        {label}
      </span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isOn}
          onChange={onToggle}
        />
        <div
          className={`peer h-6 w-11 rounded-full bg-gray-200 p-1 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full`}
        ></div>
      </label>
    </div>
  );
};

export default Switch;
