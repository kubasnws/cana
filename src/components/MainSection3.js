import React, { Component } from 'react';
import s from './MainSection3.css';
import WhiteElement from './WhiteElement';
import Swipe from 'react-easy-swipe';
import { lettersSplit } from './userHandlers';
import DelayLink from './DelayLink';
import { LongArrowRight, ChevronDown } from './Icons';
import { onLoadSection3Handler, onLeaveSection3Handler } from './Animations';
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu';
import VideoDisplay from './VideoDisplay';
import { routes } from '../routes';
import Logo from './Logo';
import { lang } from "./usefullVariables";
import { backendBaseUrl } from './usefullVariables';

let debounce = true;

class MainSection3 extends Component {
    state = {
        width: Number,
        videoData: {},
    }

    componentDidMount() {
        this.getVideoApi()
        onLoadSection3Handler()
        this.widthChange()
        window.addEventListener('wheel', this.onScroll, false);
    }

    getVideoApi = async () => {
        let language = '180'
        switch (lang) {
            case 'pl':
                language = '180'
                break;
            case 'en':
                language = '301'
                break;
            default:
                break;
        }
        const firstPostAPI = `${backendBaseUrl}/wp-json/wp/v2/video_posts/${language}`

        try {
            const response = await fetch(firstPostAPI);
            const data = await response.json();

            this.setState({ videoData: data });
        } catch (err) {
            console.log(`${err}, coś poszło nie tak!`);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onSwipeDown = () => {
        onLeaveSection3Handler()
        setTimeout(() => { this.props.history.push(routes.mainImage) }, 500);
    }
    onSwipeUp = () => {
        onLeaveSection3Handler()
        setTimeout(() => { this.props.history.push(routes.mainFooter) }, 500);
    }

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            onLeaveSection3Handler()
            setTimeout(() => {
                this.props.history.push(routes.mainImage)
            }, 500);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveSection3Handler()
            setTimeout(() => {
                this.props.history.push(routes.mainFooter)
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
        window.addEventListener('resize', this.widthChange)

        const { sideTextSection__1 } = this.props.images
        const { leftImage, videoBackground } = this.props.section
        const { width, videoData } = this.state
        const { acf: { video_description: videoTitle, video_title: videoDescription } = Object } = videoData
        console.log(videoTitle);
        const scrollDown = (
            <div className={s.down}>
                <DelayLink
                    to={routes.mainFooter}
                    delay={500}
                    onDelayStart={onLeaveSection3Handler}>
                    <>
                        <ChevronDown />
                    </>
                </DelayLink>
            </div>
        )

        const sideText = (
            <div className={[s.sideText, 'sideText'].join(' ')}>
                <img src={sideTextSection__1} alt='Decoration text' />
                <div className={[s.decorationText, 'decorationText'].join(' ')}>{lettersSplit('news')}</div>
            </div>
        )

        const description = (
            <div className={[s.description, 'section3Desc'].join(' ')}>
                <h1>{videoTitle}</h1>
                <div className={s.text}>{videoDescription}</div>
            </div>
        )

        return (
            <Swipe onSwipeDown={this.onSwipeDown} onSwipeUp={this.onSwipeUp}>
                <div className={s.mainContainer}>
                    <WhiteElement socialMedia={this.props.socialMedia} />
                    <div className={s.logoBox}>
                        <Logo customStyles={width <= 599 ? { width: '100px' } : { width: '160px' }} />
                    </div>
                    <BurgerMenu fixed={true} />
                    {width <= 820 ? null : <img className={[s.leftImage, 'sec_3_image'].join(' ')} src={leftImage} alt="" />}
                    <div className={s.leftSection}>
                        <div className={s.content}>
                            <div className={[s.buttonWrapper, 'buttonBox'].join(' ')}>
                                <p>{lang === 'en' ? 'It is so easy' : 'To jest naprawdę proste'}</p>
                                <DelayLink
                                    to={routes.mainProd}
                                    delay={0}
                                    onDelayStart={() => { }}
                                    onDelayEnd={() => { }}>
                                    <button type='button'>{lang === 'en' ? 'Just find out' : 'Przekonaj się'}</button>
                                    <div className={s.nextButton}><span>Click</span><LongArrowRight /></div>
                                </DelayLink>
                            </div>
                            {width <= 820 ? null : description}
                        </div>
                        <div className={[s.video, 'videoSec3'].join(' ')}>
                            <VideoDisplay
                                videoData={videoData}
                                width={width}
                                videoBackground={videoBackground}
                            />

                        </div>
                    </div>
                    {width <= 1150 ? null : sideText}
                    {scrollDown}
                </div>
            </Swipe>
        );
    }
}

export default withRouter(MainSection3);