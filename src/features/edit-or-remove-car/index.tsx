import { FC, useRef } from "react";

import { useOutsideClick } from "../../shared";

import { TfiMoreAlt } from "react-icons/tfi";
import { RiEdit2Fill } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";

interface DropDownProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const CreateOrEditDropDown: FC<DropDownProps> = ({
    onEdit,
    onDelete,
}) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);

    const handleClickOutside = () => {
        if (detailsRef.current) detailsRef.current.removeAttribute("open");
    };

    useOutsideClick(detailsRef, handleClickOutside);

    const goToEditMode = () => {
        onEdit();
        if (detailsRef.current) detailsRef.current.removeAttribute("open");
    };

    const removeCar = () => {
        onDelete();
        if (detailsRef.current) detailsRef.current.removeAttribute("open");
    };

    return (
        <details ref={detailsRef} className="relative inline w-max">
            <summary className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-300">
                <TfiMoreAlt className="text-2xl" />
            </summary>
            <ul className="absolute right-0 top-[calc(100%+0.5rem)] z-[1] w-32 rounded-lg border bg-white text-lg shadow-lg">
                <li
                    onClick={goToEditMode}
                    className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-neutral-100"
                >
                    <RiEdit2Fill className="drop-shadow-2xl" />
                    Edit
                </li>
                <li
                    onClick={removeCar}
                    className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-neutral-100"
                >
                    <AiTwotoneDelete />
                    Delete
                </li>
            </ul>
        </details>
    );
};
