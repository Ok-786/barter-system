import React, { useEffect, useState } from 'react';
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
import { axiosIsReport, axiosReportUser } from '../utils/Api';
import { toast } from 'react-toastify';

export default function Detail() {
    const location = useLocation();
    const [edit, setEdit] = useState(false);
    const [report, setReport] = useState(false);
    const [userDetail, setUserDetail] = useState(location.state.user);
    const allProducts = useSelector(state => state.user.allProducts)

    const setUserDetailHandler = (e) => {
        setUserDetail(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const isReported = async () => {
        const data = {
            name: 'aaaaaa',
            email: userDetail.email,
        }
        const response = await axiosIsReport(data)
        console.log('ggggggg', response)
        setReport(response.data)

    }


    useEffect(() => {
        isReported()
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [])

    const handleReport = async (isAdd) => {
        if (isAdd) {
            const data = {
                email: userDetail.email,
                type: 'add'
            }
            setReport(true)
            await axiosReportUser(data)
            toast.success('User has been added to reported list')
        } else {
            const data = {
                email: userDetail.email,
                type: 'remove'
            }
            setReport(false)
            await axiosReportUser(data)
            toast.success('User has been romoved from reported list')
        }
    }


    return (
        <>
            <div style={{ background: 'linear-gradient(107deg, rgba(88,6,101,.7)80%, rgba(24,31,134,.6)52%)', height: '42ch', width: '100%', position: 'absolute', zIndex: -1 }}></div>
            <Grid container gap={2} columnGap={12} mt={8} p={6}>
                <Grid item lg={9} >
                    <div style={{ display: 'inline-flex', borderRadius: '25vh', paddingInline: '1vh', paddingInlineEnd: '5vh', paddingBlock: '1vh', width: '100%' }}>
                        <Avatar style={{ backgroundColor: 'rgb(0,0,129,.5)', width: '15vh', height: '15vh' }} />
                        <div style={{ width: '100%' }}>
                            <h1 style={{ marginLeft: '3vh', color: 'white' }}>{userDetail.name}</h1>
                            <h4 style={{ color: 'white', marginTop: '-3vh', marginLeft: '3vh' }}>{userDetail.email}</h4>
                            <div style={{ color: 'white', marginTop: '-2vh', marginLeft: '3vh' }}>{userDetail.detail}</div>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={2} >
                    <br />
                    <br />
                    <div style={{ float: 'right' }}>
                        <div style={{ float: 'right', }}>
                            {
                                location.state.isOther ? <IconButton >
                                    {
                                        !report ?
                                            <FlagOutlinedIcon fontSize='large' style={{ color: 'rgb(0,0,240)' }} onClick={() => handleReport(true)} /> :
                                            <FlagIcon fontSize='large' style={{ color: 'red' }} onClick={() => handleReport(false)} />
                                    }
                                </IconButton>
                                    :
                                    <IconButton >
                                        {
                                            !edit ?
                                                <EditIcon fontSize='large' style={{ color: 'rgb(0,0,240)' }} onClick={() => setEdit(true)} /> :
                                                <SaveIcon fontSize='large' style={{ color: 'rgb(0,0,240)' }} onClick={() => setEdit(false)} />
                                        }
                                    </IconButton>
                            }
                        </div>
                        <h4>Ratings<span style={{ color: 'rgb(128,0,128)' }}>({userDetail.rating})</span></h4>
                        <Rating
                            name="rating"
                            size='large'
                            value={userDetail.rating}
                            onChange={setUserDetailHandler}
                            readOnly={!location.state.isOther}
                        />
                    </div>
                </Grid>
                <div style={{ marginTop: '5%' }}></div>
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
                                        variant={edit ? "outlined" : "standard"}
                                        name="name"
                                        onChange={setUserDetailHandler}
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
                                        variant={edit ? "outlined" : "standard"}
                                        type="password"
                                        name="password"
                                        onChange={setUserDetailHandler}
                                    />
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={12} >
                            <div style={{ color: 'black', marginLeft: '2vh', width: '100%' }}>
                                <h2>User Info</h2>
                                <TextField
                                    style={{ border: '0px solid white', color: 'black' }}
                                    multiline
                                    value={userDetail.detail}
                                    rows={4}
                                    fullWidth
                                    variant={edit ? "outlined" : "standard"}
                                    name="detail"
                                    onChange={setUserDetailHandler}
                                />
                            </div>
                        </Grid>
                    </>
                }
                <Grid item lg={12}>
                    <h1>User Products </h1>
                    <Grid container rowGap={4}>
                        {
                            allProducts.map(p =>
                                (p.user_email === userDetail.email) && <>
                                    <Grid item lg={3}>
                                        <ProductCard product={p} isUser={!location.state.isOther} />
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
