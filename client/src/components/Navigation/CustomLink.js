import React from 'react';
import { Grid, Typography, Link } from '@mui/material';
import useStyles from './styles';

function CustomLink({ label, uri }) {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Link className={classes.link} underline='hover' href={uri}>
                <Typography className={classes.text}>{label}</Typography>
            </Link>
        </Grid>
    );
}

export default CustomLink;
