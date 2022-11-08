import { Button, Rating, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/user/Categories/Categories'
import Products from '../components/user/Products/Products'
import Slideshow from '../components/user/SlideShow/SlideShow'
import { isSignin, signout } from '../Store/Actions/user';
import { axiosPostFeedback } from '../utils/Api';
export default function HomePage({ search }) {
    const [category, setCategory] = useState('all');
    const user = JSON.parse(localStorage.getItem('user'));
    const online = useSelector(state => state.user.user);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userDetail, setUserDetail] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            console.log('online.dealasdasdasdadad')
            console.log(online.deal)
            if (online.deal !== false && online.deal !== undefined && open === false) {
                window.alert("Please provide your valuable feedback to the user product")
                setOpen(true);
            }
        }, 2000)
    }, [])

    const setUserDetailHandler = (e) => {
        setUserDetail(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onClickHandler = () => {
        userDetail.user_id = online.id
        axiosPostFeedback(userDetail, online.deal)
        setOpen(false)
        const u = JSON.parse(localStorage.getItem('user'))
        u.deal = false;
        localStorage.setItem('user', JSON.stringify(u))
        dispatch(isSignin());
        setTimeout(() => {
            window.location.reload();
        }, 500)
    }
    console.log('online.dealdadadadadadadadadad')
    console.log(online.deal)


    return (
        <div>

            {(user.status == false) ?
                <div style={{ marginTop: '10%' }}>
                    <h6>Oops....</h6>
                    <h3>You have been blocked</h3>
                    <Button variant='contained' onClick={() => { dispatch(signout()); localStorage.removeItem('auth_token'); navigate('/') }}>Logout</Button>
                </div>
                :
                <>
                    {open &&
                        <div style={{ position: 'absolute', width: '100%', height: '100vh', backgroundColor: 'rgb(0,0,0,0.7)', zIndex: 99, display: 'flex', flexDirection: 'row', alignContent: 'center', textAlign: 'center', }}>
                            <div style={{ backgroundColor: 'white', width: '40%', height: '65%', marginLeft: '30%', marginTop: '3%', paddingInline: '5%', paddingTop: '2%' }}>
                                <h2>Provide Feedback</h2>
                                <h5>for product Id: {online.deal}</h5>
                                <h4 style={{ marginBottom: '-.6vh' }}>Ratings<span style={{ color: 'rgb(128,0,128)', }}>({userDetail.rating})</span></h4>
                                <Rating
                                    name="rating"
                                    size='large'
                                    value={userDetail.rating}
                                    onChange={setUserDetailHandler}
                                // readOnly={!location.state.isOther}
                                />
                                <TextField
                                    placeholder='Enter feedback....'
                                    multiline
                                    name="feedback"
                                    rows={8}
                                    color="secondary"
                                    fullWidth
                                    value={userDetail.feedback}
                                    onChange={setUserDetailHandler}
                                />
                                <br />
                                <br />
                                <br />
                                <Button onClick={onClickHandler} style={{ float: 'right' }} color="secondary" variant="contained">Submit</Button>
                            </div>
                        </div>
                    }
                    <Slideshow />
                    <Categories setCategory={setCategory} />
                    <Products search={search} category={category} />
                    {/* nMzX8eB3rlG0PvAOsGsN */}
                </>
            }
        </div>
    )
}
