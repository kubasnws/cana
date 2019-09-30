import React from 'react';
import styles from './DateInput.css'


const DateInput = (props) => {
    const inputType = props.date
    let option = []
    if (inputType === 'day') {
        option = Array.from(Array(31), (x, index) => (index + 1) < 10 ? `0${index + 1}` : index + 1)
    } else if (inputType === 'month') {
        option = Array.from(Array(12), (x, index) => (index + 1) < 10 ? `0${index + 1}` : index + 1)
    } else {
        option = Array.from(Array(120), (x, index) => index + 1901).reverse()
    }

    const getOptions = option.map(option => { return <option value={option} key={option} >{option}</option> })

    return (
        <select value={props.newDate} onChange={(e) => props.handler(e, props.date)} className={[styles.formControl, "form-control", 'formElement'].join(' ')}>
            {getOptions}
        </select>
    )
}


export default DateInput;