import React from "react";
import styles from "./AbortDialogWindow.module.css"


let DialogWindow = (props) => {
    return (
        <dialog open>
            <div className={styles.center}>
                <span>Запрос отменён пользователем</span><br/>
                <span>Нажмите, чтобы перезагрузить страницу</span><br/>
                <button onClick={props.onReloadButtonClick}>Перезагрузить страницу</button>
            </div>
        </dialog>
    )
}
export default DialogWindow;