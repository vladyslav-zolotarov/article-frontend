import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../axios';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Registration = () => {
    const { handleSubmit, control, register, reset, formState: {errors, isValid} } = useForm({mode: "onChange"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [values, setValues] = useState({ password: '', showPassword: false});

    const onRegisterSubmitForm = (data) => {
        console.log(data)
        axios
            .post('/auth/register', data)
            .then((res) => {
                setIsLoaded(false);
                console.log(res.data.token)
                if ('token' in res.data) {
                    window.localStorage.setItem('token', res.data.token);
                }
            })
            .catch(err => {
                setIsLoaded(false);
                console.log(err)
            })
    }

    const handleClickSubmitForm = () => {
        setIsLoaded(true);
        // reset();
    }


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            
            <form onSubmit={handleSubmit(onRegisterSubmitForm)}>
                <Card sx={{ width: 400, padding: 3, pt: 6, pb: 6, display: 'flex', flexDirection: 'column' }}>
                    <Typography align="center" variant="h4" sx={{mb: 5}}>Create account</Typography>
                    <TextField
                        sx={{ mb: 2 }}
                        required
                        id="outlined-required"
                        label="Name"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                        }}
                        helperText={errors?.fullName ? errors.fullName.message : ""}
                        error = {errors?.fullName ? true : false}
                        {...register("fullName", {
                            required: "This field is required. Please enter your name!",
                            minLength: {value: 3, message: "The name must be at least 3 characters long."},
                        })}
                    />
                    <TextField
                        sx={{ mb: 2 }}
                        required
                        id="outlined-required"
                        label="E-mail"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <AlternateEmailIcon />
                              </InputAdornment>
                            ),
                        }}
                        helperText={errors?.email ? errors.email.message : ""}
                        error = {errors?.email ? true : false}
                        {...register("email", {
                            required: "This field is required. Please enter your email!",
                            pattern: {value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, message : "Invalid email."}
                        })}
                    />

                    <FormControl variant="outlined" sx={{ mb: 3 }}>
                        <InputLabel error = {errors?.password ? true : false} htmlFor="outlined-adornment-password">Password</InputLabel>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    error = {errors?.password ? true : false}
                                    {...field}
                                />
                            )}
                            rules={{
                                required: "This field is required. Please enter your password!",
                                minLength: {value: 5, message: "The password must be at least 5 characters long."},
                            }}
                        />
                        <FormHelperText error = {errors?.password ? true : false}>{errors?.password ? errors.password.message : ""}</FormHelperText>
                    </FormControl>
                    <LoadingButton sx={{height: 45, width: 230, margin: "auto"}}
                        size="medium"
                        type="submit"
                        onClick={handleClickSubmitForm}
                        loading={isLoaded}
                        loadingPosition="end"
                        variant="outlined"
                        disabled={isValid ? false : true}
                    >
                        Create accounts
                    </LoadingButton>
                
                    {/* Already have an account? Log in */}
                </Card>
                {/* <input type="submit" /> */}


            </form>
        </Stack>
    )
}

export default Registration;