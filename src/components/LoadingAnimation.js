import React from 'react';
import styles from './LoadingAnimation.css'

const LoadingAnimation = () => {
    return (
        <div className={styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingAnimation;