import React from 'react';
import styles from './Logo.css';
import { imageLogo } from './App'
import {
    Link
} from 'react-router-dom';

const Logo = props => {
    const { customStyles, color } = props
    const darkLeft = {
        borderTop: '3px solid #242424',
        borderLeft: '3px solid #242424'
    }
    const darkRight = {
        borderBottom: '3px solid #242424',
        borderRight: '3px solid #242424'
    }
    return (
        <Link to={props.clicable === false ? '/age' : '/'}>
            <div className={styles.logo}>
                <div className={[styles.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkLeft : null}></div>
                <div className={[styles.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkRight : null}></div>
                <img className='logo' src={color === 'dark' ? imageLogo.dark : imageLogo.white} style={typeof customStyles === 'undefined' ? null : customStyles} alt="Logo" />
            </div>
        </Link>
    );
}

export default Logo;