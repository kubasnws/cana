import React from 'react';
import styles from './BannerBottomBar.css'
import DelayLink from './DelayLink'
import { onLeaveBannerHandler } from './Animations'
import { ChevronDown, Facebook, Instagram, Twitter } from './Icons'


const BannerBottomBar = (props) => {
    const { facebook, instagram, twitter } = props.socialMedia
    const scrollIt = (
        <div className={`${styles.scrollIt} scrollIt`}>
            <ChevronDown />
            <p>scroll it!</p>
        </div>
    )
    return (
        <div className={styles.bottomBar}>
            <div className={`${styles.social} social`}>
                <ul>
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <li>
                            <Facebook />
                        </li>
                    </a>
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <li>
                            <Instagram />
                        </li>
                    </a>
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <li>
                            <Twitter />
                        </li>
                    </a>
                </ul>
            </div>
            <DelayLink
                to='/main-section-1'
                delay={500}
                onDelayStart={onLeaveBannerHandler}
                onDelayEnd={() => { }}>
                {scrollIt}
            </DelayLink>
        </div>
    );
}

export default BannerBottomBar;