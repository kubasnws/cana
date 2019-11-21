import React, { Component } from 'react';
import styles from './Logo.css';
import { imageLogo } from './App'
import {
    Link
} from 'react-router-dom';
import { onLoadLogoHandler } from './Animations';


class Logo extends Component {
    state = {}

    componentDidMount() {
        onLoadLogoHandler()
    }

    render() {
        const { customStyles, color, clicable } = this.props
        const darkLeft = {
            borderTop: '3px solid #242424',
            borderLeft: '3px solid #242424'
        }
        const darkRight = {
            borderBottom: '3px solid #242424',
            borderRight: '3px solid #242424'
        }
        return (
            <>
                <Link to={clicable === false ? '/age' : '/'}>
                    <div className={styles.logo}>
                        <div className={[styles.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkLeft : null}></div>
                        <div className={[styles.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkRight : null}></div>
                        <img className='logo' src={color === 'dark' ? imageLogo.dark : imageLogo.white} style={typeof customStyles === 'undefined' ? null : customStyles} alt="Logo" />
                    </div>
                </Link>
            </>
        );
    }
}


export default Logo;