import React, { Component } from 'react';
import styles from './MainSection2.css'
import { onLoadSection2Handler, onLoadSideSocialHandler, onLeaveSection2Handler } from './Animations'
import DelayLink from './DelayLink'
import { LongArrowRight, ChevronDown } from './Icons'
import WhiteElement from './WhiteElement'
import { lettersSplit } from './userHandlers'
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu'
import Languages from './Languages'
import Swipe from 'react-easy-swipe';

let debounce = false

class MainSection2 extends Component {
    state = {
        width: Number,
    }
    componentDidMount() {
        onLoadSection2Handler()
        onLoadSideSocialHandler(.7)
        this.widthChange()
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onSwipeDown = () => {
        onLeaveSection2Handler()
        setTimeout(() => { this.props.history.push('/main-section-1') }, 500);
    }
    onSwipeUp = () => {
        onLeaveSection2Handler()
        setTimeout(() => { this.props.history.push('/main-section-3') }, 500);
    }

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            onLeaveSection2Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push('/main-section-1')
                debounce = false
            }, 500);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveSection2Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push('/main-section-3')
                debounce = false
            }, 500);
        }
    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }
    render() {
        window.addEventListener('resize', this.widthChange)
        // window.addEventListener('wheel', (e) => scrollDirectionDetect(e, this.props.history));

        const { sideTextSection__1, cannaCar } = this.props.images
        const { title, text: apiText } = this.props.sectionApi
        const { width } = this.state

        const sideText = (
            <div className={[styles.sideText, 'sideText'].join(' ')}>
                <img src={sideTextSection__1} alt='Decoration text' />
                <div className={[styles.decorationText, 'decorationText'].join(' ')}>{lettersSplit('latest')}</div>
            </div>
        )
        const scrollDown = (
            <div className={styles.down}>
                <DelayLink
                    to='/main-section-3'
                    delay={500}
                    onDelayStart={() => onLeaveSection2Handler()}
                    onDelayEnd={() => { }}>
                    <ChevronDown />
                </DelayLink>
            </div>
        )

        return (
            <Swipe onSwipeDown={this.onSwipeDown} onSwipeUp={this.onSwipeUp}>
                <div className={styles.mainContainer}>
                    <WhiteElement socialMedia={this.props.socialMedia} />

                    <Languages fixed={true} x='6vh' y={width <= 600 ? '20vw' : '70vw'} />
                    <BurgerMenu fixed={true} />
                    <div className={styles.cannaBox}>
                        <div className={[styles.number, 'sec_1_number'].join(' ')}>1.</div>
                        <img className={[styles.cannaCar, 'cannaCar'].join(' ')} src={cannaCar} alt='' />
                    </div>
                    {width <= 1150 ? null : sideText}
                    <div className={styles.bottomBox}>
                        <div className={styles.description}>
                            <div className={styles.title}>{title}</div>
                            <div className={styles.text}>{apiText}</div>
                        </div>
                        <div className={[styles.buttonWrapper, 'buttonBox'].join(' ')}>
                            <p>See how to roll</p>
                            <DelayLink
                                to='/news/section3'
                                delay={0}
                                onDelayStart={() => { }}
                                onDelayEnd={() => { }}>
                                <button type='button'>check it!</button>
                                <div className={styles.nextButton}><span>Click</span><LongArrowRight /></div>
                            </DelayLink>
                        </div>
                    </div>
                    {scrollDown}
                </div>
            </Swipe>
        );
    }
}

export default withRouter(MainSection2);