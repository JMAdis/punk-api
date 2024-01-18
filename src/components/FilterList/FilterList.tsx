import FilterItem from "../FilterItem/FilterItem";
import "./FilterList.scss";

type FilterListProps = {
  abvChange: React.ChangeEventHandler<HTMLInputElement>;
  yearChange: React.ChangeEventHandler<HTMLInputElement>;
  phChange: React.ChangeEventHandler<HTMLInputElement>;
  isABVChecked?: boolean;
  isYearChecked?: boolean;
  isPhChecked?: boolean;
};

const FilterList = ({
  abvChange,
  yearChange,
  phChange,
  isABVChecked,
  isYearChecked,
  isPhChecked,
}: FilterListProps) => {
  return (
    <div>
      <FilterItem
        id="ABV"
        onChange={abvChange}
        label="High ABV (>6.0%)"
        checked={isABVChecked}
      />
      <FilterItem
        id="ClassicRange"
        onChange={yearChange}
        label="Classic Range"
        checked={isYearChecked}
      />
      <FilterItem
        id="PH"
        onChange={phChange}
        label="Acidic (ph < 4)"
        checked={isPhChecked}
      />
    </div>
  );
};

export default FilterList;
