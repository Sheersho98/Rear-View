import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Review from './Review/Review';
import useStyles from './styles';

const Reviews = ({ setCurrentId  }) => {
    const { reviews, isLoading } = useSelector((state) => state.reviews);
    const classes = useStyles();

    //console.log(reviews);
    if(!reviews.length && !isLoading) return 'No Reviews';
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {reviews.map((review) => (
                    <Grid key={review.id} item xs={12} sm={12} md={8} lg={4}> 
                        <Review review={review} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Reviews;