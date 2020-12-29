import React from "react";
import preloader from '../../assets/images/preloader.gif'
import styles from './Preloader.module.css'

let Preloader = (props) => {
    return (
        <div className={styles.figure}>
            <img src = {preloader} className={styles.preloaderImage} alt={"Загрузка..."}/>
        </div>
    )
}
export default Preloader;