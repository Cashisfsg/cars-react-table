import { FC, FormEventHandler } from "react";
import { Car } from "../../entitites/cars";

interface CreateNewCarFormProps {
    car: Car | null;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

export const CreateNewCarForm: FC<CreateNewCarFormProps> = ({
    car,
    onSubmit
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="m-auto grid max-w-md place-items-start gap-4 text-lg"
        >
            <label className="grid w-full place-items-start gap-2">
                Company
                <input
                    type="text"
                    name="car"
                    defaultValue={car?.car || ""}
                    readOnly={!!car}
                    required
                    className="w-full rounded-lg border-2 px-4 py-2"
                />
            </label>
            <label className="grid w-full place-items-start gap-2">
                Model
                <input
                    type="text"
                    name="car_model"
                    defaultValue={car?.car_model || ""}
                    readOnly={!!car}
                    required
                    className="w-full rounded-lg border-2 px-4 py-2"
                />
            </label>
            <label className="grid w-full place-items-start gap-2">
                VIN
                <input
                    type="text"
                    name="car_vin"
                    defaultValue={car?.car_vin || ""}
                    readOnly={!!car}
                    required
                    className="w-full rounded-lg border-2 px-4 py-2"
                />
            </label>
            <label className="grid w-full place-items-start gap-2">
                Color
                <input
                    type="text"
                    name="car_color"
                    defaultValue={car?.car_color || ""}
                    required
                    className="w-full rounded-lg border-2 px-4 py-2"
                />
            </label>
            <label className="grid w-full place-items-start gap-2">
                Year
                <input
                    type="number"
                    name="car_model_year"
                    defaultValue={car?.car_model_year || ""}
                    readOnly={!!car}
                    min={1900}
                    max={2023}
                    required
                    className="w-full rounded-lg border-2 px-4 py-2"
                />
            </label>
            <label className="grid w-full place-items-start gap-2">
                Price
                <input
                    type="text"
                    name="price"
                    defaultValue={car?.price.replace(/[$,]+/g, "")}
                    min={0}
                    required
                    className="w-full rounded-lg border-2 px-4 py-2"
                />
            </label>
            <label className="flex items-center gap-4">
                <input
                    type="checkbox"
                    name="availability"
                    defaultChecked={car?.availability}
                    className="h-6 w-6 rounded"
                />
                Availability
            </label>
            <button
                type="submit"
                className="justify-self-center rounded-lg bg-blue-500 px-4 py-2 font-semibold uppercase text-white transition-colors duration-150 active:bg-blue-700"
            >
                {!!car ? "Save changes" : "Create car"}
            </button>
        </form>
    );
};
