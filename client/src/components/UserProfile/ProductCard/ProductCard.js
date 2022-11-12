import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Grid } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { axiosAddFav, axiosDeleteProduct } from '../../../utils/Api';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleProduct, updateFav } from '../../../Store/Actions/user';
import PlaceBid from '../../user/PlaceBid/PlaceBid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import EditProduct from '../EditProduct/EditProduct';
import sold from '../../../assets/sold.png';

const ProductCard = React.memo(({ product, getProducts, isUser }) => {
    const [hover, setHover] = React.useState(false);
    const [date, setDate] = React.useState();
    const user = useSelector(state => state.user.user);
    const [fav, setFav] = React.useState(user.wish_list.includes(product.id));
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setFav(user.wish_list.includes(product.id))
    }, [])
    const handleFav = async (isAdd) => {
        if (isAdd) {
            const data = {
                id: product.user_id,
                product_id: product.id,
                type: 'add'
            }
            await axiosAddFav(data)
            setFav(true)
            dispatch(updateFav(product.id, true))
        } else {
            const data = {
                id: product.user_id,
                product_id: product.id,
                type: 'remove'
            }
            await axiosAddFav(data)
            setFav(false)
            dispatch(updateFav(product.id, false))
        }
    }

    const deleteProduct = async () => {
        try {
            dispatch(deleteSingleProduct(product))
            const response = await axiosDeleteProduct(product.id)
            toast.success('Product deleted!')
        } catch (err) {
            toast.error('Product not deleted')
        }
    }

    const editProduct = () => {

    }

    const calculateTime = async (date) => {
        var date1 = await new Date();
        var date2 = await new Date(date);
        var diff = await new Date(date2.getTime() - date1.getTime() - date1.getTime());
        var days = diff.getUTCDate(); // Gives day count of difference
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



    console.log('product', product)
    return (
        <div style={{ width: '40vh', cursor: 'pointer' }} >
            <>
                <EditProduct open={open} editProduct={editProduct} handleOpen={handleOpen} handleClose={handleClose} product={product} />
            </>
            <Card style={{ paddingInline: '3vh', paddingBottom: '2vh', borderRadius: '15px' }}>
                <Box
                    sx={{ position: 'relative', paddingTop: '20px' }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <CardMedia
                        component="img"
                        height="280vh"
                        width="100%"
                        style={{ objectFit: 'contain', backgroundColor: 'rgb(0,0,0,.3)', width: '100%', borderRadius: '20px' }}
                        image={product.bidAccepted ? sold : `http://localhost:8000/${product.image}`}
                        alt="green iguana"
                        onClick={() => navigate(`/productdetail/${product.id}`, { state: { product } })}
                    />
                    {console.log(`http://localhost:8000/${product.image}`)}
                    {hover ?
                        <div>
                            {!isUser ?
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        // border: '1px solid black',
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'rgb(255,255,255,.8)',
                                        color: 'purple',
                                        borderRadius: '20px',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                    onClick={() => navigate(`/productdetail/${product.id}`, { state: { product } })}
                                >
                                    {/* {!isUser && <Button variant='outlined' onClick={handleOpen} color="secondary" style={{ marginBlock: '50%', borderRadius: '10px' }}><b>Place a Bid</b></Button>} */}
                                </Box>
                                :
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        // border: '1px solid black',
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'rgb(255,255,255,1)',
                                        borderRadius: '20px',
                                        // justifyContent: 'center',
                                        // textAlign: 'center',
                                        display: 'grid',
                                    }}
                                >
                                    <Button variant='outlined' onClick={deleteProduct} color="error" style={{ marginTop: '50%', height: '20%', marginInline: '2vh', borderRadius: '10px' }}><b><DeleteIcon /></b></Button>
                                    <Button variant='outlined' onClick={handleOpen} color="secondary" style={{ marginInline: '2vh', marginTop: '-15%', height: '70%', borderRadius: '10px' }}><b><EditIcon /></b></Button>
                                </Box>
                            }
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 5,
                                    // border: '1px solid black',
                                    // width: '42%',
                                    // bgcolor: 'rgb(255,255,255,.8)',
                                    color: '#281c83',
                                    // padding: '5px 20px',
                                    // borderRadius: '20px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >{console.log('product.bidAccepted')}
                                {console.log(!(!!product.bidAccepted))}
                                {
                                    !(!!product.bidAccepted) && (fav ? <StarIcon fontSize='large' onClick={() => handleFav(false)} /> :
                                        <StarBorderIcon fontSize='large' onClick={() => handleFav(true)} />)
                                }
                            </Box>
                        </div> :
                        <>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    marginTop: '-17%',
                                    marginInline: '20%',
                                    // border: '1px solid black',
                                    width: '42%',
                                    bgcolor: 'rgb(255,255,255,.8)',
                                    color: '#87208c',
                                    padding: '5px 20px',
                                    borderRadius: '20px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="body2"><b>{date}</b></Typography>
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 5,
                                    // border: '1px solid black',
                                    // width: '42%',
                                    // bgcolor: 'rgb(255,255,255,.8)',
                                    color: '#281c83',
                                    // padding: '5px 20px',
                                    // borderRadius: '20px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {
                                    !(!!product.bidAccepted) && (fav && !product.bidAccepted ? <StarIcon fontSize='large' onClick={() => handleFav(false)} /> :
                                        <StarBorderIcon fontSize='large' onClick={() => handleFav(true)} />)
                                }
                            </Box>
                        </>
                    }
                </Box>
                <div style={{ marginTop: '10px' }}>
                    <Grid container onClick={() => navigate(`/productdetail/${product.id}`, { state: { product } })}>
                        <Grid item xs={10}  >
                            <Typography variant="h5"><b>{product.title ? product.title : product.name}</b></Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <div style={{ background: '#281c83', cursor: 'pointer', borderRadius: '50%', paddingInline: '7px', color: 'white', float: 'right', display: 'flex' }}>{product.bids ? product.bids.length : 0}</div>
                        </Grid>
                    </Grid>
                    <Grid container gap={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={2}>
                            <Avatar style={{ backgroundColor: '#281c83', zIndex: 2 }} onClick={() => navigate(`/userprofile/${user.id}`, { state: { user: { name: product.user_name, email: product.user_email, detail: product.detail, rating: product.user_rating }, isOther: true } })} />
                        </Grid>
                        <Grid item xs={2} onClick={() => navigate(`/productdetail/${product.id}`, { state: { product } })}>
                            <Typography variant="body2" color='grey'>creator</Typography>
                            <Typography variant="body1" color='grey'><b>{product.user_name}</b></Typography>
                        </Grid>
                        <Grid item xs={5} onClick={() => navigate(`/productdetail/${product.id}`, { state: { product } })}>
                            <Typography variant="body2" color='grey'>Worth <b>{product.worth}$</b></Typography>

                        </Grid>
                    </Grid>
                </div>
            </Card >
        </div >
    );
})

export default ProductCard;