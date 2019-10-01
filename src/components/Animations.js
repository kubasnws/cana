import { TweenMax, TimelineMax, Elastic, Power2, Back } from 'gsap';

const elasticEase = Elastic.easeOut.config(1, 0.6)
const elasticEase2 = Elastic.easeIn.config(1, 0.75)
const power = Power2.easeInOut
const back = Back.easeOut.config(.5)
const back1 = Back.easeOut.config(2)
const backIn = Back.easeInOut.config(1.5)

const logoLeave = () => {
    console.log('called logo');
    TweenMax.to(`.logo`, .3, { scale: 0, ease: elasticEase })
}
const languagesLeave = () => {
    TweenMax.staggerTo(`.languages li`, .7, { y: 30, opacity: 0, ease: elasticEase }, .16)
}
const burgerMenuLeave = () => {
    TweenMax.to('.burgerMenu', .3, { x: 160, ease: elasticEase2 })
}
const whiteElementLoad = () => {
    TweenMax.to('.whiteElement', .7, { x: '-94%', ease: elasticEase })
    TweenMax.from('.whiteElement', .7, { backgroundColor: '#242424' })
}
const menuBoxLeave = () => {
    TweenMax.to(`.buttonBox`, .4, { y: 100, opacity: 0, ease: elasticEase2 })
}

export const onLoadAgeHandler = () => {
    const end = () => {

    }
    const e = new TimelineMax({ delay: 1 })
    TweenMax.set('.cameleon', { scale: 0 })
    e.addLabel('start')
        .to('.whiteElement', .5, { x: '-93vw', ease: elasticEase })
        .to('.cameleon', .4, { scale: 1, ease: elasticEase, clearProps: 'all' }, 'start+=.2')
        .staggerFrom('.formElement', .4, { y: 50, opacity: 0 }, .3)
        .call(end)

    // console.log(document.querySelector('.whiteElement'));
}

export const onLoadBannerHandler = () => {
    const e = new TimelineMax({ delay: .3 })
    e.addLabel('start')
        .staggerFrom(`.languages li`, 1.3, { y: 30, opacity: 0, ease: elasticEase }, .16)
        .staggerFrom(`.burgerMenu span`, 1, { opacity: 0 }, .2, 'start+=.3')
        .from(`.scrollIt`, .3, { x: 100, opacity: 0 }, 'start+=.5')
        .staggerFrom(`.social li`, 1.2, { y: 40, opacity: 0, ease: elasticEase, clearProps: "all" }, .26, 'start+=.5')
        .set(`.social li`, { transition: ".3s ease-in-out" })
        .from(`.menuContainer .active`, .5, { opacity: 0, y: 200 }, 'start')
        .from(`.menuContainer .disactive:first-of-type`, 1.4, { opacity: 0, x: 200, ease: elasticEase }, .6, 'start+=.4')
        .from(`.menuContainer .disactive:last-of-type`, 1.4, { opacity: 0, x: -200, ease: elasticEase }, .6, 'start+=.4')
        .from(`.logo`, 1.2, { scale: 0, ease: elasticEase }, '-=1.2')
}

export const onLeaveBannerHandler = () => {
    const e = new TimelineMax()
    e.addLabel('start')
        .add(languagesLeave)
        .add(logoLeave, 'start+=.2')
        .add(burgerMenuLeave, 'start')
        .to(`.scrollIt`, .4, { y: 100, opacity: .4, ease: elasticEase2 }, 'start')
        .staggerTo(`.social li`, .14, { x: -250, opacity: 1, ease: elasticEase2 }, .06, 'start')
        .to(`.menuContainer .active`, .6, { y: -100, opacity: 0, ease: elasticEase }, 'start')
        .to('.menuContainer .disactive', .6, { y: -70, opacity: 0, ease: elasticEase }, 'start')
}

export const onLoadLogoHandler = () => {
    const e = new TimelineMax({ delay: .3 })
    e.addLabel('logoAnimation')
        .from(`.logoAnimationLines`, .4, { width: 0, height: 0, ease: power })
        .to(`.logoAnimationLines`, .4, { opacity: 1 }, 'logoAnimation')
        .to(`.logoAnimationLines:first-of-type`, .7, { x: -120, y: -55 }, 'logoAnimation+=.5')
        .to(`.logoAnimationLines:last-of-type`, .7, { x: 120, y: 55 }, 'logoAnimation+=.5')
        .from(`.logo`, .7, { scale: 0, ease: elasticEase }, 'logoAnimation+=.8')
        .to(`.logoAnimationLines`, .3, { opacity: 0 }, 'logoAnimation+=.7')
}

