import React, { Component } from 'react';
import s from './MainSection3.css'
import WhiteElement from './WhiteElement'
import Swipe from 'react-easy-swipe';
import { lettersSplit } from './userHandlers'
import DelayLink from './DelayLink'
import { LongArrowRight, ChevronDown } from './Icons'
import { onLoadSideSocialHandler, onLoadSection3Handler, onLeaveSection3Handler } from './Animations'
import { withRouter } from "react-router";
import Languages from './Languages'
import BurgerMenu from './BurgerMenu'
import VideoDisplay from './VideoDisplay'
import { routes } from '../routes';
import Logo from './Logo';

const firstPostAPI = 'http://cana.snwsprodukcja71.pl/wp-json/wp/v2/video_posts/180'
let debounce = false

class MainSection3 extends Component {
    state = {
        width: Number,
        firstVideoPost: {
            videoLink: String,
            postTitle: String,
            videoTitle: String,
            videoDescription: String,
            videoPostsConnection: [],
        },
        videoAPILoaded: false,
    }

    componentDidMount() {
        onLoadSideSocialHandler(1)
        onLoadSection3Handler()
        this.widthChange()
        window.addEventListener('wheel', this.onScroll, false);
        fetch(firstPostAPI)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                const d = data;
                this.setState(() => ({
                    firstVideoPost: {
                        videoLink: d.acf.video.url,
                        postTitle: d.title.rendered,
                        videoTitle: d.acf.video_description,
                        videoDescription: d.acf.video_title,
                        videoPostsConnection: d.acf.video_products_conection
                    },
                    videoAPILoaded: true,
                }));
            })
            .catch(error => console.log(error + " coś nie tak"))

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
            debounce = true
            setTimeout(() => {
                '/news/section1'
                this.props.history.push(routes.mainImage)
                debounce = false
            }, 500);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveSection3Handler()
            debounce = true
            setTimeout(() => {
                this.props.history.push(routes.mainFooter)
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

        const { sideTextSection__1 } = this.props.images
        const { leftImage, videoBackground } = this.props.section
        const { width, firstVideoPost, videoAPILoaded } = this.state
        const { videoTitle, videoDescription } = this.state.firstVideoPost

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
                                <p>It is so easy</p>
                                <DelayLink
                                    to={routes.mainProd}
                                    delay={0}
                                    onDelayStart={() => { }}
                                    onDelayEnd={() => { }}>
                                    <button type='button'>Just find out</button>
                                    <div className={s.nextButton}><span>Click</span><LongArrowRight /></div>
                                </DelayLink>
                            </div>
                            {width <= 820 ? null : description}
                        </div>
                        <div className={[s.video, 'videoSec3'].join(' ')}>

                            <VideoDisplay
                                firstVideoPost={firstVideoPost}
                                width={width}
                                videoAPILoaded={videoAPILoaded}
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