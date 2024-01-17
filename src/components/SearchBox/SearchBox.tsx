import { ChangeEventHandler } from "react";
import "./SearchBox.scss";

type SearchBoxProps = {
    searchTerm: string;
    placeholder: string;
    handleInput: ChangeEventHandler<HTMLInputElement>;
};

const SearchBox = ({searchTerm, handleInput}: SearchBoxProps) => {
  return (
    <input 
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={handleInput}
    />
  );
};

export default SearchBox