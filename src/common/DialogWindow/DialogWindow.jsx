import React from "react";
import Preloader from "../Preloader/Preloader";


let DialogWindow = (props) => {
    return (
        <dialog open>
            <Preloader/>
            <span>Нажмите чтобы отменить запрос</span><br/>
            <button onClick={props.onAbortButtonClick}>Отменить запрос</button>
        </dialog>
    )
}
export default DialogWindow;