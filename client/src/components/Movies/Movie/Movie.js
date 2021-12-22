import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import StarIcon from "@mui/icons-material/Star";
import useStyles from './styles';
import { watchMovie, likeMovie, dislikeMovie } from '../../../actions/movies';

function Movie({ movie, setCurrentId }) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const disabled = Boolean(!user?.result);

    const genres = movie.genres == null ? "N/A" : movie.genres.map((genre, i) => {
        var genres = genre;

        if (movie.genres.length - 1 > i) {
            genres = genres + ", ";
        }

        return genres;
    })

    const Likes = () => {
        if (disabled) {
            return movie.likes.find((id) => id === user?.result?._id)
                ? (
                    <><ThumbUpAltIcon /></>
                ) : (
                    <><ThumbUpOffAltIcon /></>
                );
        }

        return movie.likes.find((id) => id === user?.result?._id)
            ? (
                <><ThumbUpAltIcon sx={{ color: '#51d1e1' }} /></>
            ) : (
                <><ThumbUpOffAltIcon sx={{ color: '#51d1e1' }} /></>
            );
    };

    const Dislikes = () => {
        if (disabled) {
            return movie.dislikes.find((id) => id === user?.result?._id)
                ? (
                    <><ThumbDownAltIcon /></>
                ) : (
                    <><ThumbDownOffAltIcon /></>
                );
        }

        return movie.dislikes.find((id) => id === user?.result?._id)
            ? (
                <><ThumbDownAltIcon sx={{ color: '#c62828' }} /></>
            ) : (
                <><ThumbDownOffAltIcon sx={{ color: '#c62828' }} /></>
            );
    };

    const Watched = () => {
        return movie.watched.find((id) => id === user?.result?._id)
            ? (
                <>
                    <Button variant="contained" size="small" disabled={!user?.result}  onClick={() => dispatch(watchMovie(movie._id))}>
                        WATCHED
                    </Button>
                </>
            ) : (
                <>
                    <Button variant="outlined" size="small" disabled={!user?.result} onClick={() => dispatch(watchMovie(movie._id))}>
                        MARK AS WATCHED
                    </Button>
                </>
            )
    };

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardMedia component="img"
                alt={movie.title}
                height="400"
                image={movie.img_uri}
            />
            <CardContent sx={{ height: 150 }}>
                <div className={classes.div}>
                    <Typography sx={{ maxWidth: 200 }} gutterBottom>{movie.title}</Typography>
                    <div className={classes.div}>
                        <StarIcon sx={{ color: "gold", paddingRight: 0.5, maxWidth: 15 }} />
                        <Typography variant="body2">{movie.imdb_rating}</Typography>
                    </div>
                </div>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {movie.year} · {movie.runtime} min · {genres}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom className={classes.plot}>
                    {movie.plot}
                </Typography>
            </CardContent>
            <CardActions className={classes.div}>
                <div>
                    <IconButton disabled={!user?.result} onClick={() => dispatch(likeMovie(movie._id))}>
                        <Likes />
                    </IconButton>
                    <IconButton disabled={!user?.result} onClick={() => dispatch(dislikeMovie(movie._id))}>
                        <Dislikes />
                    </IconButton>
                </div>
                <Watched />
            </CardActions>
        </Card>
    );
}

export default Movie;
