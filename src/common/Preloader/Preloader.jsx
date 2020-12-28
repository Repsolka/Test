import React from "react";
import preloader from '../../assets/images/preloader.gif'
import styles from './Preloader.module.css'

let Preloader = (props) => {
    return (
        <div>
            <img src = {preloader} className={styles.preloaderImage}/>
        </div>
    )
}
export default Preloader;