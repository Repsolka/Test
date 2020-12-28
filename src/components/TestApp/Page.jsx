import React from "react";
import * as axios from "axios";
import Preloader from "../../common/Preloader/Preloader";

let Page = (props) => {
    /*if(props.fields === null) {
        console.log('Hello')
        /!*let field_1 = props.fields(obj => {
            console.log('Hello')
            return obj.name === 'text';
        })*!/
    }*/
    //debugger
    //console.log(props.field1);
    /*let firstField = props.fields.filter(obj => {
        return obj.name === 'text'
    })*/
    /*   if(props.fields === null){
           return (
               <div>
                   <dialog open>
                       <Preloader/>
                       <span>Нажмите чтобы отменить запрос</span><br/>
                       <button onClick={props.onAbortButtonClick}>Отменить запрос</button>
                   </dialog>
               </div>
           )

       } else {*/
    let firstField = props.fields[0];
    let secondField = props.fields[1];
    let thirdField = props.fields[2];
    let options = Object.values(thirdField.values);
    return (
        <div>
            <form onSubmit={props.onSendButtonClick}>
                {props.title}<br/>
                <div>
                    <span>{firstField.title}: </span>
                    <textarea name={firstField.name} type={firstField.type}
                              ref={props.firstFieldValue} value={props.firstFieldText}
                              onChange={props.onFirstFormChange}/>
                </div>
                <div>
                    <span>{secondField.title}: </span>
                    <input name={secondField.name} type="number"
                           ref={props.secondFieldValue} onChange={props.onSecondFieldChange}
                           value={props.secondFieldText}
                    />
                </div>
                <div>
                    <span>{thirdField.title}: </span>
                    <select name={thirdField.name} type="list" ref={props.thirdFieldValue}
                            onChange={props.onThirdFieldChange}>
                        {/* <option>{thirdField.values.none}</option>*/}
                        {options.map(val => {
                            return <option value={val}>{val}</option>
                        })}
                        {/*{Object.keys(thirdField.values)}*/}
                    </select>

                </div>
                <div>

                </div>
                <input type="submit" value="send" />
                {/*<button onClick={props.onSendButtonClick}>Отправить</button>*/}
            </form>
        </div>
        /*<div>
           <img src={props.image}/>
          {props.title}
            {/!*<input name={props.name}/>*!/}
            {/!*{props.field_1.title}*!/}
        </div>*/
    )

}

export default Page;