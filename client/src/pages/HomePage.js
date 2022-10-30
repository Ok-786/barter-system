import React, { useState } from 'react'
import Categories from '../components/user/Categories/Categories'
import Products from '../components/user/Products/Products'
import Slideshow from '../components/user/SlideShow/SlideShow'

export default function HomePage({ search }) {
    const [category, setCategory] = useState('all');
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>

            {(user.status == false) ?
                <div style={{ marginTop: '10%' }}>
                    <h6>Oops....</h6>
                    <h3>You have been blocked</h3>
                </div>
                :
                <>
                    <Slideshow />
                    <Categories setCategory={setCategory} />
                    <Products search={search} category={category} />
                </>
            }
        </div>
    )
}
