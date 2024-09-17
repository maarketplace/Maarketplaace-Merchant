const OverviewSection = () => {
  return (
    <div className="h-[34%] rounded-lg shadow-md bg-white">
      <div className="flex flex-col justify-around h-full rounded-lg">
        <h3 className="font-bold pl-16 text-lg">Overview</h3>
        <div className="flex justify-around">
          <OverviewItem color="yellow" label="Book Purchased" value={6} />
          <OverviewItem color="red" label="Course Progress" value={2} />
          <OverviewItem color="blue" label="Book Saved" value={9} />
        </div>
        <div className="w-full bg-slate-400 flex justify-center">
          <div className="bg-green-500 relative inline-flex justify-between"></div>
        </div>
      </div>
    </div>
  );
};

const OverviewItem = ({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) => (
  <div className="flex flex-col space-x-2 gap-2">
    <div className="flex space-x-2 items-center">
      <div className={`w-4 h-4 bg-${color}-500 rounded-full`}></div>
      <span className="text-gray-700">{label}</span>
    </div>
    <div className="font-medium text-xl">
      <span>{value}</span>
      <div className={`w-10 h-0.5 bg-${color}-500`}></div>
    </div>
  </div>
);

export default OverviewSection;
