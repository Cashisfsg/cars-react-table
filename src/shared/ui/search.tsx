import { FC, ChangeEventHandler } from "react";

interface SearchProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Search: FC<SearchProps> = ({ value, onChange }) => {
    return (
        <div className="flex w-full flex-wrap items-stretch">
            <input
                type="search"
                value={value}
                onChange={onChange}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-button"
                className="block flex-auto rounded-l border-2 border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-blue-500"
            />

            <button
                type="button"
                id="search-button"
                className="flex items-center rounded-l-none rounded-r bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};
