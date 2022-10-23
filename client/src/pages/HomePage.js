import React, { useState } from 'react'
import Categories from '../components/user/Categories/Categories'
import Products from '../components/user/Products/Products'
import Slideshow from '../components/user/SlideShow/SlideShow'

export default function HomePage({ search }) {
    const [category, setCategory] = useState('all');
    return (
        <div>
            <Slideshow />
            {/* <div style={{width:'100vh'}}> */}
            <Categories setCategory={setCategory} />
            {/* </div> */}
            <Products search={search} category={category} />
        </div>
    )
}
