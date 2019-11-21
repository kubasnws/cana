import React, { Component } from 'react';
import s from './SocialMedia.css'
import { Facebook, Twitter, Instagram } from './Icons'
import { socialLinks } from './App';
import { onLoadSideSocialHandler } from './Animations'

class SocialMedia extends Component {
    state = {}

    componentDidMount() {
        onLoadSideSocialHandler(.5)
    }

    render() {
        const { isWhite, fontSize, boxSize, marginBottom, isHorizontal } = this.props

        const socialSize = {
            fontSize: fontSize,
            width: boxSize,
            height: boxSize,
            borderColor: isWhite === true ? 'white' : null,
            margin: isHorizontal === true ? '0 12px 0 0' : null,
        }
        const socialStyles = {
            flexDirection: isHorizontal === true ? 'row' : 'column',
            width: isHorizontal === true ? 'auto' : null,
            margin: marginBottom === false ? 0 : null,
        }

        return (
            <div className={[s.socialBox, 'socialBox'].join(' ')} style={socialStyles} >
                <SocialElement socialSize={socialSize} isWhite={isWhite} />
            </div>
        );
    }
}

const SocialElement = ({ isWhite, socialSize }) => {
    const values = Object.values(socialLinks)
    const social = values.map((element, index) => {
        return (
            <a key={index} className={[isWhite && s.whiteSocial, element === '' && s.none].join(' ')} style={socialSize} href={element} target="_blank" rel="noopener noreferrer">
                {element !== '' && (index === 0 ? <Facebook /> : index === 1 ? <Instagram /> : <Twitter />)}
            </a>
        )
    });
    return (
        <>
            {social}
        </>
    );
}

export default SocialMedia;