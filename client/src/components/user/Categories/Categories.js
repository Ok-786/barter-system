import React from 'react'
import Carousel from './Carousel/Carousel.js'
import './Categories.css';
import Logo from '../../../assets/user.png';
import Laptop from '../../../assets/laptop.png';
import Cars from '../../../assets/cars.png';
import Bike from '../../../assets/bike.png';
import Shirt from '../../../assets/shirt.png';
import Xbox from '../../../assets/xbox.png';
import Pet from '../../../assets/pet.png';
import Decoration from '../../../assets/decoration.png';

export default function Categories() {
    const items = ['Mobiles', 'Laptop', 'Cars', 'Bikes', 'Cloths', 'Games', 'Pets', 'Decoration']
    const images = [Logo, Laptop, Cars, Bike, Shirt, Xbox, Pet, Decoration]
    const colors = ['rgb(248 209 81)', 'rgb(127 184 160)', 'rgb(239 173 234)', 'rgb(188 131 255)', 'rgb(176 243 68)', 'rgb(127 184 160)', 'rgb(248 209 81)', 'rgb(127 184 160)', 'rgb(239 173 234)']


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
            <div className={'pattern1'}></div>
            <div className={'pattern2'}></div>
            <div className='container'>
                <br />
                <br />
                <h1>Categories</h1>
                <br />
                <Carousel _data={items} {...setting}>
                    {
                        items.map((i, index) => (
                            <div className={'card-container'}>
                                <div
                                    key={index}
                                    // className='item'
                                    className={'card'}
                                    style={{ background: colors[index] }}
                                // style={{ ...itemStyle }}
                                >
                                    <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '-1vh' }}>
                                        <img src={images[index]} width='100vh' height="100vh" alt={i} />
                                    </div>
                                </div>
                                <p>{i}</p>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </>
    )
}
