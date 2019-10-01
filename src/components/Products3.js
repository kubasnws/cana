import React, { Component } from 'react';
import s from './Products3.css'
import { instaSection } from './Animations';
import { LongArrowRight } from './Icons'
import { withRouter } from "react-router";
import { dateFormatted } from './userHandlers'

let debounce = false

class Products3 extends Component {
    state = {
        instaBoxHeight: Number,
        instaWrapperWidth3: Number,
        instaWrapperWidth2: Number,
        instaWrapperWidth: Number,
        width: Number,
    }
    componentDidMount() {

        window.addEventListener('wheel', this.onScroll, false);

        this.getDimensions()
        instaSection('enter')
    }

    componentWillUnmount() {

        window.removeEventListener('wheel', this.onScroll, false);

    }

    getDimensions = () => {
        const windowHeight = window.innerHeight
        const { height: bannerHeight } = document.querySelector('.topBannerSec3').getBoundingClientRect()
        const { height: bottomButtonBoxHeight } = document.querySelector('.bottomButtonBox').getBoundingClientRect()
        const { width: instaWrapperWidth } = document.querySelector('.instaWrapper').getBoundingClientRect()
        this.setState({
            instaBoxHeight: windowHeight - (bannerHeight + 50) - bottomButtonBoxHeight,
            instaElementDimensions3: instaWrapperWidth / 3,
            instaElementDimensions2: instaWrapperWidth / 2,
            instaElementDimensions: instaWrapperWidth,
            width: window.innerWidth,
        });
    }

    onScroll = e => {
        const { localization } = this.props
        const delay = 700
        if (e.deltaY < 0 && !debounce) { //Up
            instaSection('leave')
            debounce = true
            setTimeout(() => {
                localization === 'news' ? this.props.history.push('/news/section3') : this.props.history.push('/products/section2')
                debounce = false
            }, delay);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            instaSection('leave')
            debounce = true
            setTimeout(() => {
                localization === 'news' ? this.props.history.push('/news/footer') : this.props.history.push('/products/footer')
                debounce = false
            }, delay);
        }
    }

    render() {

        const { topBanner } = this.props.sectionApi
        const { instaBoxHeight, instaElementDimensions3, instaElementDimensions2, instaElementDimensions, width } = this.state
        const { instaPosts, social } = this.props
        const instaHeight = {
            height: `${instaBoxHeight}px`
        }
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

        const generateElement = instaPosts.map(item => (
            <InstaElement
                key={item.id}
                custStyle={instaElement}
                link={item.link}
                image={item.images.standard_resolution.url}
                time={item.created_time}
                description={item.caption === null ? null : item.caption.text}
                tags={item.tags}
            />))

        return (
            <div className={s.mainBox}>
                <div className={[s.topBanner, 'topBannerSec3'].join(' ')}>
                    <div>check us on: @catchthedarkhorse</div>
                    {typeof topBanner === 'undefined' ? null : <img src={topBanner.url} alt={topBanner.name} />}
                </div>
                <div className={[s.instagramBox, 'instagramBox'].join(' ')} style={instaHeight}>
                    <div className={[s.instaWrapper, 'instaWrapper'].join(' ')}>
                        {generateElement}
                    </div>
                </div>
                <div className={[s.bottomButtons, 'bottomButtonBox'].join(' ')}>
                    <div className={[s.button, s.rightButton].join(' ')}>
                        <a href={social.instagram} target='_blank' rel="noopener noreferrer"><div><span>See more</span><LongArrowRight /></div></a>
                    </div>
                </div>
            </div>

        );
    }
}


const InstaElement = props => {
    const { image, link, time, description } = props
    const truncate = (input) => input.length > 60 ? `${input.substring(0, 60)}...` : input;
    return (
        <div className={[s.instaElement, 'instaElement'].join(' ')} style={props.custStyle()}>
            <img src={image} alt="Insta img" />
            <a href={link} target='_blank' rel="noopener noreferrer">a</a>
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