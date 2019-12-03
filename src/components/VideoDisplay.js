import React, { Component } from 'react';
import s from './VideoDisplay.css'
import Player from 'react-player'
import { PlayButton, PauseButton, VolumeOn, VolumeOff, Bell, BellSlash } from './Icons'
import DelayLink from './DelayLink';
import { routes } from '../routes';
import { TimelineMax } from 'gsap';
import { backendBaseUrl } from './usefullVariables';

class VideoDisplay extends Component {
    state = {
        isVideoPlaying: true,
        isVolumeOff: true,
        notifications: true,
        duration: 0,
        secondsElapsed: 0,
        productsArray: [],
    }

    loadApiHandler = () => {
        const { videoData: { acf: { video_products_conection: videoPostsConnection } = Object } } = this.props
        if (typeof videoPostsConnection !== 'undefined' && videoPostsConnection.length > 0) {
            let prodArray = []
            videoPostsConnection.forEach(item => {
                const productId = item.chose_product
                const videoApi = `${backendBaseUrl}/wp-json/wp/v2/products/${productId}`

                fetch(videoApi)
                    .then(response => {
                        if (response.ok) {
                            return response;
                        }
                        throw Error(response.status)
                    })
                    .then(response => response.json())
                    .then(data => {
                        prodArray.push(data)

                        this.setState({
                            productsArray: prodArray,
                        })

                    })
                    .catch(error => console.log(error + " coś nie tak"))
            })



        }
    }

    onDuration = (duration) => {
        this.setState({ duration })
    }

    onProgress = (progress) => {
        if (!this.state.duration) {
            return
        }
        const secondsElapsed = progress.played * this.state.duration

        if (secondsElapsed !== this.state.secondsElapsed) {
            this.setState({ secondsElapsed: secondsElapsed.toFixed(0) })
        }
    }

    playPauseHandler = () => {
        this.setState({ isVideoPlaying: !this.state.isVideoPlaying });
    }

    volumeOnOffHandler = () => {
        this.setState({ isVolumeOff: !this.state.isVolumeOff });
    }

    handlerNotifications = () => {
        this.setState({ notifications: !this.state.notifications });
    }

    render() {

        const { isVideoPlaying, isVolumeOff, notifications, secondsElapsed, productsArray, duration } = this.state
        const { width, videoBackground, videoData: { acf: { video: { url: videoLink } = Object, video_description: videoTitle, video_title: videoDescription, video_products_conection: videoPostsConnection } = Object } = Object } = this.props
        const descriptionVideo = (
            <div className={[s.description, s.descriptionVid].join(' ')}>
                <h1>{videoTitle}</h1>
                <div className={s.text}>{videoDescription}</div>
            </div>
        )
        this.loadApiHandler()
        return (
            <>
                <div className={s.videoBox}>
                    <div className={s.videoControls}>
                        <div className={s.playBox} onClick={() => this.playPauseHandler()}>
                            {isVideoPlaying ? <PauseButton /> : <PlayButton />}
                        </div>
                        <div className={s.muteBox} onClick={this.volumeOnOffHandler}>
                            {isVolumeOff ? <VolumeOff /> : <VolumeOn />}
                        </div>
                        <div className={s.notifications} onClick={this.handlerNotifications}>
                            {notifications ? <BellSlash /> : <Bell />}
                        </div>
                        {width <= 820 ? descriptionVideo : null}
                    </div>
                    <Player
                        className={[s.videoDev, 'videoDev'].join(' ')}
                        url={videoLink}
                        onDuration={this.onDuration}
                        onProgress={this.onProgress}
                        playing={isVideoPlaying}
                        loop
                        muted={isVolumeOff}
                        width='100%'
                        height='100%'
                    />
                    {width <= 680 ? null : <img className={s.backVid} src={videoBackground} alt="Under video" />}
                    {width <= 820 ? null : <div className={[s.number, 'sec_3_number'].join(' ')}>2.</div>}
                    {notifications && <ConnectedProducts duration={duration} productsArray={productsArray} arr={videoPostsConnection} secondsElapsed={secondsElapsed} />}
                </div>

            </>
        );
    }
}

const ConnectedProducts = ({ productsArray, secondsElapsed, arr, duration }) => {

    const item = productsArray.map((item, index) =>
        <ConnectedProduct
            key={index}
            index={index}
            item={item}
            secondsElapsed={secondsElapsed}
            arr={arr}
            duration={duration}
        />);
    return (
        <div className={s.mainConnected}>
            {item}
        </div>
    )
}

class ConnectedProduct extends Component {
    state = {
        isVisible: false,
    }

    handlerProductVisible = () => {
        const { index, secondsElapsed, arr, duration } = this.props
        let { display_start: start, display_end: end, end_point } = arr[index]
        start = parseInt(start);
        end = end_point === 'true' ? parseInt(end) : duration

        if (secondsElapsed >= start && secondsElapsed <= end) {
            this.setState({ isVisible: true })
        } else {
            this.setState({ isVisible: false })
        }

        this.handlerPosition()
    }

    handlerPosition = () => {

        const { index } = this.props;
        const mainContainer = document.querySelector(`.${s.mainConnected}`)
        let top = 0;
        for (let i = 0; i < index; i++) {
            const height = typeof mainContainer.children[i] !== 'undefined' ? mainContainer.children[i].clientHeight : 0;
            top = top + height + 2
        }

        const tl = new TimelineMax();
        if (this.refs.mainElement !== null && this.state.isVisible) {
            tl.to(this.refs.mainElement, .2, { opacity: .75, y: top })
        }
    }

    componentDidMount() {
        this.mainInterval = setInterval(() => {
            this.handlerProductVisible()
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.mainInterval)
    }

    render() {
        const { isVisible } = this.state;
        const { item, arr, index } = this.props;
        const { sneak_peek } = arr[index]

        const truncate = (input) => input.length > 100 ? `${input.substring(0, 100)}...` : input;
        const currentProductLink = `${routes.productsSingle}#${item.id}`;

        const sneakPeak = (
            <div className={s.productMoreContent}>
                {truncate(item.acf.short_description)}
            </div>
        )

        const element = (
            <div className={[s.connectedBox, isVisible ? s.connectedVisible : s.connectedHide, 'connectedBox'].join(' ')} ref="mainElement" key={item.id}>
                <DelayLink
                    to={currentProductLink}
                    delay={0}
                >
                </DelayLink>
                <div className={s.productMainInfos}>
                    <div className={[s.prodImage, 'prodImage'].join(' ')}>
                        <img src={item.acf.images[0].sizes.medium_large} alt={item.acf.images[0].alt} />
                    </div>
                    <div className={[s.prodText, 'prodText'].join(' ')}>
                        <h5>{item.title.rendered}</h5>
                    </div>
                </div>
                {sneak_peek && sneakPeak}
            </div>
        )

        return (
            <>
                {element}
            </>
        );
    }
}

export default VideoDisplay;