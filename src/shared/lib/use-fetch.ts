import { useReducer, useEffect, useContext } from "react";
import { Context } from "../../app/providers/context";

interface State<T> {
    data: undefined | T;
    status: "idle" | "pending" | "fulfilled" | "rejected";
    error: undefined | string;
}

type Action<T> =
    | { type: "pending" }
    | { type: "fulfilled"; payload: T }
    | { type: "rejected"; payload: string };

export function useFetch<T = unknown>(
    query: string,
    requestOptions?: RequestInit
): State<T> {
    const initialState: State<T> = {
        data: undefined,
        status: "idle",
        error: undefined,
    };

    const reducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case "pending":
                return { ...state, status: "pending" };
            case "fulfilled":
                return { ...state, status: "fulfilled", data: action.payload };
            case "rejected":
                return { ...state, status: "rejected", error: action.payload };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    //@ts-ignore
    const { createNewCar } = useContext(Context);

    useEffect(() => {
        if (!query) return;

        const controller = new AbortController();
        (async () => {
            dispatch({ type: "pending" });

            try {
                const response = await fetch(query, requestOptions);

                if (response.status !== 200) {
                    throw new Error("Something went wrong");
                }

                const data = await response.json();
                dispatch({ type: "fulfilled", payload: data.cars });
                createNewCar(data.cars);
            } catch (error: any) {
                dispatch({
                    type: "rejected",
                    payload: error.message as string,
                });
            }
        })();

        return () => {
            controller.abort();
        };
    }, [query, requestOptions]);

    return state;
}
