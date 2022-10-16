import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { signin } from '../../Store/Actions/user';
import { toast } from 'react-toastify';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { axiosSignin } from '../../utils/Api';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/Actions/user';
// import { axiosSignin } from '../../utils/Api';

const SigninForm = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem('chat-app-user')) {
    //         navigate('/setAvatar')
    //     }
    // }, [navigate])

    const initFormInputs = {
        email: ' ',
        password: ' ',
    }
    const [formInputs, setFormInputs] = useState(initFormInputs);

    const [isLoading, setIsLoading] = useState(false);



    const handlerOnFocus = (event) => {
        event.target.value === '' &&
            setFormInputs({
                ...formInputs,
                [event.target.name]: ''
            })
    }

    const handleSetFormInputs = (event) => {
        setFormInputs({
            ...formInputs,
            [event.target.name]: event.target.value
        })
    }

    // const onSubmitHandler = async (e) => {
    //     e.preventDefault();

    //     // await sendRequest({
    //     //     url: `${url}/user/login`,
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify(formInputs)
    //     // });


    // }
    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const onBlurHandler = (event) => {
        if (event.target.value === '') {
            setFormInputs({
                ...formInputs,
                [event.target.name]: ''
            })
        }
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!(!!formInputs.email & !!formInputs.password)) {
            toast.error('Please fill all fields!', toastOptions);
            return;
        }
        if (formInputs.email === ' ' && formInputs.password === ' ') {
            setFormInputs({
                email: '',
                password: '',
            })

            toast.error("Please fill all fields!", toastOptions)
            return
        }

        try {
            setIsLoading(true);
            const { data } = await axiosSignin(formInputs);
            setIsLoading(false);
            dispatch(login(data));
            // navigate('/setAvatar')

            console.log(data)
            toast.success("User loggedin successfully!", toastOptions)
        } catch (err) {
            setIsLoading(false);
            err.response.data ? toast.error(err.response.data.message, toastOptions) : toast.error(err.message, toastOptions)
            console.log(err, "aaa")
        }

    }


    return (
        <form onSubmit={onSubmitHandler}>

            <TextField InputProps={{
                startAdornment: <EmailOutlinedIcon style={{ color: 'lightgrey', marginRight: '10px' }} />
            }} placeholder='Email' value={formInputs.email.trim()} name="email" error={formInputs.email === '' ? true : false} onFocus={handlerOnFocus} variant='outlined' onChange={handleSetFormInputs} type="email" size='small' fullWidth />

            <TextField InputProps={{
                startAdornment: <LockOutlinedIcon style={{ color: 'lightgrey', marginRight: '10px' }} />
            }} sx={{ marginTop: '5%' }} placeholder='Password' value={formInputs.password.trim()} name="password" variant='outlined' error={formInputs.password === '' ? true : false} onFocus={handlerOnFocus} onChange={handleSetFormInputs} type="password" size='small' fullWidth />
            <br />
            <br />
            <Button onClick={(e) => {
                onSubmitHandler(e)
            }} color="secondary" disabled={isLoading ? true : false} variant='contained' sx={{ marginTop: '2%', borderRadius: '20px', color: 'white', fontWeight: 'bold' }} fullWidth>{isLoading ? <CircularProgress size={28} /> : 'Signin'}</Button>

        </form>
    )
}

export default SigninForm