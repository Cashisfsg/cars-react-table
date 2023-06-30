export const initialState = [];

export const Reducer = (state: any, action: any) => {
    switch (action.type) {
        case "create":
            if (Array.isArray(action.payload))
                return [...state, ...action.payload];
            else return [...state, { ...action.payload, id: state.length + 1 }];
        case "update":
            const selectedIndex = state.findIndex(
                (item: any) => item.id === action.payload.id
            );
            return [
                ...state.slice(0, selectedIndex),
                action.payload,
                ...state.slice(selectedIndex + 1),
            ];
        case "delete":
            return state.filter((e: any) => e.id !== action.payload);
        default:
            return state;
    }
};
