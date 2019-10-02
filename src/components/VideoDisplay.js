import React, { Component } from 'react';
import s from './VideoDisplay.css'
import Player from 'react-player'
import { PlayButton, PauseButton, VolumeOn, VolumeOff } from './Icons'
import DelayLink from './DelayLink'

class VideoDisplay extends Component {
    state = {
        isVideoPlaying: true,
        isVolumeOff: true,
        duration: 0,
        secondsElapsed: 0,
        isApiLoaded: false,
        productsArray: [],
    }

    componentDidUpdate() {

    }

    loadApiHandler = () => {
        const { videoPostsConnection } = this.props.firstVideoPost
        if (videoPostsConnection.length !== 0 && !this.state.isApiLoaded) {
            let prodArray = []
            videoPostsConnection.forEach(item => {
                const productId = item.chose_product
                const videoApi = `http://cana.snwsprodukcja71.pl/wp-json/wp/v2/products/${productId}`

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
                            isApiLoaded: true,
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

    render() {

        const { isVideoPlaying, isVolumeOff, secondsElapsed, productsArray } = this.state
        const { videoBackground, width, videoAPILoaded } = this.props
        const { videoLink, videoTitle, videoDescription, videoPostsConnection } = this.props.firstVideoPost

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
                        {width <= 820 ? descriptionVideo : null}
                    </div>
                    <Player
                        className={[s.videoDev, 'videoDev'].join(' ')}
                        url={videoAPILoaded ? videoLink : null}
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
                </div>
                <ConnectedProduct productsArray={productsArray} arr={videoPostsConnection} secondsElapsed={secondsElapsed} />
            </>
        );
    }
}
class ConnectedProduct extends Component {
    state = {

    }
    componentDidMount() {

    }
    render() {
        const { productsArray, secondsElapsed, arr } = this.props
        const truncate = (input) => input.length > 100 ? `${input.substring(0, 100)}...` : input;
        const item = productsArray.map((item, index) => {
            let { display_start: start, display_end: end } = arr[index]
            start = parseInt(start)
            end = parseInt(end)
            const currentProductLink = `/products/section2#${item.id}`
            const htmlElement = (
                <div className={[s.connectedBox, secondsElapsed >= start && secondsElapsed <= end ? s.connectedVisible : s.connectedHide, 'connectedBox'].join(' ')} key={item.id}>
                    <DelayLink
                        to={currentProductLink}
                        delay={0}
                        onDelayStart={() => { }}
                        onDelayEnd={() => { }}>
                    </DelayLink>
                    <div className={[s.prodImage, 'prodImage'].join(' ')}>
                        <img src={item.acf.images[0].sizes.medium_large} alt={item.acf.images[0].alt} />
                    </div>
                    <div className={[s.prodText, 'prodText'].join(' ')}>
                        <h2>{item.title.rendered}</h2>
                        <div>{truncate(item.acf.short_description)}</div>
                    </div>
                </div>
            )
            return (
                htmlElement
            )
        })
        return (
            <div className={s.mainConnected}>
                {item}
            </div>
        );
    }

}


export default VideoDisplay;