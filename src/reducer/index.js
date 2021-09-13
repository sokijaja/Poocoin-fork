const initialState = {
    tokenAddress: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_TOKENADDRESS':
            return {
                ...state,
                tokenAddress: action.payload
            };
        default:
            return state;
    }
}