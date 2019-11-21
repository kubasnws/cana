import React from 'react';
import s from './BannerTopBar.css';
import { withRouter } from "react-router";
import Logo from './Logo';
import BurgerMenu from './BurgerMenu';
import CSSModules from 'react-css-modules';

const BannerTopBar = ({ custStyle, logo, logoDisplay, textDisplay, location }) => {
    return (
        <div className={s.topBar} styleName={custStyle}>
            {logoDisplay !== false ? <Logo logo={logo} /> : null}
            {location !== '/age' ? <BurgerMenu textDisplay={textDisplay} /> : null}
            <div></div>
        </div>
    );
}

export default withRouter(CSSModules(BannerTopBar, s));