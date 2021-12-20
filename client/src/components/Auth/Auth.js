import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import useStyles from './styles';
import { Button, Grid, Paper, Typography, Container } from '@mui/material';
import logo from '../../images/logo.png';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth='xs' style={{ padding: '40px', textAlign: 'center' }}>
            <NavLink to="/"><img src={logo} height="120px" alt="logo" /></NavLink>
            <Paper className={classes.paper}>
                <Typography variant="h5" style={{ fontWeight: '500' }}>
                    {isSignUp ? 'SIGN UP' : 'SIGN IN'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <Input name="name" label="Full Name" handleChange={handleChange} autofocus />
                            )
                        }

                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && (
                                <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                            )
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have account? Sign In' : 'Don\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;

