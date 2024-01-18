import "./NavBar.scss";
import FilterList from "../../components/FilterList/FilterList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { ChangeEventHandler } from "react";

type NavBarProps = {
  abvChange: ChangeEventHandler<HTMLInputElement>;
  yearChange: ChangeEventHandler<HTMLInputElement>; 
  phChange: ChangeEventHandler<HTMLInputElement>;
  searchTerm: string;
  handleInput: ChangeEventHandler<HTMLInputElement>;
};

const NavBar = ({abvChange, yearChange, phChange, searchTerm, handleInput}: NavBarProps) => {
  return (
    <nav>
        <SearchBox searchTerm={searchTerm} handleInput={handleInput} />
        <h1>PUNK API Project</h1>
        <FilterList abvChange={abvChange} yearChange={yearChange} phChange={phChange}/>
    </nav>
  );
};

export default NavBar;
