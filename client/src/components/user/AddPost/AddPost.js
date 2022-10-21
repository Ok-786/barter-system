import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddStaff.css';
import ImageUpload from './ImageUpload';
import { toast } from 'react-toastify';
import { Avatar, Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Gallery from './Gallery/Gallery';
import { axiosAddProduct } from '../../../utils/Api';

export default function AddProduct(props) {
    const categories = ['Mobiles', 'Laptop', 'Cars', 'Bikes', 'Cloths', 'Games', 'Pets', 'Decoration']
    const validationSchema = yup.object({});
    const [isSelection, setIsSelection] = useState(false);
    const [image, setImage] = useState();
    const [fileReader, setFileReader] = useState('');
    console.log('aaa', fileReader, image)
    const user = useSelector(state => state.user.user);
    const [location, setLocation] = useState({
        lat: 0,
        long: 0
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            })
        });
    }, [])

    const formik = useFormik({
        initialValues: {
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('im clicked')
                const formData = new FormData();
                formData.append('user_id', user.id);
                formData.append('stars', user.rating);
                formData.append('user_email', user.email);
                formData.append('user_name', user.name);
                formData.append('type', values.type);
                formData.append('category', values.type == 'Selection' ? values.category : undefined);
                formData.append('worth', values.worth);
                formData.append('title', values.title);
                formData.append('additionalDetails', values.additionalDetails);
                formData.append('file1', image[0]);
                formData.append('file2', image[1]);
                formData.append('file3', image[2]);
                formData.append('file4', image[3]);
                formData.append('long', location.long);
                formData.append('lat', location.lat);
                console.log('formData');
                console.log(values);
                console.log(image);

                var response;
                try {
                    response = await fetch('http://localhost:8000/api/products/register', {
                        method: 'POST',
                        body: formData
                    });
                } catch (err) {
                    console.log("aaa" + err);
                }

                const parseRes = await response.json();
                if (parseRes.products) {
                    toast.success("New Product added!");
                } else {

                    toast.error(parseRes);
                }
                console.log('im in')
                // props.setRefresh(true);
                // props.handleClose()
                // formik.resetForm();

                // try {
                //     response = await axiosAddProduct(formData);
                // } catch (err) {
                //     console.log("aaa" + err);
                // }

                console.log(response);
                if (response === "Staff Created") {
                    toast.success("New Staff Created!");
                } else {
                    toast.error(response);
                }
                console.log('im in')
                props.setRefresh(true);
                // props.handleClose()
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
        <div className='full-top-con'>
            {/* <AddEmployees /> */}
            <form onSubmit={formik.handleSubmit} >
                <Grid container columnGap={12} style={{ color: 'gray' }}>

                    <Grid item xs={3}>

                        <Grid container rowGap={2}>
                            <Grid item xs={12} style={{ display: 'grid' }}>
                                <div>
                                    <Card style={{ paddingInline: '3vh', paddingBottom: '2vh', borderRadius: '15px' }}>
                                        <Box
                                            sx={{ position: 'relative', paddingTop: '20px' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="280vh"
                                                width="100%"
                                                style={{ objectFit: 'contain', backgroundColor: 'rgb(0,0,0,.3)', width: '100%', borderRadius: '20px' }}
                                                image={fileReader[0]}
                                                alt="green iguana"

                                            />
                                            <Gallery items={fileReader.slice(1)} />

                                        </Box>
                                        <div style={{ marginTop: '10px' }}>
                                            <Grid container >
                                                <Grid item xs={10}  >
                                                    <Typography variant="h5"><b>
                                                        {/* {product.name} */}
                                                    </b></Typography>
                                                </Grid>
                                                <Grid item xs={2} >
                                                    <div style={{ background: '#281c83', cursor: 'pointer', borderRadius: '50%', paddingInline: '7px', color: 'white', float: 'right', display: 'flex' }}>
                                                        {/* {product.bids} */}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid container gap={2} style={{ marginTop: '10px' }}>
                                                <Grid item xs={2}>
                                                    <Avatar style={{ backgroundColor: 'rgb(128,0,128)' }} />
                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography variant="body1" color='grey'>
                                                        {user.email}
                                                    </Typography>
                                                    <Typography variant="body1" color='grey'><b>
                                                        {user.name}
                                                    </b></Typography>
                                                </Grid>
                                                <Grid item xs={5} >
                                                    <br />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Card >
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                    <br />

                    <Grid item xs={6}>

                        <Grid container rowGap={2}>
                            <Grid item xs={4} >
                                <label className="labels" style={{}}>Upload File</label>
                                <ImageUpload center id="file" name="file" onInput={setImage} setFileReader={setFileReader} rounded={true} errorText="Please provide an image." />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'grid' }}>
                                <label className="labels" style={{}}>Select Type</label>
                                <select
                                    name="type"
                                    value={formik.values.type}
                                    onChange={(e) => { onSelectHandler(e.target.value); formik.handleChange(e) }}
                                    // onClick={(e) => console.log(e)}
                                    // onBlur={handleBlur}
                                    style={{
                                        display: "block", height: '5vh', borderRadius: '5px', border: '1px solid lightgrey', color: formik.values.experience ? 'black' : 'grey', paddingInline: '1vh'
                                    }}
                                >
                                    <option value="" disabled label="Select any type">
                                        Select any type{" "}
                                    </option>
                                    <option value="Bidding" onClick={() => setIsSelection(false)} label="Bidding">
                                        {" "}
                                        Bidding
                                    </option>
                                    <option value="Selection" label="Selection">
                                        Selection
                                    </option>
                                </select>
                            </Grid>
                            {isSelection && <Grid item xs={12} style={{ display: 'grid' }}>
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
                                <label className="labels" style={{}}>Min Worth</label><TextField name="worth" size="small" variant="outlined" type="text" className="form-control" placeholder="worth" value={formik.values.worth} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'grid' }}>
                                <label className="labels" style={{}}>Title</label><TextField name="title" size="small" variant="outlined" type="text" className="form-control" placeholder="title" value={formik.values.title} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'grid' }}>
                                <label className="labels" style={{}}>Additional Details</label><TextField name="additionalDetails" multiline={true} rows={3} size="small" variant="outlined" type="text" className="form-control" placeholder="Enter additional details" value={formik.values.additionalDetails} onChange={formik.handleChange} />
                            </Grid>
                            <Button fullWidth style={{ backgroundColor: '#282d6b', marginTop: '1vh' }} color="primary" variant="contained" type="submit" >Save Profile</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </form >

        </div >
    );
};

