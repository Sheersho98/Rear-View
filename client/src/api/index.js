import axios from 'axios';

const API = axios.create({ baseURL: 'https://rearview-project.herokuapp.com' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchReview = (id) => API.get(`/reviews/${id}`);
export const fetchReviews = (page) => API.get(`/reviews?page=${page}`);
export const fetchReviewBySearch = (searchQuery) => API.get(`/reviews/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createReview = (newReview) => API.post('/reviews', newReview);
export const updateReview = (id, updatedReview) => API.patch(`/reviews/${id}`, updatedReview);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);
export const likeReview = (id) => API.patch(`/reviews/${id}/likeReview`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);