import React, { Component } from 'react';
import s from './Products1.css'
import Languages from './Languages'
import Logo from './Logo'
import DelayLink from './DelayLink'
import { LongArrowRight, LongArrowLeft } from './Icons'
import Swiper from 'swiper/js/swiper.esm.bundle';
import { withRouter } from "react-router";
import { routes } from '../routes';

let debounce = false


class Products1 extends Component {
    state = {
        bigImage: String,
        bigDescription: String,
    }
    componentDidMount() {


        new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                },
                // when window width is >= 480px
                700: {
                    slidesPerView: 3,
                },
                // when window width is >= 640px
                1290: {
                    slidesPerView: 4,
                }
            }
        })

        if (this.props.isLoaded)
            this.displayBig()

        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    displayBig = () => {
        const firstProd = document.querySelector('.swiper-slide > img')

        const description = firstProd.getAttribute('data-description')
        const image = firstProd.getAttribute('src')

        this.setState({
            bigImage: image,
            bigDescription: description
        });
    }

    productHoverHandler = (e) => {
        const prod = e.target
        const active = document.querySelectorAll(`.${s.swiperSlide}>img`);

        active.forEach(item => {
            item.classList.remove(s.active);
        });
        prod.classList.add(s.active)
        const description = prod.getAttribute('data-description')
        const image = prod.getAttribute('src')

        this.setState({
            bigImage: image,
            bigDescription: description
        });
    }



    onScroll = e => {
        if (e.deltaY < 0) { //Up
            return
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            // onLeaveSection2Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push(routes.productsSingle)
                debounce = false
            }, 500);
        }
    }

    productClickHandler = link => {
        this.props.history.push(link)
    }

    render() {
        const { horse, bannerPhoto } = this.props.sectionApi
        const { width } = this.props

        const seeProducts = (
            <div className={s.titleLink}>
                <DelayLink
                    to={routes.newsHome}
                    delay={0}
                    onDelayStart={() => { }}
                    onDelayEnd={() => { }}>
                    <div className={s.nextButton}><span>Or keep up with latest news</span><LongArrowRight /></div>
                </DelayLink>
            </div>
        )
        const leftImage = (
            <div className={s.leftImage}>
                <img src={typeof bannerPhoto === 'undefined' ? null : bannerPhoto.url} alt={typeof bannerPhoto === 'undefined' ? null : bannerPhoto.name} />
            </div>
        )

        return (
            <div className={s.mainBox}>
                <img className={s.backgroundImage} src={typeof horse === 'undefined' ? null : horse.url} alt={typeof horse === 'undefined' ? null : horse.name} />
                <div className={s.topBox}>
                    <div className={s.languageBox}>
                        <Languages />
                    </div>
                    <div className={s.logoBox}>
                        <Logo />
                    </div>
                </div>
                <div className={s.middleBox}>
                    {width >= 800 ? leftImage : null}
                    <div className={s.rightProduct}>
                        <div className={s.titleBox}>
                            <h1 className={s.title}>Check out the <span>products!</span></h1>
                            {seeProducts}
                        </div>
                        <div className={s.activeProduct}>
                            <img src={this.state.bigImage} alt="Big product" />
                            <div className={s.activeDescription}>{this.state.bigDescription}</div>
                        </div>
                    </div>
                </div>
                <div className={s.bottomBox}>
                    <div className={s.swiper}>
                        <div className={[s.swiperContainer, 'swiper-container'].join(' ')}>
                            <div className={[s.swiperWrapper, 'swiper-wrapper'].join(' ')}>
                                <SwiperElements products={this.props.products} hover={this.productHoverHandler} click={this.productClickHandler} />
                            </div>
                        </div>
                        <div className={[s.swiperButtonNext, s.swiperButton, 'swiper-button-next'].join(' ')}><LongArrowRight /></div>
                        <div className={[s.swiperButtonPrev, s.swiperButton, 'swiper-button-prev'].join(' ')}><LongArrowLeft /></div>
                    </div>
                </div>
            </div>

        );
    }
}

const SwiperElements = props => {

    const products = props.products
    const result = products.map((item, index) => <SwiperElement key={item.id} index={index} element={item} hover={props.hover} click={props.click} />)
    return (
        <>
            {result}
        </>
    )
}

const SwiperElement = ({ element, hover, click, index }) => {
    const { url, name } = element.acf.images[0]
    const currentProductLink = `${routes.productsSingle}#${element.id}`
    return (
        <div className={[s.swiperSlide, 'swiper-slide'].join(' ')}>
            {/* <DelayLink
                to={currentProductLink}
                delay={0}
                onDelayStart={() => { }}
                onDelayEnd={() => { }}>
            </DelayLink> */}
            <img src={url} alt={name} className={index === 0 && s.active} data-description={element.title.rendered} onMouseEnter={e => hover(e)} onClick={() => click(currentProductLink)} />
        </div>
    )

}

export default withRouter(Products1);