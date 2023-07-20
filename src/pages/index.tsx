import { useState, useRef, useMemo, useContext, FormEventHandler } from "react";

import { Table } from "../widgets";
import { Modal, Search, useFetch, useInput } from "../shared";
import { CreateNewCarForm, CreateOrEditDropDown } from "../features";
import { Car } from "../entitites/cars";
import { Context, ContextValue } from "../app/providers/context";

interface FormData {
    car: HTMLInputElement;
    car_model: HTMLInputElement;
    car_vin: HTMLInputElement;
    car_color: HTMLInputElement;
    car_model_year: HTMLInputElement;
    price: HTMLInputElement;
    availability: HTMLInputElement;
}

export const MainPage = () => {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [searchProps] = useInput("");

    const { status } = useFetch("https://myfakeapi.com/api/cars/");

    const { cars, createNewCar, updateCar, deleteCar } = useContext(
        Context
    ) as ContextValue;

    const dialogRef = useRef<HTMLDialogElement>(null);

    const onSubmit: FormEventHandler<HTMLFormElement & FormData> = event => {
        event.preventDefault();

        const formData = event.currentTarget;
        const {
            car,
            car_model,
            car_vin,
            car_color,
            car_model_year,
            price,
            availability
        } = formData;

        const updatedCar = {
            id: selectedCar?.id || cars.length + 1,
            car: car.value,
            car_model: car_model.value,
            car_vin: car_vin.value,
            car_color: car_color.value,
            car_model_year: parseInt(car_model_year.value),
            price: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(parseFloat(price.value.replace(/[$,]+/g, ""))),
            availability: availability.checked
        };

        if (selectedCar) {
            updateCar(updatedCar);
            setSelectedCar(null);
        } else {
            createNewCar(updatedCar);
        }

        event.currentTarget.reset();
        if (dialogRef.current) dialogRef.current.close();
    };

    const columns = [
        {
            header: "ID",
            accessorKey: "id"
        },
        {
            header: "Company",
            accessorKey: "car"
        },
        {
            header: "Model",
            accessorKey: "car_model"
        },
        {
            header: "VIN",
            accessorKey: "car_vin"
        },
        {
            header: "Color",
            accessorKey: "car_color"
        },
        {
            header: "Year",
            accessorKey: "car_model_year"
        },
        {
            header: "Price",
            accessorKey: "price"
        },
        {
            header: "Availability",
            accessorKey: "availability"
        },
        {
            header: "Actions",
            cell: (info: any) => (
                <CreateOrEditDropDown
                    onEdit={() => {
                        setSelectedCar(info.row.original);
                        if (dialogRef.current) dialogRef.current.showModal();
                    }}
                    onDelete={() => {
                        const result = confirm(
                            "Are you sure you want to delete this item?"
                        );
                        if (!result) return;
                        deleteCar(info.row.original.id);
                    }}
                />
            )
        }
    ];

    const memoizedCars = useMemo(() => cars, [cars]);
    const memoizedColumns = useMemo(() => columns, []);

    return (
        <main className="w-full">
            <h1 className="font-semibold">React Table</h1>

            <div className="flex justify-between py-4 text-lg">
                <button
                    onClick={() => {
                        if (dialogRef.current) dialogRef.current.showModal();
                        setSelectedCar(null);
                    }}
                    className="justify-self-center rounded-lg bg-blue-500 px-4 py-2 font-semibold uppercase text-white transition-colors duration-150 active:bg-blue-700"
                >
                    Create new car
                </button>

                <Search {...searchProps} />
            </div>

            {status === "fulfilled" && (
                <Table
                    data={memoizedCars}
                    columns={memoizedColumns}
                    searchProps={searchProps}
                />
            )}

            <Modal
                title={!!!selectedCar ? "Add new car" : "Edit car"}
                ref={dialogRef}
            >
                <CreateNewCarForm
                    car={selectedCar}
                    onSubmit={onSubmit}
                />
            </Modal>
        </main>
    );
};
