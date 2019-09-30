import React from 'react';
import s from './SocialMedia.css'
import { Facebook, Twitter, Instagram } from './Icons'
import { socialLinks } from './App'

const SocialMedia = props => {
    const { facebook, instagram, twitter } = socialLinks
    const { isWhite, fontSize, boxSize, marginBottom, isHorizontal } = props
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
            <a className={isWhite === true ? s.whiteSocial : null} style={socialSize} href={facebook} target="_blank" rel="noopener noreferrer"><Facebook /></a>
            <a className={isWhite === true ? s.whiteSocial : null} style={socialSize} href={instagram} target="_blank" rel="noopener noreferrer"><Instagram /></a>
            <a className={isWhite === true ? s.whiteSocial : null} style={socialSize} href={twitter} target="_blank" rel="noopener noreferrer"><Twitter /></a>
        </div>
    );
}

export default SocialMedia;