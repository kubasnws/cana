import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './Products1.css'
import Logo from './Logo'
import DelayLink from './DelayLink'
import { LongArrowRight, LongArrowLeft } from './Icons'
import Swiper from 'swiper/js/swiper.esm.bundle';
import { withRouter } from "react-router";
import { routes } from '../routes';
import ScrollItButton from './ScrollItButton/ScrollItButton';
import { onLeaveSection1Handler } from './Animations';
import Swipe from 'react-easy-swipe';
import { lang } from './usefullVariables';

let debounce = false;


class Products1 extends Component {
    state = {
        bigImage: String,
        bigDescription: String,
    };
    componentDidMount() {


        this.props.prodData && this.displayBig();


        new Swiper('.swiper-prod', {
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
        });

        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    displayBig = () => {
        const firstProd = document.querySelector('.swiper-slide > img');

        const description = firstProd.getAttribute('data-description');
        const image = firstProd.getAttribute('src');

        this.setState({
            bigImage: image,
            bigDescription: description
        });
    };

    productHoverHandler = e => {
        const prod = e.target;
        const active = document.querySelectorAll(`.${s.swiperSlide}>img`);

        active.forEach(item => {
            item.classList.remove(s.active);
        });
        prod.classList.add(s.active);
        const description = prod.getAttribute('data-description');
        const image = prod.getAttribute('src');

        this.setState({
            bigImage: image,
            bigDescription: description
        });
    };



    onScroll = e => {
        if (e.deltaY < 0) { //Up

        }
        else if (e.deltaY > 0 && !debounce) { //Down
            // onLeaveSection2Handler()
            debounce = true;
            setTimeout(() => {
                this.props.history.push(routes.productsSingle);
                debounce = false
            }, 500);
        }
    };

    onSwipeUp = () => {
        setTimeout(() => { this.props.history.push(routes.productsSingle) }, 500);
    };

    productClickHandler = link => {
        this.props.history.push(link)
    };

    render() {
        const acf = this.props.productsPageData;
        const { prodData } = this.props;

        const seeProducts = (
            <div className={s.titleLink}>
                <DelayLink
                    to={routes.newsHome}
                    delay={0}
                    onDelayStart={() => { }}
                    onDelayEnd={() => { }}>
                    <div className={s.nextButton}><span>{lang === 'en' ? 'Or keep up with latest news' : 'Lub bądź na bieżąco z najnowszymi wiadomościami'}</span><LongArrowRight /></div>
                </DelayLink>
            </div>
        );
        const leftImage = (
            <div className={s.leftImage}>
                <img src={acf && acf[0].acf.left_main_image.url} alt='' />
                <div className={s.scrollWrapperBox}>
                    <ScrollItButton smallText={lang === 'en' ? 'Interested?' : 'Zainteresowany?'} location={routes.productsSingle} animation={onLeaveSection1Handler} />
                </div>
            </div>
        );

        const titlePl = (
            <>
                Zobacz nasze <br /><span>produkty!</span>
            </>
        );

        const titleEn = (
            <>
                Check out the <br /><span>products!</span>
            </>
        );

        return (
            <Swipe onSwipeUp={this.onSwipeUp}>
                <div className={s.mainBox}>
                    <div className={s.topBox}>
                        <div className={s.logoBox}>
                            <Logo />
                        </div>
                    </div>
                    <div className={s.middleBox}>
                        {leftImage}
                        <div className={s.rightProduct}>
                            <div className={s.titleBox}>
                                <h1 className={s.title}>{lang === 'en' ? titleEn : titlePl}</h1>
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
                            <div className={[s.swiperContainer, 'swiper-container swiper-prod'].join(' ')}>
                                <div className={[s.swiperWrapper, 'swiper-wrapper'].join(' ')}>
                                    {prodData && <SwiperElements products={prodData} hover={this.productHoverHandler} click={this.productClickHandler} />}
                                </div>
                            </div>
                            <div className={[s.swiperButtonNext, s.swiperButton, 'swiper-button-next'].join(' ')}><LongArrowRight /></div>
                            <div className={[s.swiperButtonPrev, s.swiperButton, 'swiper-button-prev'].join(' ')}><LongArrowLeft /></div>
                        </div>
                    </div>
                </div>
            </Swipe>
        );
    }
}

const SwiperElements = ({ products = [], hover, click }) => {

    const result = products.map((item, index) => products.length > 0 && <SwiperElement key={item.id} index={index} element={item} hover={hover} click={click} />);
    return (
        <>
            {result}
        </>
    )
};

const SwiperElement = ({ element, hover, click, index }) => {
    const { url, name } = element.acf.images[0];
    const currentProductLink = `${routes.productsSingle}#${element.id}`;
    return (
        <div className={[s.swiperSlide, 'swiper-slide'].join(' ')}>
            <img src={url} alt={name} className={index === 0 && s.active} data-description={element.title.rendered} onMouseEnter={e => hover(e)} onClick={() => click(currentProductLink)} />
        </div>
    )
};

const mapStateToProps = (state) => {
    const { prodData, productsPageData } = state;
    return { prodData, productsPageData }
};

export default withRouter(connect(mapStateToProps)(Products1));