
import React, { Fragment, useState } from 'react'
import { Container, Grid, Paper } from '@mui/material';
import styles from './AuthenticationPage.module.css';
import NavigationTab from '../components/NavigationTab/NavigationTab';
import SignupForm from '../components/Signup/Signup';
import SigninForm from '../components/Signin/Signin';
import Logo from '../assets/logo.png';

const AuthenticationPage = () => {
    const [active, setActive] = useState('Signin');

    const setActiveHandler = (component) => {
        setActive(component);
    }

    return (
        <div style={{ backgroundColor: 'rgba(255, 217, 255 ,.4 )', width: '100%', height: '100vh' }}>
            <Container maxWidth='xs' style={{ paddingTop: '6%' }}>
                <Grid container spacing={0} >
                    <Paper className={styles['topContainer']}>
                        <Grid item xs={12}>
                            <div className={styles['centerLogo']}>
                                <img src={Logo} alt="aaaa" width='100px' />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <NavigationTab active={active} setActiveHandler={setActiveHandler} />
                            <div className={styles['form']} >
                                {
                                    active === 'Signup' ? <SignupForm /> : <SigninForm />
                                }
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default AuthenticationPage