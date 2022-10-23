import { React, useEffect, useRef, useState } from "react";
import styles from './SlideShow.module.css';
import Slider1 from '../../../assets/slider1.jpg'
import Slider2 from '../../../assets/slider2.png'
import Slider3 from '../../../assets/slider3.jpg'

const colors = [Slider1, Slider2, Slider3];
const delay = 3500;

export default function Slideshow() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        var timeoutRef = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            clearTimeout(timeoutRef); //callback function in react
        };
    }, [index]);

    return (
        <div className={styles['slideshow']}>
            <div
                className={styles["slideshowSlider"]}
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {colors.map((slide, index) => (
                    <div
                        className={styles["slide"]}
                        key={index}
                    >
                        <div class={styles["after"]}>

                        </div>
                        <img src={slide} alt={`${index}`} width="100%" height={"100%"} />
                    </div>
                ))}
            </div>
            <div className={styles["slider-info"]}>
                <h1 style={{ fontSize: '30px' }}>We Provide, Ease to  Exchange & Bidding</h1>
                <h1 > <span style={{ fontSize: '50px', color: 'rgba(205,147, 205 ,1 )' }}>BARTER</span> SYSTEM</h1>
                <h1 style={{ fontSize: '20px', opacity: .6 }}>Just one touch away</h1>
            </div>
            <div className={styles["slideshowDots"]}>
                {colors.map((item, idx) => (
                    <div
                        key={idx}
                        className={[styles['slideshowDot'], index === idx && styles["active"]].join(' ')}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

