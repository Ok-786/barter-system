import React, { useEffect, useState } from 'react';
import { Avatar, Button, Grid, IconButton, Rating, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useSelector } from 'react-redux';
import ProductCard from '../components/UserProfile/ProductCard/ProductCard';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function WishList() {
    const location = useLocation();
    const [userDetail, setUserDetail] = useState(location.state.user);
    const allProducts = useSelector(state => state.user.allProducts)
    console.log('userDetail')
    console.log(userDetail)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [])





    return (
        <>
            <Grid container gap={2} columnGap={12} mt={6} p={6}>
                <Grid item lg={11.5}>
                    <div style={{ border: '2px solid rgb(0,0,125)', display: 'inline-flex', backgroundColor: 'rgb(128,0,128,.8)', borderRadius: '25vh', paddingInlineEnd: '5vh', paddingBlock: '1vh', width: '100%' }}>
                        <Avatar style={{ backgroundColor: 'rgb(0,0,129,.5)', width: '15vh', height: '15vh' }} />
                        <div style={{ width: '100%' }}>
                            <div style={{ float: 'right', marginTop: '3%' }}>
                                <IconButton >
                                    <ShoppingCartIcon style={{ color: 'white', transform: 'scale(2)' }} />
                                </IconButton>
                            </div>
                            <h1 style={{ marginLeft: '3vh', color: 'white' }}>{userDetail.name}</h1>
                            <div style={{ color: 'white', marginTop: '-4vh', marginLeft: '3vh' }}>{userDetail.email}</div>
                        </div>
                    </div>
                </Grid>

                <Grid item lg={12}>
                    {console.log('allProducts')}
                    {console.log(allProducts)}
                    <h1>My Wishlist</h1>
                    <Grid container rowGap={4}>
                        {userDetail.wish_list.length === 0 ?
                            <div style={{}}>
                                Currently no product added to wish list
                            </div> :
                            allProducts.map((p, index) =>
                                userDetail.wish_list.includes(p.id)&&<>
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
