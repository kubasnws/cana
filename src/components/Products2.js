import React, { Component } from 'react';
import s from './Products2.css'
import DelayLink from './DelayLink'
import { LongArrowRight, LongArrowLeft, ChevronUp, ChevronDown } from './Icons'
import Swiper from 'swiper/js/swiper.esm.bundle';
import { withRouter } from "react-router";
import { routes } from "../routes";
import { lang } from './usefullVariables';

let debounce = true

class Products2 extends Component {
    state = {

    }
    componentDidMount() {

        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 60,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            hashNavigation: true,
        })

        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            this.props.history.push(routes.productsHome)
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            this.props.history.push(routes.productsInsta)
        }
    }

    render() {

        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 2000);

        const { topBanner } = this.props.sectionApi
        return (
            <div className={s.mainBox}>
                <div className={s.topBanner}>
                    <div>canna dark horse</div>
                    {typeof topBanner === 'undefined' ? null : <img src={topBanner.url} alt={topBanner.name} />}
                </div>
                <div className={s.swiperBox}>
                    <div className={[s.swiperContainer, 'swiper-container'].join(' ')}>
                        <div className={[s.swiperWrapper, 'swiper-wrapper'].join(' ')}>
                            <SwiperElements products={this.props.products} />
                        </div>
                    </div>
                    <div className={[s.swiperButtonNext, s.swiperButton, 'swiper-button-next'].join(' ')}><LongArrowRight /></div>
                    <div className={[s.swiperButtonPrev, s.swiperButton, 'swiper-button-prev'].join(' ')}><LongArrowLeft /></div>
                </div>
                <div className={s.bottomButtons}>
                    <div className={[s.button, s.leftButton].join(' ')}>
                        <DelayLink
                            to={routes.productsHome}
                            delay={0}
                            onDelayStart={() => { }}
                            onDelayEnd={() => { }}>
                            <div><ChevronUp /><span>{lang === 'en' ? 'See all products' : 'Zobacz wszystkie produkty'}</span></div>
                        </DelayLink>

                    </div>
                    <div className={[s.button, s.rightButton].join(' ')}>
                        <DelayLink
                            to={routes.productsInsta}
                            delay={0}
                            onDelayStart={() => { }}
                            onDelayEnd={() => { }}>
                            <div><span>Catch the dark horse</span><ChevronDown /></div>
                        </DelayLink>

                    </div>
                </div>
            </div>

        );
    }
}

const SwiperElements = props => {

    const products = props.products
    const result = products.map(item => <SwiperElement key={item.id} item={item} />)
    return (
        <>
            {result}
        </>
    )
}

const SwiperElement = props => {
    const { url, name } = props.item.acf.images[0]
    const { short_description } = props.item.acf
    return (
        <div className={[s.swiperSlide, 'swiper-slide'].join(' ')} data-hash={props.item.id}>
            <img src={url} alt={name} />
            <div className={s.productDescription}>
                {short_description}
            </div>
        </div>
    )

}

export default withRouter(Products2);