import { useState, useRef, useMemo, useContext, FormEventHandler } from "react";

import { Table } from "../widgets";
import { Modal, Button, useFetch } from "../shared";
import { CreateNewCarForm, CreateOrEditDropDown } from "../features";
import { Car } from "../entitites/cars";
import { Context } from "../app/providers/context";

export const MainPage = () => {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    const { status } = useFetch<Car[]>("https://myfakeapi.com/api/cars/");

    //@ts-ignore
    const { cars, createNewCar, updateCar, deleteCar } = useContext(Context);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const formData = event.currentTarget;
        const {
            car_model,
            car_vin,
            car_color,
            car_model_year,
            price,
            availability,
        } = formData;

        const updatedCar = {
            //@ts-ignore
            id: selectedCar?.id || cars.length + 1,
            car_model: car_model.value,
            car_vin: car_vin.value,
            car_color: car_color.value,
            car_model_year: car_model_year.value,
            price: price.value,
            availability: availability.checked,
        };

        if (selectedCar) {
            updateCar(updatedCar);
            setSelectedCar(null);
        } else {
            createNewCar(updatedCar);
        }

        // @ts-ignore
        event.target.reset();
        if (dialogRef.current) dialogRef.current.close();
    };

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Model",
            accessorKey: "car_model",
        },
        {
            header: "VIN",
            accessorKey: "car_vin",
        },
        {
            header: "Color",
            accessorKey: "car_color",
        },
        {
            header: "Year",
            accessorKey: "car_model_year",
        },
        {
            header: "Price",
            accessorKey: "price",
        },
        {
            header: "Availability",
            accessorKey: "availability",
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
            ),
        },
    ];

    const memoizedCars = useMemo(() => cars, [cars]);
    const memoizedColumns = useMemo(() => columns, []);

    return (
        <section className="scrollbar w-full">
            <h1>React Table</h1>

            <Button
                //@ts-ignore
                onClick={() => {
                    if (dialogRef.current) dialogRef.current.showModal();
                }}
            >
                Click
            </Button>

            {status === "fulfilled" && (
                <Table data={memoizedCars} columns={memoizedColumns} />
            )}

            <Modal title="Add new car" ref={dialogRef}>
                <CreateNewCarForm car={selectedCar} onSubmit={onSubmit} />
            </Modal>
        </section>
    );
};
