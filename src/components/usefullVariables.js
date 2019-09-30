import * as animation from './Animations'


export const mainSecArray = [
    '/',
    '/main-section-1',
    '/main-section-2',
    '/main-section-3',
    '/footer'
]

export const mainObjectArray = [
    {
        name: 'home',
        path: '/',
        leaveAnimation: animation.onLeaveBannerHandler,
        animationTime: 1000,
    },
    {
        name: 'Section1',
        path: '/',
        leaveAnimation: animation.onLeaveSection1Handler,
        animationTime: 1000,
    },
    {
        name: 'Section2',
        path: '/',
        leaveAnimation: animation.onLeaveSection2Handler,
        animationTime: 1100,
    },
    {
        name: 'Section3',
        path: '/',
        leaveAnimation: animation.onLeaveSection3Handler,
        animationTime: 1000,
    },
    {
        name: 'Footer',
        path: '/footer',
        leaveAnimation: animation.onLeaveFooter,
        animationTime: 1000,
    }
]

export const pagesArray = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Products',
        path: '/products',
    },
    {
        name: 'Contact',
        path: '/contact',
    },

]

// export default { linksArray }