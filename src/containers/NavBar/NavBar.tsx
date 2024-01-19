import "./NavBar.scss";
import FilterList from "../../components/FilterList/FilterList";
import SearchBox from "../../components/SearchBox/SearchBox";
import SelectHops from "../../components/SelectHops/SelectHops";
import { ChangeEventHandler } from "react";

type NavBarProps = {
  abvChange: ChangeEventHandler<HTMLInputElement>;
  yearChange: ChangeEventHandler<HTMLInputElement>;
  phChange: ChangeEventHandler<HTMLInputElement>;
  searchTerm: string;
  handleInput: ChangeEventHandler<HTMLInputElement>;
  uniqueHops: string[];
  onSelectHop: (hop: string) => void;
  selectedHop: string;
};

const NavBar = ({
  abvChange,
  yearChange,
  phChange,
  searchTerm,
  handleInput,
  uniqueHops,
  onSelectHop,
  selectedHop,
}: NavBarProps) => {
  const handleHopSelection = (hop: string) => {
    onSelectHop(hop);
  };

  return (
    <nav>
      <SearchBox searchTerm={searchTerm} handleInput={handleInput} />
      <SelectHops
        uniqueHops={uniqueHops}
        onSelectHop={handleHopSelection}
        selectedHop={selectedHop}
      />
      <h1>PUNK API Project</h1>
      <FilterList
        abvChange={abvChange}
        yearChange={yearChange}
        phChange={phChange}
      />
    </nav>
  );
};

export default NavBar;
