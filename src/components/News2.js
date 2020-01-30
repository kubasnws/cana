import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './News2.css'
import { news2 } from './Animations';
import { withRouter } from "react-router";
import VideoDisplay from './VideoDisplay';
import { routes } from '../routes';
import { lang } from './usefullVariables';
import { backendBaseUrl } from './usefullVariables';
import Logo from './Logo';
import { fetchItems } from "../actions";
import { videoApiLink, newsPageApiLink } from "./usefullVariables";
// import Swiper from 'swiper/js/swiper.esm.bundle';

let debounce = true

class News2 extends Component {
    state = {}

    componentDidMount() {
        !this.props.videoData && this.props.fetchVideo();

        news2('enter');
        console.log('news 2');
        window.addEventListener('wheel', this.onScroll, false);
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

        const videoApi = this.props.videoData && this.props.videoData[0];
        const newsPageApi = this.props.newsPageApi && this.props.newsPageApi[0];

        const { acf: { video_description: videoTitle, video_title: videoDescription } = Object } = videoApi ? videoApi : Object;
        const { acf: { video_background_news: videoBackground, banner_2: topBanner } = Object } = newsPageApi ? newsPageApi : Object;
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
                    {description}
                    <div className={s.right}>
                        <div className={[s.videoBox, 'videoBox'].join(' ')}>
                            <VideoDisplay
                                videoData={videoApi}
                                videoBackground={videoBackground}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const { videoData, mainPageApi, newsPageApi } = state;
    return {
        mainPageApi,
        videoData,
        newsPageApi
    }
};

const mapDispatchToProps = dispatch => ({
    fetchVideo: () => dispatch(fetchItems(videoApiLink(1), 'videoData')),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News2));