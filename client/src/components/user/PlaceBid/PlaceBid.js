import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import './AddStaff.css';
import ImageUpload from './ImageUpload';
import { toast } from 'react-toastify';
import { Avatar, Card, CardMedia, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { axiosAddBid } from '../../../utils/Api';
import { useNavigate } from 'react-router-dom';

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

export default function PlaceBid({ getProducts, open, handleOpen, handleClose, product }) {
    const categories = ['Mobiles', 'Laptop', 'Cars', 'Bikes', 'Cloths', 'Games', 'Pets', 'Decoration']
    const validationSchema = yup.object({});
    const [isSelection, setIsSelection] = useState(false);
    const [image, setImage] = useState();
    const [fileReader, setFileReader] = useState('');
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('im clicked')
                if (values.category && product.category && (values.category.toLowerCase() == product.category.toLowerCase())) {
                    const formData = new FormData();
                    formData.append('category', values.category);
                    formData.append('worth', values.worth);
                    formData.append('title', values.title);
                    formData.append('additionalDetails', values.additionalDetails);
                    formData.append('file', image[0]);
                    formData.append('id', user.id);
                    formData.append('stars', user.rating);
                    formData.append('email', user.email);
                    formData.append('name', user.name);
                    console.log('formData');
                    console.log(values);
                    console.log(image);

                    var response;
                    console.log('getProducts')
                    console.log(getProducts)
                    try {
                        response = await axiosAddBid(formData, product.id);
                        await getProducts();
                    } catch (err) {
                        console.log("aaa" + err);
                    }

                    console.log(response)
                    if (response) {
                        toast.success("Bid has been Placed!");
                        navigate('/home')
                        handleClose()
                    } else {
                        toast.error(response);
                    }
                    console.log('im in')
                } else {
                    toast.error(`The respective item must be a ${product.category}`)
                }
                // props.setRefresh(true);
                // formik.resetForm();


            } catch (error) {
                console.log(error);
            }
        },
    });

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
                        <label className='labels' style={{ fontSize: '20px' }}>Bid for {product.name}</label>
                        {product.type && product.type.toLowerCase() == 'selection' ?
                            <label style={{}}>You must only bid with any <span style={{ color: 'purple' }}>{product.category}</span></label>
                            :
                            <label style={{}}>You must bid at least <span style={{ color: 'purple' }}>{product.worth}$</span></label>
                        }
                    </div>
                    <div >
                        <form onSubmit={formik.handleSubmit} >

                            <Grid container gap={1} style={{ color: 'gray' }}>
                                <Grid item xs={12} >
                                    <label className="labels" style={{}}>Upload File</label>
                                    <ImageUpload center id="file" name="file" onInput={setImage} setFileReader={setFileReader} rounded={true} errorText="Please provide an image." />
                                </Grid>

                                {<Grid item xs={12} style={{ display: 'grid' }}>
                                    <label className="labels" style={{}}>Select Category</label>
                                    <select
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        // onClick={(e) => console.log(e)}
                                        // onBlur={handleBlur}
                                        style={{
                                            display: "block", height: '5vh', borderRadius: '5px', border: '1px solid lightgrey', color: formik.values.experience ? 'black' : 'grey', paddingInline: '1vh'
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
                                    <label className="labels" style={{}}>Worth</label><TextField name="worth" size="small" variant="outlined" type="text" className="form-control" placeholder="worth" value={formik.values.worth} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'grid' }}>
                                    <label className="labels" style={{}}>Title</label><TextField name="title" size="small" variant="outlined" type="text" className="form-control" placeholder="title" value={formik.values.title} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'grid' }}>
                                    <label className="labels" style={{}}>Additional Details</label><TextField name="additionalDetails" multiline={true} rows={3} size="small" variant="outlined" type="text" className="form-control" placeholder="Enter additional details" value={formik.values.additionalDetails} onChange={formik.handleChange} />
                                </Grid>
                                <Button fullWidth style={{ backgroundColor: '#282d6b', borderRadius: '20px', marginTop: '1vh' }} color="primary" variant="contained" type="submit">Place Bid</Button>

                                {/* <div className="d-flex justify-content-between align-items-center mb-3"> */}
                                {/* <h4 className="text-right" >Add Image</h4> */}

                                {/* </div> */}

                            </Grid>
                        </form >

                    </div >
                </Box>
            </Modal>
        </div>
    );
}




