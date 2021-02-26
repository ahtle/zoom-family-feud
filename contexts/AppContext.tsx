
import React, { createContext, ReactNode } from 'react';

export const AppContext = createContext(null);

type Props = {
    children: ReactNode
};

export const AppProvider = ({children}: Props) => {
    const [state, setState] = React.useState({
        numberOfPlayers: 0,
        text: 'world',
    });

    function setNumberOfPlayer(numberOfPlayers: number) {
        setState({...state, numberOfPlayers});
    }
    function setText(text: string) {
        setState({...state, text});
    }
  
    return (
        <AppContext.Provider value={{
            state,
            setNumberOfPlayer,
            setText,
        }}>
            {children}
        </AppContext.Provider>
    );
};