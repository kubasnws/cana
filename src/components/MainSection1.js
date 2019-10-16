import React, { Component } from 'react';
import styles from './MainSection1.css'
import BannerTopBar from './BannerTopBar'
import { onLoadSection1Handler, onLoadLogoHandler, onLoadSideSocialHandler } from './Animations'
import WhiteElement from './WhiteElement'
import Logo from './Logo'
import DelayLink from './DelayLink'
import Typed from 'typed.js'
import { withRouter } from "react-router";
import { LongArrowRight } from './Icons'
import { onLeaveSection1Handler } from './Animations'
import Swipe from 'react-easy-swipe';

let debounce = false

class MainSection1 extends Component {
    state = {
        width: Number
    }
    componentDidMount() {
        onLoadLogoHandler()
        onLoadSection1Handler()
        onLoadSideSocialHandler(.6)
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
        setTimeout(() => { this.props.history.push('/') }, 500);
    }
    onSwipeUp = () => {
        onLeaveSection1Handler()
        setTimeout(() => { this.props.history.push('/main-section-2') }, 500);
    }

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            onLeaveSection1Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push('/')
                debounce = false
            }, 500);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveSection1Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push('/main-section-2')
                debounce = false
            }, 500);
        }
    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }
    render() {
        window.addEventListener("resize", this.widthChange);

        const { logo, sideTextSection__1, left_image__1, sample_product } = this.props.images
        const { width } = this.state

        const scrollDown = (
            <div className={styles.buttonWrapper}>
                <p>Ready to see?</p>

                <DelayLink
                    to='/main-section-2'
                    delay={500}
                    onDelayStart={() => onLeaveSection1Handler()}
                    onDelayEnd={() => { }}>
                    <button type='button'>scroll it!</button>
                </DelayLink>
            </div>
        )


        const seeProducts = (
            <div className={styles.products}>
                <DelayLink
                    to='/products/section1'
                    delay={500}
                    onDelayStart={() => onLeaveSection1Handler()}
                    onDelayEnd={() => { }}>
                    <div className={[styles.nextButton, 'prodButton'].join(' ')}><span>Check the amazing products</span><LongArrowRight /></div>
                </DelayLink>
            </div>
        )

        return (
            <Swipe onSwipeDown={this.onSwipeDown} onSwipeUp={this.onSwipeUp}>
                <div className={styles.mainContainer}>
                    <WhiteElement socialMedia={this.props.socialMedia} />
                    <BannerTopBar logoDisplay={false} custStyle='section1' />
                    {seeProducts}
                    <div className={styles.logoBox}>
                        <Logo logo={logo} customStyles={width <= 599 ? { width: '100px' } : { width: '160px' }} />
                        <div className={styles.underLogoText}>
                            <span ref={(el) => { this.el = el }}></span>
                        </div>
                    </div>
                    <div className={[styles.sideText, 'sideText'].join(' ')}><img src={sideTextSection__1} alt='Decoration text' /></div>
                    <div className={[styles.sampleProductBox, 'sampleProductBox'].join(' ')}>
                        <img className={styles.sampleProduct} src={sample_product} alt="Sample product" />
                    </div>
                    <div className={[styles.buttonBox, 'buttonBox'].join(' ')}>
                        {scrollDown}
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