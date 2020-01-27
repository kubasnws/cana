import React, { Component } from 'react';
import s from './Products3.css'
import { instaSection } from './Animations';
import { LongArrowRight } from './Icons'
import { withRouter } from "react-router";
import { dateFormatted } from './userHandlers';
import { routes } from '../routes';
import { instaToken } from './usefullVariables';
import Logo from './Logo';


let debounce = true

class Products3 extends Component {
    state = {
        instaBoxHeight: Number,
        instaWrapperWidth3: Number,
        instaWrapperWidth2: Number,
        instaWrapperWidth: Number,
        width: Number,
        instagramData: [],
    }
    componentDidMount() {
        this.getInstaApi()

        window.addEventListener('wheel', this.onScroll, false);
        this.getDimensions()
    }

    getInstaApi = async () => {

        const num_photos = 6;
        const instaLink = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instaToken}&count=${num_photos}`;

        try {

            const response = await fetch(instaLink);
            const data = await response.json();

            this.setState({ instagramData: data.data });
            instaSection('enter');
        } catch (err) {

            console.log(`${err}, coś poszło nie tak!`)
        }

    }

    getDimensions = () => {
        const { width: instaWrapperWidth } = document.querySelector('.instaWrapper').getBoundingClientRect()
        this.setState({
            instaElementDimensions3: instaWrapperWidth / 3,
            instaElementDimensions2: instaWrapperWidth / 2,
            instaElementDimensions: instaWrapperWidth,
            width: window.innerWidth,
        });
    }

    onScroll = e => {
        const { localization } = this.props
        if (e.deltaY < 0 && !debounce) { //Up
            localization === 'news' ? this.props.history.push(routes.newsVideos) : this.props.history.push(routes.productsSingle)
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            localization === 'news' ? this.props.history.push(routes.newsFooter) : this.props.history.push(routes.productsFooter)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    render() {

        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 2000);

        const { topBanner } = this.props.sectionApi
        const { instagramData, instaElementDimensions3, instaElementDimensions2, instaElementDimensions, width } = this.state

        const instaElement = () => {
            if (width > 1200) {
                return ({
                    width: `${instaElementDimensions3 - 20}px`,
                    height: `${instaElementDimensions3 - 60}px`
                })
            } else if (width < 1200 && width > 600) {
                return ({
                    width: `${instaElementDimensions2 - 10}px`,
                    height: `${instaElementDimensions2 - 60}px`
                })
            } else if (width < 600) {
                return ({
                    width: `${instaElementDimensions}px`,
                    height: `${instaElementDimensions - 60}px`
                })
            }
        }

        const generateElement = instagramData.length > 0 && instagramData.map(item => (
            <InstaElement
                key={item.id}
                data={item}
                custStyle={instaElement}
            />))

        return (
            <div className={s.mainBox}>
                <div className={[s.topBanner, 'topBannerSec3'].join(' ')}>
                    <div className={s.logoBox}>
                        <Logo />
                    </div>
                    <div>check us on: @catchthedarkhorse</div>
                    {typeof topBanner === 'undefined' ? null : <img src={topBanner.url} alt={topBanner.name} />}
                </div>
                <div className={[s.instagramBox, 'instagramBox'].join(' ')}>
                    <div className={[s.instaWrapper, 'instaWrapper'].join(' ')}>
                        {generateElement}
                    </div>
                </div>
                {/* <div className={[s.bottomButtons, 'bottomButtonBox'].join(' ')}>
                    <div className={[s.button, s.rightButton].join(' ')}>
                        <a href={social.instagram} target='_blank' rel="noopener noreferrer"><div><span>{lang === 'en' ? 'See more' : 'Zobacz więcej'}</span><LongArrowRight /></div></a>
                    </div>
                </div> */}
            </div>

        );
    }
}


const InstaElement = ({ custStyle, data, data: { link, created_time: time, tags, caption: { text: description } = null, images: { standard_resolution: { url: image } } } }) => {

    const truncate = input => input.length > 60 ? `${input.substring(0, 60)}...` : input;
    return (
        <div className={[s.instaElement, 'instaElement'].join(' ')} style={custStyle()}>
            <img src={image} alt="Insta img" />
            <a href={link} target='_blank' rel="noopener noreferrer"></a>
            <div className={s.elementDescription}>
                <div className={s.overText}>
                    <div className={s.description}>{truncate(description)}</div>
                    <div className={s.date}>{dateFormatted(time)}</div>
                </div>
            </div>
            <div className={s.hoverElement}>
                <LongArrowRight />
            </div>
        </div>
    )
}

export default withRouter(Products3);