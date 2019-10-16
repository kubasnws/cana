import React, { Component } from 'react';
import styles from './MainBanner.css';
// import BannerVideo from './BannerVideo';
import BannerTopBar from "./BannerTopBar";
import CarouselMenu from './CarouselMenu';
import BannerBottomBar from './BannerBottomBar'
import { onLoadBannerHandler, onLoadLogoHandler, onLeaveBannerHandler } from './Animations'
import { withRouter } from "react-router";
import Swipe from 'react-easy-swipe';

let debounce = false

class MainBanner extends Component {
    state = {

    }


    componentDidMount() {
        onLoadLogoHandler()
        onLoadBannerHandler()
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onSwipeUp = () => {
        onLeaveBannerHandler()
        setTimeout(() => { this.props.history.push('/main-section-1') }, 500);
    }

    onScroll = e => {
        if (e.deltaY < 0) { //Up
            return
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveBannerHandler()
            debounce = true
            console.log('object');
            setTimeout(() => {
                this.props.history.push('/main-section-1')
                // debounce = false
            }, 1000);
        }
    }

    render() {

        return (
            <Swipe onSwipeUp={this.onSwipeUp}>
                <section className={styles.start} id={styles.start}>
                    {/* <BannerVideo videos={this.props.videos} type={1} /> */}

                    <BannerTopBar logo={this.props.logo} textDisplay={true} />
                    <CarouselMenu />
                    <BannerBottomBar socialMedia={this.props.socialMedia} />
                </section >
            </Swipe>
        );
    }
}

export default withRouter(MainBanner);
