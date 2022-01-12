import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { ThemeProvider, createTheme } from '@mui/material';
import { ALL_MOVIES, GENRES, HOME, LATEST, TOP_RATED } from './constants/actionTypes';

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#c62828',
                light: '#d15353',
                dark: '#8a1c1c'
            },
            secondary: {
                main: '#26c6da',
                light: '#51d1e1',
                dark: '#1a8a98'
            },
            mode: 'dark'
        },
        typography: {
            fontFamily: 'Montserrat'
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home filter={HOME} />} />
                    <Route path="/home" element={<Home filter={HOME} />} />
                    <Route path="/latest" element={<Home filter={LATEST} />} />
                    <Route path="/top-rated" element={<Home filter={TOP_RATED} />} />
                    <Route path="/genres" element={<Home filter={GENRES} />} />
                    <Route path="/all-movies" element={<Home filter={ALL_MOVIES} />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
