import React, { Component } from 'react';
import s from './News1.css'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { withRouter } from "react-router";
import { routes } from '../routes';

let debounce = false

class News1 extends Component {
    state = {
        bigImage: String,
        bigDescription: String,
    }
    componentDidMount() {
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    productHoverHandler = (e) => {
        const prod = e.target

        const description = prod.getAttribute('data-description')
        const image = prod.getAttribute('src')

        this.setState({
            bigImage: image,
            bigDescription: description
        });
    }



    onScroll = e => {
        if (e.deltaY < 0) { //Up
            return
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            // onLeaveSection2Handler()
            console.log('dzoala')
            debounce = true
            setTimeout(() => {
                this.props.history.push(routes.newsVideos)
                debounce = false
            }, 500);
        }
    }

    render() {
        const { testImage } = this.props.sectionApi
        const { dark_logo } = this.props.images
        const { width } = this.props
        const { socialBar } = this.props.sImages

        const social = (
            <div className={s.imageWrapper}>
                <SocialMedia isWhite={true} fontSize="22px" boxSize='42px' marginBottom={false} />
                <img className={s.socialImage} src={typeof socialBar === 'undefined' ? null : socialBar.url} alt={typeof socialBar === 'undefined' ? null : socialBar.name} />
            </div>
        )

        return (
            <div className={s.mainBox}>
                {/* <img className={s.backgroundImage} src={typeof horse === 'undefined' ? null : horse.url} alt={typeof horse === 'undefined' ? null : horse.name} /> */}
                <div>
                    <div className={s.topBox}>
                        <div className={s.languageBox}>
                        </div>
                        <div className={s.logoBox}>
                            <Logo logo={dark_logo} color='dark' />
                        </div>
                    </div>
                    <div className={s.middleBox}>
                        <div className={s.rightProduct}>
                            <div className={s.titleBox}>
                                <h1 className={s.title}>Welcome to <span>Canna World!</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.bottomBox}>
                    <img src={typeof testImage === 'undefined' ? null : testImage.url} alt="test" />
                    <div className={s.absoluteBox}>
                        <div className={s.textWrapper}>
                            <h2>Run, jump, catch the Dark Horse</h2>
                            <div>Ut ante arcu, imperdiet et diam ut, egestas bibendum mi. Sed eget libero ex maecenas.</div>
                        </div>
                    </div>
                </div>
                {width >= 550 ? social : null}
            </div>

        );
    }
}

export default withRouter(News1);