import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './Products3.css'
import { instaSection } from './Animations';
import { LongArrowRight } from './Icons'
import { withRouter } from "react-router";
import { dateFormatted } from './userHandlers';
import { routes } from '../routes';
import Logo from './Logo';
import { fetchInsta } from "../actions";


let debounce = true

class Products3 extends Component {
    state = {
        instaBoxHeight: Number,
        instaWrapperWidth3: Number,
        instaWrapperWidth2: Number,
        instaWrapperWidth: Number,
        width: Number,
    }
    componentDidMount() {
        this.props.fetchInsta();

        instaSection('enter')

        window.addEventListener('wheel', this.onScroll, false);
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

        const prodPageApi = this.props.productsPageData && this.props.productsPageData[0];
        const { acf: { top_image_2: topImage } = Object } = prodPageApi ? prodPageApi : Object;
        const insta = this.props.insta;

        const generateElement = insta && insta.map(item => (
            <InstaElement
                key={item.id}
                data={item}
            />))

        return (
            <div className={s.mainBox}>
                <div className={[s.topBanner, 'topBannerSec3'].join(' ')}>
                    <div className={s.logoBox}>
                        <Logo />
                    </div>
                    <div className={s.text}>check us on: @catchthedarkhorse</div>
                    {topImage && <img src={topImage.url} alt={topImage.mime_type} />}
                </div>
                <div className={[s.instagramBox, 'instagramBox'].join(' ')}>
                    <div className={[s.instaWrapper, 'instaWrapper'].join(' ')}>
                        {generateElement}
                    </div>
                </div>
            </div>
        );
    }
}


const InstaElement = ({ data: { link, created_time: time, caption: { text: description } = null, images: { standard_resolution: { url: image } } } }) => {

    const truncate = input => input.length > 60 ? `${input.substring(0, 60)}...` : input;
    return (
        <div className={[s.instaElement, 'instaElement'].join(' ')}>
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

const mapStateToProps = (state) => {
    const { insta, productsPageData } = state;
    return {
        insta,
        productsPageData
    }
};

const mapDispatchToProps = dispatch => ({
    fetchInsta: () => dispatch(fetchInsta()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products3));