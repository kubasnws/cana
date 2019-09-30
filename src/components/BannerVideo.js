import React from 'react';
import styles from './BannerVideo.css'

const BannerVideo = (props) => {
    const { smoke_1, smoke_2 } = props.videos
    return (
        <video autoPlay muted loop id={styles.myVideo}>
            <source src={props.type === 1 ? smoke_1 : smoke_2} type="video/mp4" />
        </video >
    );
}

export default BannerVideo;