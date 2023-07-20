import { useReducer, useEffect, useContext } from "react";
import { Context, ContextValue } from "../../app/providers/context";
import { Car } from "../../entitites/cars";

interface State {
    status: "idle" | "pending" | "fulfilled" | "rejected";
    error: undefined | string;
}

type Action<T> =
    | { type: "pending" }
    | { type: "fulfilled"; payload: T }
    | { type: "rejected"; payload: string };

export function useFetch(query: string, requestOptions?: RequestInit): State {
    const initialState: State = {
        status: "idle",
        error: undefined
    };

    const { createNewCar } = useContext(Context) as ContextValue;

    const reducer = (state: State, action: Action<Car>): State => {
        switch (action.type) {
            case "pending":
                return { ...state, status: "pending" };
            case "fulfilled":
                createNewCar(action.payload);
                return { ...state, status: "fulfilled" };
            case "rejected":
                return { ...state, status: "rejected", error: action.payload };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!query) return;

        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            dispatch({ type: "pending" });

            try {
                const response = await fetch(query, {
                    ...requestOptions,
                    signal
                });

                if (response.status !== 200) {
                    throw new Error("Something went wrong");
                }

                const data = await response.json();
                dispatch({ type: "fulfilled", payload: data.cars });
            } catch (error) {
                dispatch({
                    type: "rejected",
                    payload: (error as Error).message
                });
            }
        })();

        return () => {
            controller.abort();
        };
    }, [query, requestOptions]);

    return state;
}
