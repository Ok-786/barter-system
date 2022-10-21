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


const initProducts = [
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'asssss',
        image: '',
        name: 'product1',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'asassss',
        image: '',
        name: 'Rayzer 5',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'assdsss',
        image: '',
        name: '234',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'asssdsss',
        image: '',
        name: 'XDlol',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'asssadadsss',
        image: '',
        name: 'hola',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'assawaxsss',
        image: '',
        name: 'Rayzer 5',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'asssawrdss',
        image: '',
        name: 'Rayzer 5',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'asweadssss',
        image: '',
        name: 'Rayzer 5',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'aswqwedssss',
        image: '',
        name: 'Rayzer 5',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'ass2sadasss',
        image: '',
        name: 'Rayzer 5',
        user_id: '123',
        user_name: 'Mr. Robot'
    },
    {
        bids: 0,
        category: 'laptop',
        expires_at: new Date(1, 23, 23),
        id: 'assw22421sss',
        image: '',
        name: 'Rayzer 5',
        user_id: '123',
        user_name: 'Mr. Robot'
    }
]

export default function Products({ search }) {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.user);
    const totalProducts = useSelector(state => state.user.allProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    async function getProducts() {
        setLoading(true)
        const response = await axiosGetAllProducts();
        console.log('response.data')
        console.log(response.data.products)
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
                {/* <div style={{ border: '1px solid rgb(0,0,0,.1)', display: 'inline-flex', justifyContent: 'space-between', padding: '2vh', paddingInline: '5vh', width: '93%', borderRadius: '10vh', marginBottom: '3vh' }}> */}
                {/* <SearchBar setSearchQuery={setSearchQuery} /> */}
                {/* </div> */}
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
                                    <Grid item lg={3}>
                                        <ProductCard product={product} getProducts={getProducts} />
                                    </Grid>
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
