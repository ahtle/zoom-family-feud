import React, { createContext, useReducer } from 'react';
import { AppReducer, reducerState, initialState } from '../reducers/reducer';


// Start context
export const AppContext = createContext<{
    state: reducerState,
    dispatch: React.Dispatch<any>,
}>({
    state: initialState,
    dispatch: () => null,
});

type Props = {
    children: React.ReactNode
};

export const AppProvider = ({children}: Props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </AppContext.Provider>
    );
};