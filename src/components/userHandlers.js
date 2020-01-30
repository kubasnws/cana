import React from 'react';

export const scrollDirectionDetect = (e, p) => { }

export const lettersSplit = (text) => {
    const splitLetters = text.split("");
    const res = splitLetters.map((e, i = 0) => {
        return (
            <span className='letter' key={i + 1}>{e}</span>
        )
    })
    return res
}

export const dateFormatted = data => {

    const date = new Date(data * 1000);
    const str = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) + "." + ((date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)) + "." + date.getFullYear()
    return str;
}


