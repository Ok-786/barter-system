import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axiosGetAllProducts } from '../../../utils/Api'
import ProductCard from './ProductCard/ProductCard'
import styles from './Products.module.css'
import SearchBar from './SearchBar/SearchBar';
import NotFound from '../../../assets/notfound.png';
import FilterDropDown from './FilterDropDown/FilterDropDown';
import { addAllProducts } from '../../../Store/Actions/user';




export default function Products({ search, category }) {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    async function getProducts() {
        setLoading(true)
        const response = await axiosGetAllProducts();
        console.log('response')
        console.log(response)
        setProducts(response.data.products);
        setAllProducts(response.data.products);
        setLoading(false)
    }
    useEffect(() => {

        dispatch(addAllProducts(allProducts))
    }, [allProducts, dispatch])

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        console.log('adasdadasdadad')
        const items = allProducts.filter(product => {
            return product.name.toLowerCase().includes(search.toLowerCase());
        })
        setProducts(items)
    }, [search])



    return (
        <>
            <div className={styles['container']}>
                <br />
                <br />
                <br />
                <br />
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <h1>Products</h1>
                    </div>
                    <div style={{ float: 'right', marginTop: '2vh' }}>
                        <FilterDropDown />
                    </div>
                </div>
                <div className={styles['scrollbar']}>
                    <Grid container rowGap={6} >
                        {
                            products ? products.map(product =>
                                product.user_email !== user.email && <>
                                    {console.log(category, product)}
                                    {category.toLowerCase() === 'all' &&
                                        <Grid item lg={3}>
                                            <ProductCard product={product} getProducts={getProducts} />
                                        </Grid>
                                    }
                                    {product.category && category.toLowerCase() === product.category.toLowerCase() &&
                                        <Grid item lg={3}>
                                            <ProductCard product={product} getProducts={getProducts} />
                                        </Grid>
                                    }
                                </>
                            ) :
                                !loading && (<div style={{ justifyContent: 'center', textAlign: 'center', width: '100%' }}>
                                    <img alt="not found" width="50%" height="100%" src={NotFound} />
                                </div>)
                        }
                        {loading && < CircularProgress color="secondary" style={{ position: 'absolute', marginInline: '45%', marginTop: '10vh' }} />}
                    </Grid>
                </div>
            </div >
        </>
    )
}
