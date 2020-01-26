import React, { Component } from 'react';
import s from './News2.css'
import { news2 } from './Animations';
import { withRouter } from "react-router";
import VideoDisplay from './VideoDisplay';
import { routes } from '../routes';
import { lang } from './usefullVariables';
import { backendBaseUrl } from './usefullVariables';
import Logo from './Logo';
// import Swiper from 'swiper/js/swiper.esm.bundle';



let debounce = true

class News2 extends Component {
    state = {
        videoData: {},
    }

    componentDidMount() {

        this.getVideoApi()

        news2('enter')
        window.addEventListener('wheel', this.onScroll, false);
    }

    getVideoApi = async () => {
        let language = 'pl'
        switch (lang) {
            case 'pl':
                language = '';
                break;
            case 'en':
                language = '/en';
                break;
            default:
                break;
        }

        const videoApi = `${backendBaseUrl}${language}/wp-json/wp/v2/video_posts?per_page=1`;

        try {
            const response = await fetch(videoApi)
            const data = await response.json()

            this.setState({ videoData: data[0] });
        } catch (err) {
            console.log(`${err}, coś poszło nie tak!`);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            this.props.history.push(routes.newsHome)
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            this.props.history.push(routes.newsInsta)
        }
    }


    render() {

        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 2000);

        const { topBanner, videoBackground } = this.props.sectionApi
        const { videoData } = this.state
        const { acf: { video_description: videoTitle, video_title: videoDescription } = Object } = videoData
        const { screenSize: {
            width,
            // height,
        } } = this.props

        const description = (
            <div className={[s.left, 'left'].join(' ')}>
                <h2>{videoTitle}</h2>
                <div>{videoDescription}</div>
            </div>
        )
        return (
            <div className={s.mainBox}>
                <div className={[s.topBanner, 'topBanner'].join(' ')}>
                    {typeof topBanner === 'undefined' ? null : <img src={topBanner.url} alt={topBanner.name} />}
                    <div className={s.logoBox}>
                        <Logo />
                    </div>
                </div>
                <div className={s.content}>
                    {width <= 680 ? null : description}
                    <div className={s.right}>
                        <div className={[s.videoBox, 'videoBox'].join(' ')}>
                            <VideoDisplay
                                videoData={videoData}
                                width={width}
                                videoBackground={videoBackground}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(News2);