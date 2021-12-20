import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Movies from '../Movies/Movies';
import useStyles from './styles';

function Home() {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Grid container rowSpacing={20} columnSpacing={16}>
                <Grid item xs={12} md={12}>
                    <Header />
                </Grid>
                <Grid item xs={12} md={2}>
                    <div style={{ textAlign:'center'}}><Navigation /></div>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Movies />
                    <Movies />
                    <Movies />
                    <Movies />
                    <Movies />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
