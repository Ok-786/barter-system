import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import './AddStaff.css';
import ImageUpload from './ImageUpload';
import { toast } from 'react-toastify';
import { Avatar, Card, CardMedia, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { axiosAddBid, axiosEditProduct, axiosGetAllProducts } from '../../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { addAllProducts, editSingleProduct } from '../../../Store/Actions/user';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditProduct({ open, handleOpen, handleClose, product }) {
    const categories = ['Mobiles', 'Laptop', 'Cars', 'Bikes', 'Cloths', 'Games', 'Pets', 'Decoration']
    const validationSchema = yup.object({});
    const [isSelection, setIsSelection] = useState(false);
    const [image, setImage] = useState();
    const [fileReader, setFileReader] = useState('');
    const products = useSelector(state => state.user.allProducts)
    const [allProducts, setAllProducts] = useState(products);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.user);
    const [productValues, setProductValues] = useState(product)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function getProducts() {
        setLoading(true)
        const response = await axiosGetAllProducts();
        console.log('response')
        console.log(response)
        setAllProducts(response.data.products);
        setLoading(false)
    }

    useEffect(() => {
        dispatch(addAllProducts(allProducts))
    }, [allProducts, dispatch])

    const setProductValuesHandler = (event) => {
        setProductValues({
            ...productValues,
            [event.target.name]: event.target.value
        })
    }

    console.log('productValues')
    console.log(productValues)



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log('im clicked')
            const formData = new FormData();
            formData.append('category', productValues.category);
            formData.append('worth', productValues.worth);
            formData.append('title', productValues.title);
            formData.append('additionalDetails', productValues.detail);
            image && formData.append('file', image[0]);
            formData.append('stars', user.rating);
            formData.append('email', user.email);
            formData.append('name', user.name);
            console.log('formData');
            console.log(image);

            var response;
            try {
                response = await axiosEditProduct(formData, product.id);
            } catch (err) {
                console.log("aaa" + err);
            }

            console.log(response)
            if (response) {
                toast.success("Product Updated!");

                getProducts()
                handleClose()
            } else {
                toast.error(response);
            }
            console.log('im in')


        } catch (error) {
            console.log(error);
        }
    }



    const onSelectHandler = (e) => {
        console.log(e)
        if (e === 'Selection')
            setIsSelection(true)
        else
            setIsSelection(false)
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <div style={{ justifyContent: 'center', textAlign: 'center', display: 'grid' }}>
                        <label className='labels' style={{ fontSize: '26px' }}>Edit {product.name}</label>
                    </div>
                    <div >
                        <form onSubmit={submitHandler} >
                            <Grid container gap={1} style={{ color: 'gray' }}>
                                <Grid item xs={12} >
                                    <label className="labels" style={{}}>Upload File</label>
                                    <ImageUpload center id="file" name="file" onInput={setImage} setFileReader={setFileReader} rounded={true} errorText="Please provide an image." />
                                </Grid>

                                {<Grid item xs={12} style={{ display: 'grid' }}>
                                    <label className="labels" style={{}}>Select Category</label>
                                    <select
                                        name="category"
                                        value={productValues.category}
                                        onChange={setProductValuesHandler}
                                        style={{
                                            display: "block", height: '5vh', borderRadius: '5px', border: '1px solid lightgrey', paddingInline: '1vh'
                                        }}
                                    >
                                        <option value="" disabled label="Select any Category">
                                            Select any Category{" "}
                                        </option>
                                        {
                                            categories.map(item => {
                                                return (
                                                    <option value={item} label={item}>
                                                        {" "}
                                                        {item}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>
                                </Grid>}
                                <Grid item xs={12} style={{ display: 'grid' }}>
                                    <label className="labels" style={{}}>Worth</label>
                                    <TextField name="worth" size="small" variant="outlined" type="text" className="form-control" placeholder="worth" value={productValues.worth} onChange={setProductValuesHandler} />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'grid' }}>
                                    <label className="labels" style={{}}>Title</label><TextField name="title" size="small" variant="outlined" type="text" className="form-control" placeholder="title" value={productValues.title} onChange={setProductValuesHandler} />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'grid' }}>
                                </Grid>
                                <Button fullWidth style={{ backgroundColor: '#282d6b', borderRadius: '20px', marginTop: '1vh' }} color="primary" variant="contained" type="submit">Confirm Changes</Button>


                            </Grid>
                        </form >

                    </div >
                </Box>
            </Modal>
        </div>
    );
}




