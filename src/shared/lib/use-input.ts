import React, { useState } from "react";

export const useInput = (
    initialValue: string
): [
    { value: string; onChange: React.ChangeEventHandler<HTMLInputElement> },
    React.Dispatch<React.SetStateAction<string>>
] => {
    const [value, setValue] = useState(initialValue);
    return [
        { value, onChange: (event) => setValue(event.target.value) },
        () => setValue(initialValue),
    ];
};
