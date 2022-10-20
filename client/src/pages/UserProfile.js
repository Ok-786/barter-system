import React, { useState } from 'react';
import { Avatar, Button, Grid, IconButton, Rating, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useSelector } from 'react-redux';
import ProductCard from '../components/UserProfile/ProductCard/ProductCard';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

export default function Detail() {
    const location = useLocation();
    const [edit, setEdit] = useState(false);
    const [report, setReport] = useState(false);
    const [userDetail, setUserDetail] = useState(location.state.user);
    const allProducts = useSelector(state => state.user.allProducts)
    console.log('userDetail')
    console.log(userDetail)

    const setUserDetailHandler = (e) => {
        setUserDetail(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <>
            <Grid container gap={2} columnGap={12} mt={6} p={6}>
                <Grid item lg={3}>
                    <div style={{ border: '2px solid rgb(0,0,125)', display: 'inline-flex', backgroundColor: 'rgb(128,0,128,.8)', borderRadius: '25vh', paddingInlineEnd: '5vh', paddingBlock: '1vh', width: '100%' }}>
                        <Avatar style={{ backgroundColor: 'rgb(0,0,129,.5)', width: '15vh', height: '15vh' }} />
                        <div style={{ width: '100%' }}>
                            <div style={{ float: 'right', }}>
                                {
                                    !location.state.isOther ? <IconButton >
                                        {
                                            !edit ?
                                                <EditIcon fontSize='large' style={{ color: 'rgb(0,0,240)' }} onClick={() => setEdit(true)} /> :
                                                <SaveIcon fontSize='large' style={{ color: 'rgb(0,0,240)' }} onClick={() => setEdit(false)} />
                                        }
                                    </IconButton> : <IconButton >
                                        {
                                            !report ?
                                                <FlagOutlinedIcon fontSize='large' style={{ color: 'rgb(0,0,240)' }} onClick={() => setReport(true)} /> :
                                                <FlagIcon fontSize='large' style={{ color: 'red' }} onClick={() => setReport(false)} />
                                        }
                                    </IconButton>
                                }
                            </div>
                            <h1 style={{ marginLeft: '3vh', color: 'white' }}>{userDetail.name}</h1>
                            <div style={{ color: 'white', marginTop: '-4vh', marginLeft: '3vh' }}>{userDetail.email}</div>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={8} alignSelf={"end"}>
                    <div style={{ float: 'right' }}>
                        <h4>Ratings<span style={{ color: 'rgb(128,0,128)' }}>({userDetail.rating})</span></h4>
                        <Rating
                            name="rating"
                            size='large'
                            value={userDetail.rating}
                            onChange={setUserDetailHandler}
                            readOnly={!edit && !location.state.isOther}
                        />
                    </div>
                </Grid>
                {edit &&
                    <>
                        <Grid item lg={12} >
                            <div style={{ color: 'black', marginLeft: '2vh', width: '100%', display: 'inline-flex' }}>
                                <h2>User Name:</h2>
                                &nbsp;
                                &nbsp;
                                <div>
                                    <TextField
                                        style={{ marginTop: '3vh' }}
                                        value={userDetail.name}
                                        disabled={!edit}
                                        variant={edit ? "outlined" : "standard"}
                                        InputProps={{
                                            disableUnderline: !edit,
                                        }}
                                        name="name"
                                        onChange={setUserDetailHandler}

                                        inputProps={{ style: { WebkitTextFillColor: "black", } }}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={12} >
                            <div style={{ color: 'black', marginLeft: '2vh', width: '100%', display: 'inline-flex' }}>
                                <h2>User Password:</h2>
                                &nbsp;
                                &nbsp;
                                <div>
                                    <TextField
                                        style={{ marginTop: '3vh' }}
                                        value={userDetail.name}
                                        disabled={!edit}
                                        variant={edit ? "outlined" : "standard"}
                                        InputProps={{
                                            disableUnderline: !edit,
                                        }}
                                        type="password"
                                        name="password"
                                        onChange={setUserDetailHandler}

                                        inputProps={{ style: { WebkitTextFillColor: "black", } }}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </>
                }
                <Grid item lg={12} >
                    <div style={{ color: 'black', marginLeft: '2vh', width: '100%' }}>
                        <h2>User Info</h2>
                        <TextField
                            style={{ border: '0px solid white', color: 'black' }}
                            multiline
                            value={userDetail.detail}
                            rows={4}
                            fullWidth
                            disabled={!edit}
                            variant={edit ? "outlined" : "standard"}
                            InputProps={{
                                disableUnderline: !edit,
                            }}
                            name="detail"
                            onChange={setUserDetailHandler}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "black",
                                },
                            }}
                        />
                    </div>
                </Grid>
                <Grid item lg={12}>
                    {console.log('allProducts')}
                    {console.log(allProducts)}
                    <h1>User Products </h1>
                    <Grid container rowGap={4}>
                        {
                            allProducts.map(p =>
                                (p.user_email === userDetail.email) && <>
                                    <Grid item lg={3}>
                                        <ProductCard product={p} />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <ProductCard product={p} />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <ProductCard product={p} />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <ProductCard product={p} />
                                    </Grid>
                                </>
                            )
                        }
                    </Grid>
                </Grid>

            </Grid>

        </>
    )
}