export const onLoadSection1Handler = () => {
    const e = new TimelineMax({ delay: .3 })
    e.addLabel('start')
        .staggerFrom(`.languages li`, 1.3, { y: 30, opacity: 0, ease: elasticEase }, .16)
        .from('.burgerCircle', 1, { x: 200, ease: elasticEase }, 'start+=.3')
        .staggerFromTo('.burgerText span', .4, { opacity: 0, y: -40 }, { opacity: 1, y: 0, ease: elasticEase }, .1, "start+=1")
        .add(whiteElementLoad, 'start')
        .fromTo('.sideText img', 1.5, { y: '100vh' }, { y: -100, opacity: 1, ease: elasticEase }, 'start+=.2')
        .from('.sampleProductBox > img', .5, { y: 100, opacity: 0, ease: power }, 'start+=.2')
        .from('.sec1left > img', .6, { scale: 0, opacity: 0, ease: elasticEase }, 'start+=.16')
        .from('.prodButton', .4, { opacity: 0, x: -60, ease: power }, 'start+=.6')
}

export const onLeaveSection1Handler = () => {
    const e = new TimelineMax()
    e.addLabel('start')
        .add(languagesLeave)
        .add(logoLeave, 'start+=.2')
        .add(burgerMenuLeave, 'start')
        .add(menuBoxLeave, 'start')
        .to('.sec1left > img', .4, { scale: 0, opacity: 0, ease: elasticEase2 }, 'start')
}

export const onLoadSection2Handler = () => {
    const e = new TimelineMax({ delay: .3 })
    e.addLabel('start')
        .add(whiteElementLoad, 'start')
        .fromTo('.sideText img', 2.5, { y: -100 }, { y: -1000, ease: elasticEase }, 'start-=.3')
        .staggerFromTo('.decorationText .letter', .5, { x: 1000, opacity: 0 }, { x: 0, opacity: 1, ease: back }, .1, 'start+=.2')
        .from('.cannaCar', .6, { opacity: 0, scale: 0, ease: elasticEase }, 'start+=.2')
}

export const onLeaveSection2Handler = () => {
    const e = new TimelineMax()
    e.addLabel('start')
        .staggerTo('.decorationText .letter', .3, { x: -300, opacity: 0, ease: elasticEase2 }, .04)
        .add(menuBoxLeave, 'start')
}

export const onLoadSection3Handler = (delay) => {
    const e = new TimelineMax({ delay: .3 })
    e.addLabel('start')
        .staggerFromTo('.decorationText .letter', .7, { x: 1000, opacity: 0 }, { x: 0, opacity: 1, ease: back }, .1)
        .fromTo('.sideText img', 2.5, { y: -1000 }, { y: -2000, ease: elasticEase }, 'start')
        .from('.sec_3_image', .5, { opacity: 0, y: 80, ease: power }, 'start+=.2')
        .from('.sec_3_number', .7, { scale: 0, ease: elasticEase }, 'start+=.3')
        .add(whiteElementLoad, 'start')
        .staggerFrom('.section3Desc > *', .5, { x: 500, opacity: 0, ease: back1 }, .16, 'start+=.6')
        .from('.videoSec3', .5, { scale: .4, opacity: 0, ease: elasticEase, clearProps: 'all' }, 'start+=.4')
}

export const onLeaveSection3Handler = () => {
    const e = new TimelineMax()
    e.addLabel('start')
        .staggerTo('.decorationText .letter', .4, { x: -300, opacity: 0, ease: elasticEase2 }, .04)
        .to('.videoSec3', .3, { scale: .4, opacity: 0, ease: elasticEase2 }, 'start')
        .add(menuBoxLeave, 'start')
}

export const onLoadFooterHandler = () => {
    const e = new TimelineMax({ delay: .3 })
    e.addLabel('start')
        .add(whiteElementLoad, 'start')
        .staggerFrom('.contactElement', .5, { opacity: 0, scale: 0, ease: elasticEase }, .25, 'start+=.3')
        .from('.backTextFooter', .3, { opacity: 0 }, 'start')
        .from('.productFooter', .6, { opacity: 0, scale: .7, ease: elasticEase }, 'start+=.4')
        .fromTo('.sideText img', 2.5, { y: -2000 }, { y: -2400, ease: elasticEase }, 'start')
}

export const onLeaveFooterHandler = () => {
    const e = new TimelineMax()
    e.addLabel('start')
        .staggerTo('.contactElement', .3, { opacity: 0, x: -200, ease: elasticEase }, .08)
        .to('.backTextFooter', .3, { opacity: 0 }, 'start')
        .to('.productFooter', .3, { opacity: 0, scale: .7, ease: elasticEase }, 'start')
        .add(logoLeave, 'start+=.2')

}

