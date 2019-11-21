import React, { Component } from 'react';
import styles from './MainBanner.css';
import BannerVideo from './BannerVideo';
import BannerTopBar from "./BannerTopBar";
import CarouselMenu from './CarouselMenu';
import BannerBottomBar from './BannerBottomBar'
import { onLoadBannerHandler, onLeaveBannerHandler } from './Animations'
import { withRouter } from "react-router";
import Swipe from 'react-easy-swipe';
import { routes } from '../routes';


let debounce = false

class MainBanner extends Component {
    state = {

    }


    componentDidMount() {
        onLoadBannerHandler()
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onSwipeUp = () => {
        onLeaveBannerHandler()
        setTimeout(() => { this.props.history.push(routes.mainProd) }, 500);
    }

    onScroll = e => {
        if (e.deltaY < 0) { //Up
            return
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            onLeaveBannerHandler()
            debounce = true
            setTimeout(() => {
                this.props.history.push(routes.mainProd)
                debounce = false
            }, 1000);
        }
    }

    render() {

        return (
            <Swipe onSwipeUp={this.onSwipeUp}>
                <section className={styles.start} id={styles.start}>
                    <BannerVideo videos={this.props.videos} type={1} />

                    <BannerTopBar logo={this.props.logo} textDisplay={true} />
                    <CarouselMenu />
                    <BannerBottomBar socialMedia={this.props.socialMedia} />
                </section >
            </Swipe>
        );
    }
}

export default withRouter(MainBanner);
