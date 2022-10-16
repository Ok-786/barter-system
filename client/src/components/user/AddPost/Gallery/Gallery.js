import React from 'react'
import Carousel from './Carousel/Carousel.js'
import './Categories.css';

export default function Gallery({ items }) {
    

    const setting = {
        dragSpeed: 1.25,
        // itemWidth: 300,
        // itemHeight: 180,
        itemSideOffsets: 15,
    }

    // const itemStyle = {
    //     width: `${setting.itemWidth}px`,
    //     height: `${setting.itemHeight}px`,
    //     margin: `0px ${setting.itemSideOffsets}px`
    // }

    return (
        <>
            <div className='container1'>
                <Carousel _data={items} {...setting}>
                    {
                        items && items.map((i, index) => (
                            <div className={'card-container1'}>
                                {/* <div
                                    key={index}
                                    className={'card'}
                                    style={{ background: 'rgb(0,0,0,.3)' }}

                                > */}
                                <div style={{ borderRadius: '100vh' }}>
                                    <img src={i} width='80vh' height="80vh" alt={i} />
                                </div>
                                {/* </div> */}
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </>
    )
}
