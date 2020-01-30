import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './MainSection3.css';
import WhiteElement from './WhiteElement';
import Swipe from 'react-easy-swipe';
import { lettersSplit } from './userHandlers';
import DelayLink from './DelayLink';
import { LongArrowRight } from './Icons';
import { onLoadSection3Handler, onLeaveSection3Handler } from './Animations';
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu';
import VideoDisplay from './VideoDisplay';
import { routes } from '../routes';
import Logo from './Logo';
import { lang } from "./usefullVariables";
import { backendBaseUrl, mainPageApiLink, videoApiLink } from './usefullVariables';
import { fetchItems } from "../actions";

let debounce = true;

class MainSection3 extends Component {
    state = {
        width: Number,
    }

    componentDidMount() {
        !this.props.videoData && this.props.fetchVideo();
        onLoadSection3Handler()
        this.widthChange()
        window.addEventListener('wheel', this.onScroll, false);
    }

    // getVideoApi = async () => {
    //     let language = '180'
    //     switch (lang) {
    //         case 'pl':
    //             language = '180'
    //             break;
    //         case 'en':
    //             language = '301'
    //             break;
    //         default:
    //             break;
    //     }
    //     const firstPostAPI = `${backendBaseUrl}/wp-json/wp/v2/video_posts/${language}`
    //     try {
    //         const response = await fetch(firstPostAPI);
    //         const data = await response.json();


    //         this.setState({ videoData: data });
    //     } catch (err) {
    //         console.log(`${err}, coś poszło nie tak!`);
    //     }
    // }

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
    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 1400);
        window.addEventListener('resize', this.widthChange);

        const mainPageApi = this.props.mainPageApi && this.props.mainPageApi[0];
        const { acf: {
            side_text: sideTextImg,
            image_sec_3: leftImage,
            video_background: videoBackground,
        } = Object } = mainPageApi ? mainPageApi : Object;

        const videoApi = this.props.videoData && this.props.videoData[0];
        const { acf: { video_description: videoTitle, video_title: videoDescription } = Object } = videoApi ? videoApi : Object;

        const { width } = this.state

        const sideText = (
            <div className={[s.sideText, 'sideText'].join(' ')}>
                <img src={sideTextImg && sideTextImg.url} alt='Decoration text' />
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
                        <Logo customStyles={{ width: '160px' }} />
                    </div>
                    <BurgerMenu fixed={true} />
                    <img className={[s.leftImage, 'sec_3_image'].join(' ')} src={leftImage && leftImage.url} alt="" />
                    <div className={s.leftSection}>
                        <div className={s.content}>
                            <div className={[s.buttonWrapper, 'buttonBox'].join(' ')}>
                                <p>{lang === 'en' ? 'It is so easy' : 'To jest naprawdę proste'}</p>
                                <DelayLink
                                    to={routes.productsHome}
                                    delay={0}
                                    onDelayStart={() => { }}
                                    onDelayEnd={() => { }}>
                                    <button type='button'>{lang === 'en' ? 'Just find out' : 'Przekonaj się'}</button>
                                    <div className={s.nextButton}><span>Click</span><LongArrowRight /></div>
                                </DelayLink>
                            </div>
                            {description}
                        </div>
                        <div className={[s.video, 'videoSec3'].join(' ')}>
                            {videoApi && (
                                <VideoDisplay
                                    videoData={videoApi}
                                    videoBackground={videoBackground}
                                />
                            )}
                        </div>
                    </div>
                    {width <= 1150 ? null : sideText}
                </div>
            </Swipe>
        );
    }
}

const mapStateToProps = (state) => {
    const { mainPageApi, videoData } = state;
    return {
        mainPageApi,
        videoData
    }
};

const mapDispatchToProps = dispatch => ({
    fetchVideo: () => dispatch(fetchItems(videoApiLink(1), 'videoData')),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainSection3));