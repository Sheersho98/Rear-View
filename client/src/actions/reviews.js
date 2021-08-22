import { FETCH_ALL, FETCH_REVIEW, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators
export const getReview = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchReview(id);

        //console.log(data);

        dispatch({ type: FETCH_REVIEW, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getReviews = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchReviews(page);

        //console.log(data);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getReviewBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchReviewBySearch(searchQuery);
        //console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createReview = (review) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createReview(review);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updateReview = (id, review) => async (dispatch) => {
    try {
        const { data } = await api.updateReview(id, review);
        
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteReview = (id) => async (dispatch) => {
    try {
        await api.deleteReview(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeReview = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeReview(id);
        
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}