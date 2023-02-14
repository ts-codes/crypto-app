import { useEffect } from 'react';
import { createContext, useReducer, useState } from 'react';
import cryptoReducer from './cryptoReducer';

export const CryptoContext = createContext();

const CryptoProvider = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState('usd');

    const initialState = {
        favourites: [],
    };

    const [state, dispatch] = useReducer(cryptoReducer, initialState, () => {
        const localData = localStorage.getItem('crypto_favourites');
        return localData ? { favourites: JSON.parse(localData) } : initialState;
    });

    useEffect(() => {
        localStorage.setItem(
            'crypto_favourites',
            JSON.stringify(state.favourites)
        );
    }, [state.favourites]);

    const addFavourite = (coinId) => {
        dispatch({
            type: 'ADD_FAVOURITE',
            payload: coinId,
        });
    };

    const removeFavourite = (coinId) => {
        dispatch({
            type: 'REMOVE_FAVOURITE',
            payload: coinId,
        });
    };

    const deleteAllFavourites = () => {
        dispatch({
            type: 'DELETE_ALL_FAVOURITES',
        });
        localStorage.removeItem('crypto_favourites');
    };

    return (
        <CryptoContext.Provider
            value={{
                favourites: state.favourites,
                addFavourite,
                removeFavourite,
                selectedCurrency,
                setSelectedCurrency,
                deleteAllFavourites,
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
};

export default CryptoProvider;
