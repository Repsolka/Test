import React from "react";
import styles from "./Page.module.css"

let Page = (props) => {

    let firstField = props.fields[0];
    let secondField = props.fields[1];
    let thirdField = props.fields[2];
    let options = Object.values(thirdField.values).map((value,index) => {
        return <option value={value} key={index}>{value}</option>
    })
    return (
        <form onSubmit={props.onSendButtonClick}>
            <table>
                <thead>
                <tr>
                    <td colSpan={2} className={styles.leftCol}>
                        <img src={props.image} alt="Clevertec"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className={styles.title}>
                        <span>{props.title}</span>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={styles.leftCol}>
                        <span className={styles.fieldName}>{firstField.title}: </span>
                    </td>
                    <td className={styles.rightCol}>
                        <input name={firstField.name} type={firstField.type} className={styles.fields}
                               ref={props.firstFieldValue} value={props.firstFieldText}
                               onChange={props.onFirstFormChange}/>
                    </td>
                </tr>
                <tr>
                    <td className={styles.leftCol}>
                        <span className={styles.fieldName}>{secondField.title}: </span>
                    </td>
                    <td className={styles.rightCol}>
                        <input name={secondField.name} type="number" className={styles.fields}
                               ref={props.secondFieldValue} onChange={props.onSecondFieldChange}
                               value={props.secondFieldText}
                        />
                    </td>
                </tr>
                <tr>
                    <td className={styles.leftCol}>
                        <span className={styles.fieldName}>{thirdField.title}: </span>
                    </td>
                    <td className={styles.rightCol}>
                        <select name={thirdField.name} type="list" ref={props.thirdFieldValue}
                                onChange={props.onThirdFieldChange}>
                            {/*{options.map((val,index) => {
                                return <option value={val} key={index}>{val}</option>
                            })}*/}{options}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className={styles.sendButtonStr}><input type="submit" value="Отправить"/></td>
                </tr>
                </tbody>
            </table>
        </form>
    )

}

export default Page;