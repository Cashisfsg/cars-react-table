import { FC, FormEventHandler } from "react";
import { Car } from "../../entitites/cars";

interface CreateNewCarFormProps {
    car: Car | null;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

export const CreateNewCarForm: FC<CreateNewCarFormProps> = ({
    car,
    onSubmit,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <label>
                Model
                <input
                    type="text"
                    name="car_model"
                    defaultValue={car?.car_model || ""}
                    readOnly={!!car}
                    required
                />
            </label>
            <label>
                VIN
                <input
                    type="text"
                    name="car_vin"
                    defaultValue={car?.car_vin || ""}
                    readOnly={!!car}
                    required
                />
            </label>
            <label>
                Color
                <input
                    type="text"
                    name="car_color"
                    defaultValue={car?.car_color || ""}
                    required
                />
            </label>
            <label>
                Year
                <input
                    type="text"
                    name="car_model_year"
                    defaultValue={car?.car_model_year || ""}
                    readOnly={!!car}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type="text"
                    name="price"
                    defaultValue={car?.price || ""}
                    required
                />
            </label>
            <label>
                <input
                    type="checkbox"
                    name="availability"
                    defaultChecked={car?.availability}
                />
                Availability
            </label>
            <button type="submit">
                {!!car ? "Save changes" : "Create car"}
            </button>
        </form>
    );
};
