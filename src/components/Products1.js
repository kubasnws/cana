import React, { Component } from 'react';
import s from './Products1.css'
import { onLoadLogoHandler } from './Animations';
import Languages from './Languages'
import Logo from './Logo'
import DelayLink from './DelayLink'
import { LongArrowRight, LongArrowLeft } from './Icons'
import Swiper from 'swiper/js/swiper.esm.bundle';
import SocialMedia from './SocialMedia'
import { withRouter } from "react-router";

let debounce = false


class Products1 extends Component {
    state = {
        bigImage: String,
        bigDescription: String,
    }
    componentDidMount() {
        onLoadLogoHandler()

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
            console.log('dzoala')
            debounce = true
            setTimeout(() => {
                this.props.history.push('/products/section2')
                debounce = false
            }, 500);
        }
    }

    render() {
        const { horse, bannerPhoto, socialBar } = this.props.sectionApi
        const { dark_logo } = this.props.images
        const { width } = this.props

        const seeProducts = (
            <div className={s.titleLink}>
                <DelayLink
                    to='/products/section2'
                    delay={0}
                    onDelayStart={() => { }}
                    onDelayEnd={() => { }}>
                    <div className={s.nextButton}><span>Check the amazing products</span><LongArrowRight /></div>
                </DelayLink>
            </div>
        )
        const leftImage = (
            <div className={s.leftImage}>
                <img src={typeof bannerPhoto === 'undefined' ? null : bannerPhoto.url} alt={typeof bannerPhoto === 'undefined' ? null : bannerPhoto.name} />
            </div>
        )
        const social = (
            <div className={s.imageWrapper}>
                <SocialMedia isWhite={true} fontSize="22px" boxSize='42px' marginBottom={false} />
                <img className={s.socialImage} src={typeof socialBar === 'undefined' ? null : socialBar.url} alt={typeof socialBar === 'undefined' ? null : socialBar.name} />
            </div>
        )

        return (
            <div className={s.mainBox}>
                <img className={s.backgroundImage} src={typeof horse === 'undefined' ? null : horse.url} alt={typeof horse === 'undefined' ? null : horse.name} />
                <div className={s.topBox}>
                    <div className={s.languageBox}>
                        <Languages color='dark' />
                    </div>
                    <div className={s.logoBox}>
                        <Logo logo={dark_logo} color='dark' />
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
                                <SwiperElements products={this.props.products} hover={this.productHoverHandler} />
                                <SwiperElements products={this.props.products} hover={this.productHoverHandler} />
                                <SwiperElements products={this.props.products} hover={this.productHoverHandler} />
                            </div>
                        </div>
                        <div className={[s.swiperButtonNext, s.swiperButton, 'swiper-button-next'].join(' ')}><LongArrowRight /></div>
                        <div className={[s.swiperButtonPrev, s.swiperButton, 'swiper-button-prev'].join(' ')}><LongArrowLeft /></div>
                    </div>
                </div>
                {width >= 550 ? social : null}
            </div>

        );
    }
}

const SwiperElements = props => {

    const products = props.products
    const result = products.map(item => <SwiperElement key={item.id} element={item} hover={props.hover} />)
    return (
        <>
            {result}
        </>
    )
}

const SwiperElement = props => {
    const { url, name } = props.element.acf.images[0]
    return (
        <div className={[s.swiperSlide, 'swiper-slide'].join(' ')}>
            <img src={url} alt={name} data-description={props.element.title.rendered} onMouseEnter={e => props.hover(e)} />
        </div>
    )

}

export default withRouter(Products1);