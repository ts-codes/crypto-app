const cryptoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVOURITE':
            return {
                ...state,
                favourites: [...state.favourites, action.payload],
            };
        case 'REMOVE_FAVOURITE':
            return {
                ...state,
                favourites: [...state.favourites].filter(
                    (item) => item.id !== action.payload.id
                ),
            };
        case 'DELETE_ALL_FAVOURITES':
            return {
                ...state,
                favourites: [],
            };
        default:
            return state;
    }
};

export default cryptoReducer;
