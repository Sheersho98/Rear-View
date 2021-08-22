import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteReview, likeReview } from '../../../actions/reviews';

const Review = ({ review, setCurrentId }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (review.likes.length > 0) {
            return review.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{review.likes.length > 2 ? `You and ${review.likes.length - 1} others` : `${review.likes.length} like${review.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{review.likes.length} {review.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    const maxLength = 200;
    if(review.description.trim().length > maxLength){
        var newDesc = review.description.substring(0, maxLength).concat('...');
    } else {
        var newDesc = review.description;
    }

    const openReview = (e) => history.push(`/reviews/${review._id}`);

        return (
            <Card className={classes.card} raised elevation={6}>
                <ButtonBase className={classes.cardAction} onClick={openReview} component="span">
                <CardMedia className={classes.media} image={review.selectedFile} title={review.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{review.name}</Typography>
                    <Typography variant="body2">{moment(review.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === review?.creator || user?.result?._id === review?.creator) && (
                    <div className={classes.overlay2} name="edit">
                    <Button style={{ color: 'white' }} size="small" onClick={(e) => {
                        e.stopPropagation();
                        setCurrentId(review._id)
                        }}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                    </div>
                )}
                
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{review.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom component="h2">{review.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom overflow="hidden">{newDesc}</Typography>
                </CardContent>
                </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeReview(review._id))}>
                        <Likes />
                    </Button>
                    {(user?.result?.googleId === review?.creator || user?.result?._id === review?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deleteReview(review._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                    )}
                    
                </CardActions>
            </Card>
        );
    }

    export default Review;