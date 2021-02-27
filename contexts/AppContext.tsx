
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext(null);

type Props = {
    children: React.ReactNode
};

export const AppProvider = ({children}: Props) => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);

    return (
        <AppContext.Provider value={{
            numberOfPlayers,
            setNumberOfPlayers,
        }}>
            {children}
        </AppContext.Provider>
    );
};