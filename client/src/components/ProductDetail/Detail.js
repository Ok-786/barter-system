import React, { useEffect, useState } from 'react';
import { Avatar, Button, Grid } from '@mui/material';
import styles from "./Detail.modules.css";
import { useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ProductCard from './ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGetAllProducts } from '../../utils/Api';
import { addAllProducts } from '../../Store/Actions/user';
import PlaceBid from '../user/PlaceBid/PlaceBid';
import { useNavigate } from 'react-router-dom';

export default function Detail() {
    const location = useLocation();
    const [date, setDate] = useState();
    const product = location.state.product;
    const allProducts = useSelector(state => state.user.allProducts)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [])


    async function getProducts() {
        const response = await axiosGetAllProducts();
        console.log('response.data')
        setProducts(response.data.products);
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        dispatch(addAllProducts(products))
    }, [products, dispatch])

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
            <>
                <PlaceBid open={open} getProducts={getProducts} handleOpen={handleOpen} handleClose={handleClose} product={product} />
            </>
            <Grid container gap={12} mt={6} pl={2}>
                <Grid item lg={4}>
                    <Grid container columnGap={3.5} rowGap={1}>
                        <Grid lg={12}>
                            <div style={{ width: "100%", height: '50vh', borderRadius: '2vh', border: '5px solid rgb(0,0,130)' }}>
                                <img src={`http://localhost:8000/${product.image}`} alt="Product_image" width="100%" height='100%' />
                            </div>
                        </Grid>
                        <Grid lg={3.5}>
                            <div style={{ width: "100%", height: '25vh', borderRadius: '2vh', border: '6px solid rgb(130,0,130)' }}>
                                <img src={`http://localhost:8000/${product.image1}`} alt="Product_image" width="100%" height='100%' style={{}} />
                            </div>
                        </Grid>
                        <Grid lg={3.5}>

                            <div style={{ width: "100%", height: '25vh', borderRadius: '2vh', border: '6px solid rgb(130,0,130)' }}>
                                <img src={`http://localhost:8000/${product.image2}`} alt="Product_image" width="100%" height='200vh' />
                            </div>
                        </Grid>
                        <Grid lg={3.5}>
                            <div style={{ width: "100%", height: '25vh', borderRadius: '2vh', border: '6px solid rgb(130,0,130)' }}>
                                <img src={`http://localhost:8000/${product.image3}`} alt="Product_image" width="100%" height='200vh' />
                            </div>
                        </Grid>
                    </Grid>
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
                            <Button variant='outlined' fullWidth style={{ borderRadius: '25vh', backgroundColor: 'rgb(0,0,130, .6)', color: 'white', fontWeight: 'bold' }} onClick={handleOpen}>Place a bid</Button>
                        </Grid>
                        <Grid item lg={12}>
                            <h4>Bid History</h4>
                            <div style={{ maxHeight: '20vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {
                                    product.bids.map((bid) =>
                                        <>
                                            <div style={{ display: 'inline-flex', marginTop: '1vh', flexDirection: 'row', flex: 1, width: '96%', justifyContent: 'center', backgroundColor: 'rgb(0,0,100,.1)', padding: '2vh', borderRadius: '1vh' }}>
                                                <Avatar alt={bid.image} src={`http://localhost:8000/${bid.image}`} style={{ backgroundColor: '#282d6b' }} />
                                                <div style={{ float: 'left', flex: 1, marginTop: '1vh', marginLeft: '1vh' }}><b>{bid.title}</b></div>
                                                <div style={{ float: 'right', flex: 1, marginTop: '1vh' }}><b>{bid.email}</b></div>
                                                <div style={{ float: 'right', flex: 1, marginTop: '1vh' }}><b>{bid.worth}$</b></div>
                                            </div>
                                            {console.log(`http://localhost:8000/${bid.image}`)}
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
                                p.category === product.category && product.user_email !== user.email && <>
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
