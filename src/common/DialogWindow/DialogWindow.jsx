import React from "react";
import Preloader from "../Preloader/Preloader";
import styles from "./DialogWindow.module.css"


let DialogWindow = (props) => {
    return (
        <dialog open>
            <Preloader/>
            <div className={styles.center}>
                <span>Нажмите, чтобы отменить запрос</span><br/>
                <button onClick={props.onAbortButtonClick}>Отменить запрос</button>
            </div>
        </dialog>
    )
}
export default DialogWindow;