import { Button, Grid } from '@mui/material'
import React, { Fragment } from 'react'


const Navigation = (props) => {

    const onClickHandler = (event) => {
        props.setActiveHandler(event.target.value)
    }


    return (
        <Fragment>
            <Grid container textAlign='center'>
                <Grid item xs={6}>
                    <Button color='secondary' fullWidth style={props.active === 'Signin' ? { borderRadius: '10px', fontWeight: 'bold' } : { color: 'gray' }} variant={props.active === 'Signin' ? 'outlined' : 'text'} onClick={onClickHandler} value="Signin">Signin</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth color='secondary' style={props.active === 'Signup' ? { borderRadius: '10px', fontWeight: 'bold' } : { color: 'gray' }} variant={props.active === 'Signup' ? 'outlined' : 'text'} onClick={onClickHandler} value="Signup">Signup</Button>
                </Grid>
            </Grid>
        </Fragment >
    )
}

export default Navigation


