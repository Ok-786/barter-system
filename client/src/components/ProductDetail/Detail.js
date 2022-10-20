import React, { useEffect, useState } from 'react';
import { Avatar, Button, Grid } from '@mui/material';
import styles from "./Detail.modules.css";
import { useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ProductCard from './ProductCard/ProductCard';
import { useSelector } from 'react-redux';

export default function Detail() {
    const location = useLocation();
    const [date, setDate] = useState();
    const product = location.state.product;
    const allProducts = useSelector(state => state.user.allProducts)
    console.log(product)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [])

    const calculateTime = async (date) => {
        var date1 = await new Date();
        var date2 = await new Date(date);
        var diff = await new Date(date2.getTime() - date1.getTime());
        var days = diff.getUTCDate() - 1; // Gives day count of difference
        var hours = diff.getUTCHours(); // Gives difference as year
        var minutes = diff.getUTCMinutes(); // Gives month count of difference
        var seconds = diff.getUTCSeconds(); // Gives month count of difference


        setDate(days + " days " + hours + ":" + minutes + ":" + seconds);
    }

    React.useEffect(() => {

        setInterval(() => {
            product.expires_at && calculateTime(product.expires_at._seconds * 1000)
        }, 1000)
    }, [product])
    return (
        <>
            <Grid container gap={12} mt={6} pl={2}>
                <Grid item lg={4}>
                    <img src={product.image} alt="Product_image" width="100%" height='580vh' style={{ borderRadius: '2vh' }} />
                </Grid>

                <Grid item lg={6}>
                    <h1 style={{ marginTop: '-1vh' }}>{product.name}</h1>
                    <Grid container columnGap={4} rowGap={4}>
                        <Grid item lg={3}>
                            <div variant={"outlined"} style={{ color: 'black', background: 'rgb(0,0,0,.07)', borderRadius: '25vh', paddingInline: '3vh', width: '75%', height: '6vh' }} disabled >
                                <Grid container>
                                    <Grid item xs={5} marginY={0.5} style={{ justifyContent: 'center', }}>
                                        <div>
                                            <Avatar style={{ backgroundColor: 'rgb(128,0,129)' }} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span style={{ color: 'grey' }}>creator</span>
                                        <br />
                                        <span>{product.user_name}</span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item lg={4}>
                            <div variant={"outlined"} style={{ color: 'black', marginLeft: '2vh', background: 'rgb(0,0,0,.07)', borderRadius: '25vh', paddingInline: '1vh', width: '75%', height: '6vh' }} disabled >
                                <Grid container >
                                    <Grid item xs={7} marginY={1.5} ml={1} style={{ justifyContent: 'center', display: 'inline-flex' }}>
                                        <div style={{ color: 'purple' }}><RocketLaunchIcon /></div><div style={{ marginLeft: '1vh', color: 'grey', marginTOp: '0vh' }}>Total bids:</div>
                                    </Grid>
                                    <Grid item xs={3} mt={1.5}>
                                        <span>{product.bids.length}</span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item lg={4}>
                            <div variant={"outlined"} style={{ color: 'black', background: 'rgb(0,0,0,.07)', borderRadius: '25vh', paddingInline: '1vh', width: '75%', height: '6vh' }} disabled >
                                <Grid container>
                                    <Grid item xs={2} marginY={1.5} style={{ justifyContent: 'center', }}>
                                        <span style={{ color: 'purple' }}><TimerIcon /></span>
                                    </Grid>
                                    <Grid item xs={8} mt={1.5}>
                                        <span>{date}</span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item lg={12}>
                            {product.detail}
                        </Grid>
                        <Grid item lg={12}>
                            <Button variant='outlined' fullWidth style={{ borderRadius: '25vh', backgroundColor: 'rgb(0,0,130, .6)', color: 'white', fontWeight: 'bold' }}>Place a bid</Button>
                        </Grid>
                        <Grid item lg={12}>
                            <h4>Bid History</h4>
                            <div style={{ maxHeight: '20vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {
                                    product.bids.map((bid) =>
                                        <>
                                            <div style={{ display: 'inline-flex', marginTop: '1vh', flexDirection: 'row', flex: 1, width: '96%', justifyContent: 'center', backgroundColor: 'rgb(0,0,100,.1)', padding: '2vh', borderRadius: '1vh' }}>
                                                <Avatar style={{ backgroundColor: '#282d6b' }} />
                                                <div style={{ float: 'left', flex: 1, marginTop: '1vh', marginLeft: '1vh' }}><b>{bid.name}</b></div>
                                                <div style={{ float: 'right', flex: 1, marginTop: '1vh' }}><b>{bid.email}</b></div>
                                                <div style={{ float: 'right', flex: 1, marginTop: '1vh' }}><b>{bid.worth}$</b></div>
                                            </div>
                                            <div style={{ display: 'inline-flex', marginTop: '1vh', flexDirection: 'row', flex: 1, width: '96%', justifyContent: 'center', backgroundColor: 'rgb(0,0,100,.1)', padding: '2vh', borderRadius: '1vh' }}>
                                                <Avatar style={{ backgroundColor: '#282d6b' }} />
                                                <div style={{ float: 'left', flex: 1, marginTop: '1vh', marginLeft: '1vh' }}><b>{bid.name}</b></div>
                                                <div style={{ float: 'right', flex: 1, marginTop: '1vh' }}><b>{bid.email}</b></div>
                                                <div style={{ float: 'right', flex: 1, marginTop: '1vh' }}><b>{bid.worth}$</b></div>
                                            </div>

                                        </>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    {console.log('allProducts')}
                    {console.log(allProducts)}
                    <h1>Similar Products</h1>
                    <Grid container rowGap={4}>
                        {
                            allProducts.map(p =>
                                p.category === product.category && <>
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
