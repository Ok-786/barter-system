import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login, signup } from '../../Store/Actions/user';
import { axiosSignup } from '../../utils/Api';
// import { url } from '../../../Api/user';
// import useHttps from '../../Hooks/use-https';
// import { axiosSignup, fetchApiSignup } from '../../utils/Api';


const SignupForm = () => {
    const dispatch = useDispatch();

    const initFormInputs = {
        email: ' ',
        name: ' ',
        password: ' ',
        confirmPassword: ' ',
        wish_list: [],
        detail: ''
    }
    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const [formInputs, setFormInputs] = useState(initFormInputs);
    const [isLoading, setIsLoading] = useState(false);



    const onBlurHandler = (event) => {
        if (event.target.value === '') {
            setFormInputs({
                ...formInputs,
                [event.target.name]: ''
            })
        }
    }

    const handleSetFormInputs = (event) => {
        setFormInputs({
            ...formInputs,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();


        if (!(!!formInputs.name & !!formInputs.email & !!formInputs.password & !!formInputs.confirmPassword)) {
            toast.error('Please fill all fields!', toastOptions);
            return;
        }
        console.log(!(!!formInputs.name & !!formInputs.email & !!formInputs.password & !!formInputs.confirmPassword))

        if (formInputs.password !== formInputs.confirmPassword) {
            toast.error("Passwords don't match", toastOptions);
            return;
        }


        if (formInputs.name === ' ' && formInputs.email === ' ' && formInputs.password === ' ' && formInputs.confirmPassword === ' ') {
            setFormInputs({
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                wish_list: [],
                detail: ''
            })

            toast.error("Please fill all fields!", toastOptions)
            return
        }


        try {
            setIsLoading(true);
            const { data } = await axiosSignup(formInputs);
            dispatch(login(data));
            setIsLoading(false);
            toast.success("User registered successfully!", toastOptions)
            setFormInputs({
                email: ' ',
                name: ' ',
                password: ' ',
                confirmPassword: ' ',
                wish_list: [],
                detail: ''
            });
        } catch (err) {
            setIsLoading(false);
            toast.error(err.response.data.message, toastOptions)
            console.log(err)
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmitHandler}>
                <TextField placeholder='Name' value={formInputs.name.trim()} error={formInputs.name === '' ? true : false} onBlur={onBlurHandler} name="name" onChange={handleSetFormInputs} variant='outlined' type="text" size='small' fullWidth />

                <TextField placeholder='Email' style={{ marginTop: 20 }} value={formInputs.email.trim()} name="email" error={formInputs.email === '' ? true : false} onBlur={onBlurHandler} variant='outlined' onChange={handleSetFormInputs} type="email" size='small' fullWidth />

                <TextField placeholder='Password' style={{ marginTop: 20 }} value={formInputs.password.trim()} name="password" variant='outlined' error={formInputs.password === '' ? true : false} onBlur={onBlurHandler} onChange={handleSetFormInputs} type="password" size='small' fullWidth />

                <TextField placeholder='Confirm Password' style={{ marginTop: 20 }} value={formInputs.confirmPassword.trim()} name="confirmPassword" error={formInputs.confirmPassword === '' ? true : false} onBlur={onBlurHandler} variant='outlined' onChange={handleSetFormInputs} type="password" size='small' fullWidth />


                <Button type="submit" variant='contained' disabled={isLoading} color='secondary' sx={{ marginTop: '5%', borderRadius: '20px', color: 'white', fontWeight: 'bold' }} fullWidth>{isLoading ? <CircularProgress size={28} /> : 'Signup'}</Button>
            </form>
        </Fragment>
    )
}

export default SignupForm