export const onLoadSideSocialHandler = (delay) => {
    const e = new TimelineMax({ delay: delay })
    const socialEl = document.querySelectorAll('.socialBox > a')
    e.addLabel('start')
        .staggerFrom(socialEl, .5, { scale: 0, ease: back1, clearProps: 'all' }, .3)
        .to('.socialBox>a:nth-of-type(1)', .5, { backgroundColor: '#3b5998', borderColor: '#3b5998', ease: back1 }, 'start')
        .to('.socialBox>a:nth-of-type(2)', .5, { backgroundColor: '#fb3958', borderColor: '#fb3958', ease: back1 }, 'start+=.3')
        .to('.socialBox>a:nth-of-type(3)', .5, { backgroundColor: '#1DA1F2', borderColor: '#1DA1F2', ease: back1 }, 'start+=.6')
        .staggerTo('.socialBox> a path', .3, { color: '#fff' }, .3, 'start')
        .staggerTo(socialEl, .5, { backgroundColor: 'transparent', borderColor: '#000', clearProps: 'all' }, .3, '-=.4')
        .staggerTo('.socialBox> a path', .1, { color: '#000', clearProps: 'all' }, .3, '-=1')
        .set(socialEl, { transition: '.3s ease-in-out' })
}
export const socialLoad = () => {
    const e = new TimelineMax()
    const social = document.querySelectorAll('.socialBox > a')

    e.addLabel('start')
        .staggerFrom(social, .7, { opacity: 0, scale: .4, x: 120, ease: backIn }, .1, '+=.4')
        .set(social, { transition: '.3s ease-in-out', clearProps: 'x' })
}

export const burgerMenuAnimation = (reset) => {

    if (reset === true) {
        new TimelineMax().addLabel('start')
            .staggerTo('.burgerMenu > span', .4, { opacity: 1 }, .2)
            .from('.burgerCircle', 1, { x: 100, ease: elasticEase }, 'start+=.16')
            .set('.burgerText span', { scale: 1 }, 'start')
            .staggerFrom('.burgerText span', .3, { y: -80, ease: elasticEase }, .12, 'start+=.22')
        return
    }

    const menuLineItem = document.querySelectorAll('.menuLineItem')
    const e = new TimelineMax()
    const burgerMenuContainer = document.querySelector('.burgerMenuContainer')

    const menuTextAnimation = (left, top) => {
        new TimelineMax().addLabel('second')
            .staggerTo('.burgerText span', .3, { scale: 0, ease: elasticEase2 }, .05)
        // .to('.menuText', .2, { opacity: 1, top: top - 105, left: left - '50vw', ease: back })

    }

    const menuLinesAnimation = () => {
        const { x, y, width } = burgerMenuContainer.getBoundingClientRect()
        const left = x + width / 2
        const top = y + 60

        TweenMax.to('.burgerMenu > span', .4, { opacity: 0 })

        menuLineItem.forEach((el, i) => {
            new TimelineMax().addLabel('start')
                .set(el, { backgroundColor: 'transparent', delay: i * .2 })
                .to(el, .8, { width: '200px', left: left - 100, top: top + i * 40, ease: backIn, delay: i * .1 }, 'start')
                .call(menuTextAnimation, [left, top], null, "start-=.7")
        })
    }

    TweenMax.set(menuLineItem, { backgroundColor: 'white', color: 'white', height: '40px', width: '1px' })

    e.addLabel('start')
        .to(burgerMenuContainer, .6, { width: '50vw', height: '230px', x: '-50vw', y: '10vh', borderRadius: '10px', border: '4px solid #77924a', backgroundColor: 'rgba(155, 142, 119, 0.85)', ease: backIn })
        .call(menuLinesAnimation)



}

export const productSideText = (delay, location) => {
    const e = new TimelineMax({ delay: delay })
    if (location === '/products/section1' || location === '/news/section1') {
        e.addLabel('start')
            .staggerFromTo('.productSideText > span', .8, { opacity: 0, y: 300 }, { rotation: 90, transformOrigin: "center center", opacity: 1, y: 0, ease: elasticEase }, .08)
    } else if (location === '/products/section2' || location === '/news/section2') {

        e.addLabel('start')
            .staggerFromTo('.productSideText > span', 1.3, { rotation: 90, opacity: 1, y: 0 }, { y: '-86vh', ease: elasticEase }, .08)
    } else if (location === '/products/section3' || location === '/news/section3') {
        e.addLabel('start')
            .staggerFromTo('.productSideText > span', 1.3, { rotation: 90, opacity: 1, y: '-86vh' }, { y: '-170vh', ease: elasticEase }, .08)
    } else if (location === '/products/footer' || location === '/news/footer') {
        e.addLabel('start')
            .fromTo('.productSideText > span', .1, { rotation: 90, opacity: 1, y: '-170vh' }, { opacity: 0, ease: elasticEase })
    }

}

