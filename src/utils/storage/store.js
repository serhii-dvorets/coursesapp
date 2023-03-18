import { createContext, useReducer } from "react";

const initialState = {
    token: ''
}
export const Store = createContext(initialState);

function reducer(state, action) {
    switch (action.type) {
        case 'SET_TOKEN': {
            return {...state, token: action.payload.token}
        }
    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
  
    return <Store.Provider value={value}>{children}</Store.Provider>;
  }