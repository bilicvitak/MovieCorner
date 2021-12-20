import React from 'react';
import { Box, Grid } from '@mui/material';
import useStyles from './styles';
import CustomLink from './CustomLink';

function Navigation() {
    const classes = useStyles();

    return (
        <Box>
            <Grid container alignItems='strech' justifyContent='space-between' spacing={5}>
                <CustomLink label='HOME'/>
                <CustomLink label='LATEST' />
                <CustomLink label='TOP RATED' />
                <CustomLink label='GENRES' />
                <CustomLink label='MY LIST' />
            </Grid>
        </Box>
    );
}

export default Navigation;
