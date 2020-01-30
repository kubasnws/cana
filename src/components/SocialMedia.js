import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './SocialMedia.css'
import { Facebook, Twitter, Instagram } from './Icons'
import { onLoadSideSocialHandler } from './Animations';
import { fetchItems } from "../actions";
import { mainPageApiLink } from './usefullVariables';

class SocialMedia extends Component {
    state = {}

    componentDidMount() {
        // !this.props.mainPageApi && this.props.fetchMainPage();
        onLoadSideSocialHandler(.5);
    }

    render() {
        const { isWhite, fontSize, boxSize, marginBottom, isHorizontal } = this.props;
        const mainPageApi = this.props.mainPageApi && this.props.mainPageApi[0];
        const { acf: { social_media: socialLinks } = Object } = mainPageApi ? mainPageApi : Object;

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
                <SocialElement socialSize={socialSize} isWhite={isWhite} links={socialLinks} />
            </div>
        );
    }
}

const SocialElement = ({ isWhite, socialSize, links }) => {
    const values = links && Object.values(links);
    const social = values && values.map((element, index) => {
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

const mapStateToProps = (state) => {
    const { mainPageApi } = state;
    return { mainPageApi }
};

const mapDispatchToProps = dispatch => ({
    fetchMainPage: () => dispatch(fetchItems(mainPageApiLink, 'mainPageApi'))
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);