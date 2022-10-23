import LinkedIn from '@mui/icons-material/LinkedIn'
import Twitter from '@mui/icons-material/Twitter'
import React from 'react'
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div>
            <div className={styles["logo-footer"]}>
                <div
                    className={[styles["option"], styles["mobile-option"]].join(" ")}
                >

                </div>
                <li
                    className={[styles["option"], styles["mobile-option"]].join(" ")}
                ></li>
                <div className={[styles["m-footer"], styles["d-footer"]].join(" ")}>
                    <div>
                        <LinkedIn />
                        <Twitter />
                    </div>

                    <p style={{ fontSize: "0.8rem" }}>
                        Copyright @ 2022 Barter, Inc - All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    )
}
