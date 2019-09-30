import React, { Component } from 'react';
import s from './VideoDisplay.css'
import Player from 'react-player'
import { PlayButton, PauseButton, VolumeOn, VolumeOff } from './Icons'

class VideoDisplay extends Component {
    state = {
        isVideoPlaying: true,
        isVolumeOff: true,
    }

    playPauseHandler = () => {
        this.setState({ isVideoPlaying: !this.state.isVideoPlaying });
    }

    volumeOnOffHandler = () => {
        this.setState({ isVolumeOff: !this.state.isVolumeOff });
    }

    render() {

        const { isVideoPlaying, isVolumeOff } = this.state
        const { videoBackground, width, videoAPILoaded } = this.props
        const { videoLink, videoTitle, videoDescription } = this.props.firstVideoPost
        const descriptionVideo = (
            <div className={[s.description, s.descriptionVid].join(' ')}>
                <h1>{videoTitle}</h1>
                <div className={s.text}>{videoDescription}</div>
            </div>
        )

        return (
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
                <Player className={[s.videoDev, 'videoDev'].join(' ')} url={videoAPILoaded ? videoLink : null} playing={isVideoPlaying} loop muted={isVolumeOff} width='100%' height='100%' />
                {width <= 680 ? null : <img className={s.backVid} src={videoBackground} alt="Under video" />}
                {width <= 820 ? null : <div className={[s.number, 'sec_3_number'].join(' ')}>2.</div>}
            </div>

        );
    }
}

export default VideoDisplay;