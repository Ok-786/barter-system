import React from 'react'
import Carousel from './Carousel/Carousel.js'
import './Categories.css';

export default function Gallery({ items }) {
    

    const setting = {
        dragSpeed: 1.25,
    }


    return (
        <>
            <div className='container1'>
                <Carousel {...setting}>
                    {
                        items && items.map((i, index) => (
                            <div className={'card-container1'}>
                                <div style={{ borderRadius: '100vh' }}>
                                    <img src={i} width='80vh' height="80vh" alt={i} />
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </>
    )
}
