import React, { Component } from 'react';
import s from './Logo.css';
import { imageLogo } from './App'
import { Link } from 'react-router-dom';
import { onLoadLogoHandler } from './Animations';


class Logo extends Component {
    state = {}

    componentDidMount() {
        onLoadLogoHandler()
        console.log('logo update');
    }

    render() {
        const { customStyles, color, clicable } = this.props;
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
                    <div className={s.logo}>
                        <div className={[s.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkLeft : null}></div>
                        <div className={[s.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkRight : null}></div>
                        <img className={[s.logo, 'logo'].join(' ')} src={color === 'dark' ? imageLogo.dark : imageLogo.white} style={customStyles ? customStyles : {}} alt="Logo" />
                    </div>
                </Link>
            </>
        );
    }
}


export default Logo;