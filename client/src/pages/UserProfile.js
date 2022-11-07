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
import { axiosDeleteFeedback, axiosEditFeedback, axiosGetAllFeedback, axiosGetAllUsers, axiosIsReport, axiosReportUser } from '../utils/Api';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Detail() {
    const location = useLocation();
    const [edit, setEdit] = useState(false);
    const [report, setReport] = useState(false);
    const [userDetail, setUserDetail] = useState(location.state.user);
    const allProducts = useSelector(state => state.user.allProducts)
    const [feedback, setFeedback] = useState([]);
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);
    const getFeedback = async () => {
        const response = await axiosGetAllFeedback();
        setFeedback(response.data.feedbacks)
    }
    const [data, setData] = useState({});


    const [users, setUsers] = React.useState([]);
    const currentUser = users.filter(u => {
        if (u.email === userDetail.email)
            return u
    })
    const stars = currentUser[0] ? Math.floor(currentUser[0].stars) : 0
    const getAllUsersHandler = async () => {

        const temp = await axiosGetAllUsers();

        console.log('temp.data')
        console.log('temp.data')
        console.log('temp.data')
        console.log('temp.data')
        console.log(userDetail)
        setUsers(temp.data.users);
    }

    React.useEffect(() => {
        getAllUsersHandler();
    }, [])



    useEffect(() => {
        getFeedback()

    }, [])

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

    const onDeleteHandler = async (id) => {
        try {
            await axiosDeleteFeedback(id);
            getFeedback()
            toast.success('Feedback deleted!')
        } catch (err) {
            console.log(err)
        }
    }

    const onEditHandler = async (id) => {
        await axiosEditFeedback(id, data)
        getFeedback()
        toast.success('Feedback updated!')
        setOpen(false)
    }

    const setDataHandler = (e) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <>
            <div style={{ background: 'linear-gradient(107deg, rgba(88,6,101,.7)80%, rgba(24,31,134,.6)52%)', height: '42ch', width: '100%', position: 'absolute', zIndex: -1 }}></div>
            <Grid container gap={2} columnGap={12} mt={8} p={6} >
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
                            value={data.rating ? (Math.floor(data.rating) + stars) / 2 : Math.floor(stars)}
                            onChange={setUserDetailHandler}
                            readOnly={true}
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
                <Grid item lg={12}>
                    <h1>User Reviews </h1>
                    <Grid container rowGap={4} style={{ display: 'block' }} >
                        {
                            feedback.map(p =>
                                <>
                                    <Grid item lg={3} mb={2} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

                                        <div style={{ position: 'relative', backgroundColor: 'rgb(0,0,128,.2)', width: '70vh', height: '7vh', borderRadius: '25px', paddingBlock: '5px', paddingInline: '2vh', display: 'inline-flex' }} >
                                            <Avatar style={{ marginTop: '1vh', backgroundColor: 'rgb(128,9,128)', marginRight: '1vh' }} />
                                            <div style={{ display: 'block' }} >
                                                <h6 style={{ marginTop: '10px', }}>{p.email}</h6>
                                                <h3 style={{ marginTop: '-4vh' }}>{p.feedback}</h3>
                                            </div>
                                            {
                                                userDetail.email === p.email && hover && <div style={{ position: 'absolute', marginLeft: '90%' }} >
                                                    <EditIcon color="secondary" style={{ cursor: 'pointer', zIndex: 99 }} onClick={() => { setOpen(true); setData({ rating: Math.floor(stars), feedback: p.feedback, email: userDetail.email }) }} />
                                                    <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => onDeleteHandler(p.id)} />
                                                </div>
                                            }
                                        </div>
                                        {open &&
                                            <div style={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: 'rgb(0,0,0,0.7)', zIndex: 99, display: 'flex', flexDirection: 'row', alignContent: 'center', textAlign: 'center', top: 0, left: 0 }}>

                                                <div style={{ backgroundColor: 'white', width: '40%', height: '65%', marginLeft: '30%', marginTop: '3%', paddingInline: '5%', paddingTop: '2%' }}>
                                                    <h2>Edit Feedback</h2>
                                                    <h4 style={{ marginBottom: '-.6vh' }}>Ratings<span style={{ color: 'rgb(128,0,128)', }}>({userDetail.rating})</span></h4>
                                                    <Rating
                                                        name="rating"
                                                        size='large'
                                                        value={data.rating}
                                                        onChange={setDataHandler}
                                                    // readOnly={!location.state.isOther}
                                                    />
                                                    {console.log('ratingdaadadad')}
                                                    {console.log(userDetail)}
                                                    <TextField
                                                        placeholder='Enter feedback....'
                                                        multiline
                                                        name="feedback"
                                                        rows={8}
                                                        color="secondary"
                                                        fullWidth
                                                        value={data.feedback}
                                                        onChange={setDataHandler}
                                                    />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    {
                                                        <Button onClick={() => onEditHandler(p.id)} style={{ float: 'right' }} color="secondary" variant="contained">Submit</Button>
                                                    }
                                                    {
                                                        <Button onClick={() => setOpen(false)} style={{ float: 'right', marginRight: '1vh' }} color="error" variant="contained">Close</Button>
                                                    }
                                                </div>
                                            </div>
                                        }

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
