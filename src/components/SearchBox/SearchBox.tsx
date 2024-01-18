import { ChangeEventHandler } from "react";
import "./SearchBox.scss";

type SearchBoxProps = {
    searchTerm: string;
    handleInput: ChangeEventHandler<HTMLInputElement>;
};

const SearchBox = ({searchTerm, handleInput}: SearchBoxProps) => {
  return (
    <input 
    type="text"
    placeholder="Type to search beers"
    value={searchTerm}
    onChange={handleInput}
    />
  );
};

export default SearchBox