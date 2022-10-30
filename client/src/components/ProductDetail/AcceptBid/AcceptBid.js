import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import './AddStaff.css';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import { axiosAcceptProduct, axiosEnableChat } from '../../../utils/Api';
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

export default function AcceptBid({ productId, setBidAccepted, open, handleOpen, handleClose, product }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    console.log('aaaaaaaaaaaaa')
    console.log(product, user, productId)

    const submitHandler = async () => {
        console.log('sfsfsfsfsf')
        setBidAccepted(product);
        handleClose();

        try {
            await axiosEnableChat(user.email, { id2: product.email })
            await axiosAcceptProduct(productId, product);
            navigate('/chats')
        } catch (err) {
            console.log(err)
        }
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
                        <label className='labels' style={{ fontSize: '26px' }}>{product.title ? product.title : product.name}</label>
                    </div>
                    <div >
                        <Grid container gap={1} style={{ color: 'gray' }}>
                            <Grid item xs={12} >
                                <label className="labels" style={{}}></label>
                            </Grid>

                            {<Grid item xs={12} style={{ display: 'grid', marginInline: '20%' }}>
                                <div style={{ width: '100%', height: '35vh' }}>
                                    <img src={`http://localhost:8000/${product.image}`} alt="Product_image" width="100%" height='100%' />
                                </div>

                            </Grid>}
                            <Grid item xs={12} style={{ display: 'grid' }}>
                                <label className="labels" style={{}}>Bidding Worth:&nbsp;{product.worth}</label>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'grid' }}>
                                <label className="labels" style={{}}>Creator:&nbsp;{product.user_email}</label>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'grid' }}>
                            </Grid>
                            <Button fullWidth style={{ backgroundColor: '#282d6b', borderRadius: '20px', marginTop: '1vh' }} color="primary" variant="contained" onClick={submitHandler}>Accept Bid</Button>
                        </Grid>
                    </div >
                </Box>
            </Modal>
        </div>
    );
}




