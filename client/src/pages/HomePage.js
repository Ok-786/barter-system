import React from 'react'
import Categories from '../components/user/Categories/Categories'
import Products from '../components/user/Products/Products'
import Slideshow from '../components/user/SlideShow/SlideShow'

export default function HomePage({ search }) {
    return (
        <div>
            <Slideshow />
            {/* <div style={{width:'100vh'}}> */}
            <Categories />
            {/* </div> */}
            <Products search={search} />
        </div>
    )
}
