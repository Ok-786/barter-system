import React from 'react';
import styles from "./Detail.modules.css";

export default function Detail() {
    return (
        <>
            <div style={{ margin: "20%", display: "inline-flex" }}>
                <div><img src="../../assets/laptop.png" alt='' /></div>
                <div>
                    <div>Product Name</div>
                    <div>
                        <h4 style={{ border: "2px solid black" }}>Owned by : "  "</h4>
                        <p>Product Description : <br /> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                    <div>
                        <div>Current Bid</div>
                        <div>CountDown</div>
                    </div>
                    <button>Place a bid</button>
                    <div>
                        <div>
                            <h3>Bid History</h3>
                            <div style={{ display: "inline-flex" }}>
                                <img src="http://placehold.it/500x300" alt="placeholder" />
                                <p>Mason LockWood</p>
                                <p>Laptop</p>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
