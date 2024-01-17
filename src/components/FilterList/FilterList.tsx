import FilterItem from "../FilterItem/FilterItem";
import "./FilterList.scss";

type FilterListProps = {
    ABVChange: boolean
    ClassicRangeChange: boolean
    PhChange: boolean
};

const FilterList = ({ABVChange, ClassicRangeChange, PhChange} : FilterListProps) => {
  return (
    <div>
        <FilterItem onChange={ABVChange} label="High ABV (>6.0%)" />
        <FilterItem onChange={ClassicRangeChange} label="Classic Range" />
        <FilterItem onChange={PhChange} label="Acidic (ph < 4)" />
    </div>
  );
};

export default FilterList