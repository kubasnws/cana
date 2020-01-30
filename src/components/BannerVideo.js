import React from 'react';
import styles from './BannerVideo.css'

const BannerVideo = ({ video }) => {
    return (
        <video autoPlay muted loop id={styles.myVideo}>
            <source src={video.url} type="video/mp4" />
        </video >
    );
}

export default BannerVideo;