export const menuOpen = c => {
    const main = document.querySelector('.menuContentBox'),
        white = document.querySelector('.whiteMenuBox'),
        contact = document.querySelectorAll('.infos > .element')
    if (c === 'close') {
        const e = new TimelineMax()
        e.addLabel('start')
            .to(white, .4, { transform: 'translateY(-100%)', ease: power })
            .to(main, .3, { opacity: 0, ease: power }, '-=.2')
    } else {
        const e = new TimelineMax()
        e.addLabel('start')
            .to(main, .3, { opacity: 1, ease: power })
            .to(white, .4, { transform: 'translateY(0)', ease: power }, 'start+=.12')
            .staggerFrom(contact, .4, { opacity: 0, y: 60 }, .12, 'start+=.5')
            .addLabel('nav')
    }

}

export const news2 = (option) => {

    if (option === 'leave') {
        const e = new TimelineMax()
        e.addLabel('start')
            .to('.videoBox', .4, { x: 500, opacity: 0, ease: power })
            .to('.left', .4, { x: -500, opacity: 0, ease: power }, 'start')
            .to('.topBanner', .3, { y: '-100%', ease: power })
    } else if (option === 'enter') {
        const e = new TimelineMax({ delay: .3 })
        e.from('.topBanner', .4, { y: '-100%', ease: power })
            .addLabel('start')
            .from('.videoBox', .4, { x: 500, opacity: 0, ease: power, clearProps: 'all' }, 'start+=.1')
            .from('.left > h2', .4, { x: -500, opacity: 0, ease: power }, 'start+=.1')
            .from('.left > div', .4, { x: -500, opacity: 0, ease: power }, 'start+=.3')
    }
    return;
}

export const news3 = (option) => {

    if (option === 'leave') {
        const e = new TimelineMax()
        e.addLabel('start')
            .to('.photoTitle', .4, { x: 700, opacity: 0, ease: elasticEase2 })
            .to('.photoDescription', .4, { x: -700, opacity: 0, ease: elasticEase2 }, 'start')
            .to('.mainImage', .3, { y: '-100%', ease: power })
    } else if (option === 'enter') {
        const e = new TimelineMax({ delay: .3 })
        e.from('.mainImage', .7, { y: '-100%', ease: power })
            .addLabel('start')
            .from('.photoTitle', .8, { x: 700, opacity: 0, ease: elasticEase }, 'start+=.1')
            .from('.photoDescription', .8, { x: -700, opacity: 0, ease: elasticEase }, 'start+=.1')
    }
    return;
}

export const instaSection = (option) => {

    if (option === 'leave') {
        const e = new TimelineMax({ repeat: -1 })
        e.addLabel('start')
            .staggerTo('.instaElement:nth-of-type(-n+3)', .5, { x: -300, opacity: 0, ease: power }, .06)
            .staggerTo('.instaElement:nth-of-type(n+4)', .5, { x: 300, opacity: 0, ease: power }, -.06, 'start')
            .to('.topBannerSec3', .3, { y: '-150%', ease: power }, '-=.2')

    } else if (option === 'enter') {
        const e = new TimelineMax({ delay: .3 })
        e.from('.topBannerSec3', .4, { y: '-150%', ease: power })
            .addLabel('start')
            .staggerFrom('.instaElement', .6, { cycle: { x: [-100, 0, 100], y: [-100, -100, -100, 100, 100, 100] }, opacity: 0, ease: power }, .06, 'start-=.1')
            .set('.instagramBox', { overflowY: 'auto' })
    }
    return;
}

export const whiteFooterAnimation = (option) => {

    if (option === 'leave') {
        const e = new TimelineMax()
        e.addLabel('start')

            .to('.topBannerFooter', .3, { y: '-150%', ease: power })

    } else if (option === 'enter') {
        const e = new TimelineMax({ delay: .3 })
        e.from('.topBannerFooter', .4, { y: '-150%', ease: power })
            .addLabel('start')
            .from('.footerImage', .3, { x: -200, opacity: 0, ease: power })
            .staggerFrom('.contactElement', .3, { x: 40, opacity: 0, ease: power }, .1, 'start-=.1')
            .from('.footerMail', .3, { y: 40, opacity: 0, ease: power }, 'start+=.3')

    }
    return;
}