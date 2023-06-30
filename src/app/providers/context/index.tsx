import React, { useReducer } from "react";
import { initialState, Reducer } from "./context";

const Context = React.createContext(initialState);

const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const value = {
        cars: state,
        createNewCar: (cars: any) => {
            dispatch({ type: "create", payload: cars });
        },
        updateCar: (car: any) => {
            dispatch({ type: "update", payload: car });
        },
        deleteCar: (id: any) => {
            dispatch({ type: "delete", payload: id });
        },
    };

    //@ts-ignore
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
