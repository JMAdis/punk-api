import { ChangeEventHandler } from "react";
import "./FilterItem.scss";

type FilterItemProps = {
    id: string; 
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
};

const FilterItem = ({ id, label, onChange, checked } : FilterItemProps) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="checkbox" onChange={onChange} checked={checked}></input>
        </div>
    );
};

export default FilterItem