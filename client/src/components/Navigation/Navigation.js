import React from 'react';
import { Box, Grid } from '@mui/material';
import CustomLink from './CustomLink';

function Navigation() {
    return (
        <Box>
            <Grid container alignItems='strech' justifyContent='space-between' spacing={5}>
                <CustomLink label='HOME' uri='/home' />
                <CustomLink label='LATEST' uri='/latest' />
                <CustomLink label='TOP RATED' uri='/top-rated' />
                <CustomLink label='GENRES' uri='/genres' />
                <CustomLink label='ALL MOVIES' uri='/all-movies' />
            </Grid>
        </Box>
    );
}

export default Navigation;
