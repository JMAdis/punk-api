import "./NavBar.scss";
import FilterList from "../../components/FilterList/FilterList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { ChangeEventHandler } from "react";

type NavBarProps = {
    ABVChange: boolean;
    ClassicRangeChange: boolean; 
    PhChange: number;
    searchTerm: string;
    handleInput: ChangeEventHandler<HTMLInputElement>;
};

const NavBar = ({ABVChange, ClassicRangeChange, PhChange, searchTerm, handleInput}: NavBarProps) => {
  return (
    <nav>
        <SearchBox searchTerm={searchTerm} handleInput={handleInput} placeholder="Search beers..."/>
        <FilterList ABVChange={ABVChange} ClassicRangeChange={ClassicRangeChange} PhChange={PhChange}/>
    </nav>
  );
};

export default NavBar;
