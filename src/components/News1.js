import React, { Component } from 'react';
import s from './News1.css'
import Logo from './Logo'
import { withRouter } from "react-router";
import { routes } from '../routes';

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

    productHoverHandler = e => {
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
        else if (e.deltaY > 0) { //Down
            this.props.history.push(routes.newsVideos)
        }
    }

    render() {
        const { testImage } = this.props.sectionApi

        return (
            <div className={s.mainBox}>
                {/* <img className={s.backgroundImage} src={typeof horse === 'undefined' ? null : horse.url} alt={typeof horse === 'undefined' ? null : horse.name} /> */}
                <div>
                    <div className={s.topBox}>
                        <div className={s.languageBox}>
                        </div>
                        <div className={s.logoBox}>
                            <Logo />
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
            </div>

        );
    }
}

export default withRouter(News1);