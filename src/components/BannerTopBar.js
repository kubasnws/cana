import React from 'react';
import styles from './BannerTopBar.css';
import Logo from './Logo';
import Languages from './Languages';
import BurgerMenu from './BurgerMenu';
import CSSModules from 'react-css-modules';

const BannerTopBar = (props) => {
    return (
        <div className={styles.topBar} styleName={props.custStyle}>
            {props.logoDisplay !== false ? <Logo logo={props.logo} /> : null}
            <Languages />
            {props.location !== '/age' ? <BurgerMenu textDisplay={props.textDisplay} /> : null}
            <div></div>
        </div>
    );
}

export default CSSModules(BannerTopBar, styles);