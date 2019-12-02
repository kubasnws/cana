import React, { Component } from 'react';
import styles from './MainSection1.css'
import BannerTopBar from './BannerTopBar'
import { onLoadSection1Handler, onLeaveSection1Handler } from './Animations'
import WhiteElement from './WhiteElement'
import Logo from './Logo'
import DelayLink from './DelayLink'
import Typed from 'typed.js'
import { withRouter } from "react-router";
import { LongArrowRight } from './Icons';
import Swipe from 'react-easy-swipe';
import { routes } from '../routes';
import ScrollItButton from './ScrollItButton/ScrollItButton';
import { lang } from './usefullVariables';

let debounce = true

class MainSection1 extends Component {
    state = {
        width: Number
    }
    componentDidMount() {
        onLoadSection1Handler()
        this.widthChange()

        window.addEventListener('wheel', this.onScroll, false);



        const strings = ['Follow <br /> the <strong>Dark Horse</strong>', 'Follow <br /> the Dark Horse']
        const options = {
            strings: strings,
            typeSpeed: 60,
            backSpeed: 50,
            startDelay: 800,
            showCursor: false,
        }
        this.typed = new Typed(this.el, options)
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
        this.typed.destroy();
    }

    onSwipeDown = () => {
        onLeaveSection1Handler()
        setTimeout(() => { this.props.history.push(routes.home) }, 500);
    }
    onSwipeUp = () => {
        onLeaveSection1Handler()
        setTimeout(() => { this.props.history.push(routes.mainImage) }, 500);
    }

    onScroll = e => {

        if (e.wheelDeltaY > 0 && !debounce) { //Up

            onLeaveSection1Handler()
            // debounce = true
            setTimeout(() => {
                this.props.history.push(routes.home)
            }, 500);
        }
        else if (e.wheelDeltaY < 0 && !debounce) { //Down
            onLeaveSection1Handler()
            setTimeout(() => {
                this.props.history.push(routes.mainImage)
            }, 500);
        }
        e.preventDefault();
    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }
    render() {
        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 1400);
        window.addEventListener("resize", this.widthChange);
        const { images } = this.props
        const { sideTextSection__1, left_image__1, sample_product } = images
        const { width } = this.state

        const seeProducts = (
            <div className={styles.products}>
                <DelayLink
                    to={routes.mainProd}
                    delay={500}
                    onDelayStart={onLeaveSection1Handler}>
                    <div className={[styles.nextButton, 'prodButton'].join(' ')}><span>{lang === 'en' ? 'Check the amazing products' : 'Zobacz niesamowite produkty'}</span><LongArrowRight /></div>
                </DelayLink>
            </div>
        )

        return (
            <Swipe onSwipeDown={this.onSwipeDown} onSwipeUp={this.onSwipeUp}>
                <div className={styles.mainContainer}>
                    <WhiteElement />
                    <BannerTopBar logoDisplay={false} custStyle='section1' />
                    {seeProducts}
                    <div className={styles.logoBox}>
                        <Logo customStyles={width <= 599 ? { width: '100px' } : { width: '160px' }} />
                        <div className={styles.underLogoText}>
                            <span ref={(el) => { this.el = el }}></span>
                        </div>
                    </div>
                    <div className={[styles.sideText, 'sideText'].join(' ')}><img src={sideTextSection__1} alt='Decoration text' /></div>
                    <div className={[styles.sampleProductBox, 'sampleProductBox'].join(' ')}>
                        <img className={styles.sampleProduct} src={sample_product} alt="Sample product" />
                    </div>
                    <div className={[styles.buttonBox, 'buttonBox'].join(' ')}>
                        <ScrollItButton smallText={lang === 'en' ? 'How?' : 'Jak?'} bigText={lang === 'en' ? 'Just take it easy!' : 'Na luzie i bez stresu!'} animation={onLeaveSection1Handler} />
                    </div>
                    <div className={[styles.leftBox, 'sec1left'].join(' ')}>
                        <img src={left_image__1} alt="Canna" />
                    </div>
                </div>
            </Swipe>
        );
    }
}

export default withRouter(MainSection1);