import React, { Component } from 'react';
import s from './MainSection2.css'
import { onLoadSection2Handler, onLeaveSection2Handler } from './Animations'
import DelayLink from './DelayLink'
import { LongArrowRight, ChevronDown } from './Icons'
import WhiteElement from './WhiteElement'
import { lettersSplit } from './userHandlers'
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu'
import Swipe from 'react-easy-swipe';
import Logo from './Logo'
import { routes } from '../routes';

let debounce = false

class MainSection2 extends Component {
    state = {
        width: Number,
    }
    componentDidMount() {
        onLoadSection2Handler()
        this.widthChange()
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onSwipeDown = () => {
        onLeaveSection2Handler()
        setTimeout(() => { this.props.history.push(routes.mainProd) }, 500);
    }
    onSwipeUp = () => {
        onLeaveSection2Handler()
        setTimeout(() => { this.props.history.push(routes.mainVideo) }, 500);
    }

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            onLeaveSection2Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push(routes.mainProd)
                debounce = false
            }, 500);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveSection2Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push(routes.mainVideo)
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
            <div className={[s.sideText, 'sideText'].join(' ')}>
                <img src={sideTextSection__1} alt='Decoration text' />
                <div className={[s.decorationText, 'decorationText'].join(' ')}>{lettersSplit('latest')}</div>
            </div>
        )
        const scrollDown = (
            <div className={s.down}>
                <DelayLink
                    to={routes.mainVideo}
                    delay={500}
                    onDelayStart={() => onLeaveSection2Handler()}>
                    <ChevronDown />
                </DelayLink>
            </div>
        )

        return (
            <Swipe onSwipeDown={this.onSwipeDown} onSwipeUp={this.onSwipeUp}>

                <div className={s.mainContainer}>
                    <WhiteElement socialMedia={this.props.socialMedia} />
                    <div className={s.logoBox}>
                        <Logo customStyles={width <= 599 ? { width: '100px' } : { width: '160px' }} />
                    </div>
                    {/* <Languages fixed={true} x='6vh' y={width <= 600 ? '20vw' : '70vw'} /> */}
                    <BurgerMenu fixed={true} />
                    <div className={s.cannaBox}>
                        <div className={[s.number, 'sec_1_number'].join(' ')}>1.</div>
                        <img className={[s.cannaCar, 'cannaCar'].join(' ')} src={cannaCar} alt='' />
                    </div>
                    {width <= 1150 ? null : sideText}
                    <div className={s.bottomBox}>
                        <div className={s.description}>
                            <div className={s.title}>{title}</div>
                            <div className={s.text}>{apiText}</div>
                        </div>
                        <div className={[s.buttonWrapper, 'buttonBox'].join(' ')}>
                            <p>See how to roll</p>
                            <DelayLink
                                to='/news/section3'
                                delay={0}
                                onDelayStart={() => { }}>
                                <button type='button'>check it!</button>
                                <div className={s.nextButton}><span>Click</span><LongArrowRight /></div>
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