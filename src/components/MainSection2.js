import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './MainSection2.css'
import { onLoadSection2Handler, onLeaveSection2Handler } from './Animations'
import DelayLink from './DelayLink'
import { LongArrowRight } from './Icons'
import WhiteElement from './WhiteElement'
import { lettersSplit } from './userHandlers'
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu';
import Swipe from 'react-easy-swipe';
import Logo from './Logo'
import { routes } from '../routes';
import { lang } from './usefullVariables';

let debounce = true;

class MainSection2 extends Component {
    state = {
        width: Number,
    };
    componentDidMount() {
        onLoadSection2Handler();
        this.widthChange();
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onSwipeDown = () => {
        onLeaveSection2Handler();
        setTimeout(() => { this.props.history.push(routes.mainProd) }, 500);
    };
    onSwipeUp = () => {
        onLeaveSection2Handler();
        setTimeout(() => { this.props.history.push(routes.mainVideo) }, 500);
    };

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            onLeaveSection2Handler();
            setTimeout(() => {
                this.props.history.push(routes.mainProd)
            }, 500);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveSection2Handler();
            setTimeout(() => {
                this.props.history.push(routes.mainVideo)
            }, 500);
        }
    };

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    };
    render() {
        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 1400);
        window.addEventListener('resize', this.widthChange);

        const mainPageApi = this.props.mainPageApi && this.props.mainPageApi[0];
        const { acf: {
            canna_car: cannaCar,
            side_text: sideTextImg,
            description_2: {
                title,
                text
            } = Object,
        } = Object } = mainPageApi ? mainPageApi : Object;

        const { width } = this.state;

        const sideText = (
            <div className={[s.sideText, 'sideText'].join(' ')}>
                <img src={sideTextImg && sideTextImg.url} alt='Decoration text' />
                <div className={[s.decorationText, 'decorationText'].join(' ')}>{lettersSplit('latest')}</div>
            </div>
        );

        return (
            <Swipe onSwipeDown={this.onSwipeDown} onSwipeUp={this.onSwipeUp}>

                <div className={s.mainContainer}>
                    <WhiteElement socialMedia={this.props.socialMedia} />
                    <div className={s.logoBox}>
                        <Logo />
                    </div>
                    <BurgerMenu fixed={true} />
                    <div className={s.cannaBox}>
                        <div className={[s.number, 'sec_1_number'].join(' ')}>3.</div>
                        <img className={[s.cannaCar, 'cannaCar'].join(' ')} src={cannaCar && cannaCar.url} alt='Car' />
                    </div>
                    {width <= 1150 ? null : sideText}
                    <div className={s.bottomBox}>
                        <div className={s.description}>
                            <div className={s.title}>{title}</div>
                            <div className={s.text}>{text}</div>
                        </div>
                        <div className={[s.buttonWrapper, 'buttonBox'].join(' ')}>
                            <p>{lang === 'en' ? 'See how to roll' : 'Zobacz jak skręcać'}</p>
                            <DelayLink
                                to={routes.newsVideos}
                                delay={0}
                                onDelayStart={() => { }}>
                                <button type='button'>{lang === 'en' ? 'check it!' : 'Sprawdź to!'}</button>
                                <div className={s.nextButton}><span>Click</span><LongArrowRight /></div>
                            </DelayLink>
                        </div>
                    </div>
                </div>
            </Swipe>
        );
    }
}

const mapStateToProps = (state) => {
    const { mainPageApi } = state;
    return { mainPageApi }
};

export default withRouter(connect(mapStateToProps)(MainSection2));