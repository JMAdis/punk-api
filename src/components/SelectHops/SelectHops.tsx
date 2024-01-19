import "./SelectHops.scss";

type SelectHopsProps = {
  uniqueHops: string[];
  onSelectHop: (hop: string) => void;
  selectedHop: string;
};

const SelectHops = ({
  uniqueHops,
  onSelectHop,
  selectedHop,
}: SelectHopsProps) => {
  return (
    <div>
      <select
        title="hops"
        onChange={(e) => onSelectHop(e.target.value)}
        value={selectedHop}
      >
        <option value="">Select Hop</option>
        {uniqueHops.map((hop, index) => {
          return (
            <option key={index} value={hop}>
              {hop}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectHops;
