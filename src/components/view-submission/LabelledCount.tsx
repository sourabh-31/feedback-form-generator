interface LabelledCountProps {
  count: number;
  label: string;
}

export default function LabelledCount({ count, label }: LabelledCountProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-kanit text-3xl">{count}</span>
      <span className="font-workSans text-lg font-medium text-gray-600">
        {label}
      </span>
    </div>
  );
}
