import { FC, ChangeEventHandler } from "react";

interface SearchProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Search: FC<SearchProps> = ({ value, onChange }) => {
    return (
        <input
            type="search"
            value={value}
            onChange={onChange}
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-button"
            className="rounded-md border-2 border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
        />
    );
};
