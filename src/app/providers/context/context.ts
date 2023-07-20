import { Car } from "../../../entitites/cars";

type Action =
    | { type: "create"; payload: Car[] | Car }
    | { type: "update"; payload: Car }
    | { type: "delete"; payload: number };

export const initialState: Array<Car> = [];

export function Reducer(state: Car[], action: Action): Car[] {
    switch (action.type) {
        case "create":
            if (Array.isArray(action.payload))
                return [...state, ...action.payload];
            else return [...state, { ...action.payload, id: state.length + 1 }];
        case "update":
            const selectedIndex = state.findIndex(
                item => item.id === action.payload.id
            );
            return [
                ...state.slice(0, selectedIndex),
                action.payload,
                ...state.slice(selectedIndex + 1)
            ];
        case "delete":
            return state.filter(e => e.id !== action.payload);
        default:
            return state;
    }
}
