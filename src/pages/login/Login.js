
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginLoader from '../../components/loaders/LoginLoader';
import { isLoggedInVar, userPermissions } from '../../store/cache';
import { ACCESS_TOKEN, APP_NAME, LOGIN_URL, MY_PERMISSIONS, PRIMARY_COLOR } from '../../utils/constants';
import { showToastTop } from '../../utils/helpers';

import './Login.css';

import logo from '../../assets/logo.png'

const loginUrl = LOGIN_URL;

const Login = () => {

    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (isLoggedInVar()) {
            navigate('/dashboard');
        }
    }, [navigate])

    // The use of location.state to preserve the previous location so you can send the user there after they authenticate
    let from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {


        setLoading(true);

        try {
            const result = await axios.post(loginUrl, {
                ...data
            });

            if (result.status === 200) {
                setLoading(false);

                localStorage.setItem(ACCESS_TOKEN, JSON.stringify(result.data.access_token));

                isLoggedInVar(true);

                localStorage.setItem(MY_PERMISSIONS, JSON.stringify(result.data.permissions));

                userPermissions(result.data.permissions)

                // Navigate User to dashboard
                // The use of navigate("...", { replace: true }) to replace the /login route in the history stack so the user doesn't return to the login page when clicking the back button after logging in

                // navigate(from, { replace: true });
                navigate('/dashboard')
            }

        } catch (error) {



            setLoading(false);

            if (error.response.request.status && error.response.request.status === 401) {
                showToastTop(`Wrong credentials`);
            } else {
                showToastTop(`${error.message}`);
            }
        }

    }



    return (
        <LoginLoader loading={loading} >
            <div className='login-box'>
                <Paper sx={{
                    width: 400,
                    height: 500,
                    borderRadius: '0.8rem'
                }} elevation={12}>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <img src={logo} alt="Logo" style={{
                                marginTop: 25,
                                width: 100
                            }} />
                            <Typography variant="h6" component="h6" sx={{
                                marginY: 1
                            }}>
                                {APP_NAME}
                            </Typography>

                            <Typography variant="p" component="p">
                                Login
                            </Typography>

                            <Box sx={{
                                padding: '0 20px'
                            }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    {...register("email", { required: "Email is required." })}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    {...register("password", { required: "Password is required." })}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            </Box>



                        </div>

                        <Box sx={{
                            display: 'flex',
                            padding: '0 20px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginY: 1
                        }}>


                            <Button type="submit" size="large" sx={{ width: '100%', backgroundColor: PRIMARY_COLOR }} variant="contained">
                                Login
                            </Button>

                        </Box>


                        {/* <Typography sx={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Link to='#'>Custom Link</Link>
                        </Typography> */}

                    </form>

                </Paper>

            </div>
        </LoginLoader>
    )
}

export default Login
