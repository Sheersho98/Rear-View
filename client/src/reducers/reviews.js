import { FETCH_ALL, FETCH_REVIEW, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';
export default (state = { isLoading: true , reviews: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case UPDATE:
            return { ...state, reviews: state.reviews.map((review) => (review._id === action.payload._id ? action.payload : review)) };
        case FETCH_ALL: 
        return {
            ...state,
            reviews: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
        };
        case FETCH_BY_SEARCH:
            return {
                ...state, reviews: action.payload
            };
        case FETCH_REVIEW:
            return {
                ...state, review: action.payload
            };
        case CREATE:
            return { ...state, reviews: [ ...state, action.payload] };
        case DELETE:
            return { ...state, reviews: state.reviews.filter((review) => review._id !== action.payload) };
        case LIKE:
            return { ...state, reviews: state.reviews.map((review) => (review._id === action.payload._id ? action.payload : review)) };
        default:
            return state;
    }
}