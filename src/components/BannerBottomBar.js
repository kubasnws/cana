import React from 'react';
import s from './BannerBottomBar.css'
import { Instagram } from './Icons'
import ScrollButton from './ScrollItButton/ScrollItButton';
import Languages from './Languages';


const BannerBottomBar = ({ socialMedia }) => {
    const { facebook, instagram, twitter } = socialMedia
    return (
        <div className={s.bottomBar}>
            <div className={s.bottomLanguageBox}>
                <div className={`${s.social} social`}>
                    <ul>
                        <a href={facebook} className={facebook === '' ? s.hid : ''} target="_blank" rel="noopener noreferrer">
                            {/* <li>
                                <Facebook />
                            </li> */}
                        </a>
                        <a href={instagram} className={instagram === '' ? s.hide : ''} target="_blank" rel="noopener noreferrer">
                            <li>
                                <Instagram />
                            </li>
                        </a>
                        <a href={twitter} className={twitter === '' ? s.hid : ''} target="_blank" rel="noopener noreferrer">
                            {/* <li>
                                <Twitter />
                            </li> */}
                        </a>
                    </ul>
                </div>
                <Languages />
            </div>
            <ScrollButton bigText='scroll it!' />
        </div>
    );
}

export default BannerBottomBar;