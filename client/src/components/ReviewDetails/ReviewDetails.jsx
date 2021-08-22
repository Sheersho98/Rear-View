import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { getReview } from '../../actions/reviews';

import useStyles from './styles';

const ReviewDetails = () => {
    const { review, reviews, isLoading } = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();


    useEffect(() => {
        dispatch(getReview(id));
    }, [id])

    if (!review) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    };

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" display="block" component="h2" align="center" gutterBottom >{review.title}</Typography>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={review.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={review.title} align="center" />
                    </div>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{review.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p" className={classes.description}>{review.description}</Typography>
                    <Typography variant="h6">Created by: {review.name}</Typography>
                    <Typography variant="body1">{moment(review.createdAt).fromNow()}</Typography>
                    <Button textSizeSmall className={classes.button} component={Link} to="/reviews" variant="contained">Back to Home</Button>
                </div>

            </div>
        </Paper>
    );
};

export default ReviewDetails;