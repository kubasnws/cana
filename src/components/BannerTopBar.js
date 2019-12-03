import React from 'react';
import s from './BannerTopBar.css';
import { withRouter } from "react-router";
import Logo from './Logo';
import BurgerMenu from './BurgerMenu';
import CSSModules from 'react-css-modules';

const BannerTopBar = ({ custStyle, logo, logoDisplay, textDisplay, location }) => {
    console.log(location);
    return (
        <div className={s.topBar} styleName={custStyle}>
            {logoDisplay !== false ? <Logo logo={logo} /> : null}
            {location.pathname !== '/age' && <BurgerMenu textDisplay={textDisplay} />}
            <div></div>
        </div>
    );
}

export default withRouter(CSSModules(BannerTopBar, s));