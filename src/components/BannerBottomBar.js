import React from 'react';
import s from './BannerBottomBar.css'
import DelayLink from './DelayLink'
import { onLeaveBannerHandler } from './Animations'
import { ChevronDown, Facebook, Instagram, Twitter } from './Icons'
import { routes } from '../routes'


const BannerBottomBar = ({ socialMedia }) => {
    const { facebook, instagram, twitter } = socialMedia
    const scrollIt = (
        <div className={`${s.scrollIt} scrollIt`}>
            <ChevronDown />
            <p>scroll it!</p>
        </div>
    )
    return (
        <div className={s.bottomBar}>
            <div className={`${s.social} social`}>
                <ul>
                    <a href={facebook} className={facebook === '' ? s.hide : ''} target="_blank" rel="noopener noreferrer">
                        <li>
                            <Facebook />
                        </li>
                    </a>
                    <a href={instagram} className={instagram === '' ? s.hide : ''} target="_blank" rel="noopener noreferrer">
                        <li>
                            <Instagram />
                        </li>
                    </a>
                    <a href={twitter} className={twitter === '' ? s.hide : ''} target="_blank" rel="noopener noreferrer">
                        <li>
                            <Twitter />
                        </li>
                    </a>
                </ul>
            </div>
            <DelayLink
                to={routes.mainProd}
                delay={500}
                onDelayStart={onLeaveBannerHandler}>
                {scrollIt}
            </DelayLink>
        </div>
    );
}

export default BannerBottomBar;