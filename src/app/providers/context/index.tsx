import React, { useReducer } from "react";
import { initialState, Reducer } from "./context";
import { Car } from "../../../entitites/cars";

export interface ContextValue {
    cars: Car[];
    createNewCar: (cars: Car[] | Car) => void;
    updateCar: (car: Car) => void;
    deleteCar: (id: number) => void;
}

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const value: ContextValue = {
        cars: state,
        createNewCar: cars => {
            dispatch({ type: "create", payload: cars });
        },
        updateCar: car => {
            dispatch({ type: "update", payload: car });
        },
        deleteCar: id => {
            dispatch({ type: "delete", payload: id });
        }
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
