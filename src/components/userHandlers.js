import React from 'react';
// import { mainSecArray } from './usefullVariables'
// import * as animation from './Animations'
// import { onLeaveBannerHandler } from './Animations'

let scrollFlag = false

// const mainObjectArray = [
//     {
//         name: 'home',
//         path: '/',
//         leaveAnimation: animation.onLeaveBannerHandler,
//         animationTime: 1000,
//     },
//     {
//         name: 'Section1',
//         path: '/',
//         leaveAnimation: animation.onLeaveSection1Handler,
//         animationTime: 1000,
//     },
//     {
//         name: 'Section2',
//         path: '/',
//         leaveAnimation: animation.onLeaveSection2Handler,
//         animationTime: 1100,
//     },
//     {
//         name: 'Section3',
//         path: '/',
//         leaveAnimation: animation.onLeaveSection3Handler,
//         animationTime: 1000,
//     },
//     {
//         name: 'Footer',
//         path: '/footer',
//         leaveAnimation: animation.onLeaveFooter,
//         animationTime: 1000,
//     }
// ]

// const getKeyByValue = (object, value) => {
//     return Object.keys(object).find(key => object[key] === value);
// }



export const scrollDirectionDetect = (e, p) => {

    if (!scrollFlag) {

        // const l = window.location.pathname
        // const secArrayLength = mainSecArray.length
        // const actualIndex = mainSecArray.indexOf(l)
        // const nextIndex = parseInt(actualIndex + 1)
        // const prevIndex = parseInt(actualIndex - 1)
        // // const animationTime = mainObjectArray[actualIndex].animationTime
        // if (e.deltaY < 0 && actualIndex !== 0) {
        //     scrollFlag = true
        //     console.log('scrolling up');
        //     // p.push(mainSecArray[prevIndex])
        // }
        // else if (e.deltaY > 0 && actualIndex !== secArrayLength) {
        //     scrollFlag = true
        //     // onLeaveBannerHandler()
        //     runAnimation(actualIndex)
        //     setTimeout(() => {
        //         console.log('scrolling down');
        //         // p.push(mainSecArray[nextIndex])
        //     }, 1000);

        // }


    }
}

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


