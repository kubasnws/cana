import React, { Component } from 'react';
import s from './News1.css'
import Logo from './Logo'
import { withRouter } from "react-router";
import { routes } from '../routes';
import { instaToken } from './usefullVariables';

// import Languages from './Languages';

class News1 extends Component {
    state = {
        bigImage: String,
        bigDescription: String,
        instaPost: Object,
    }
    componentDidMount() {
        this.getInstaApi();
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    getInstaApi = async () => {

        const num_photos = 1;
        const instaLink = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instaToken}&count=${num_photos}`;

        try {

            const response = await fetch(instaLink);
            const data = await response.json();
            this.setState({ instaPost: data.data[0] });
        } catch (err) {

            console.log(`${err}, coś poszło nie tak!`)
        }

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
        const { images: { standard_resolution: { url: instaUrl } = [] } = [], caption: { text: instaPostTitle } = [] } = this.state.instaPost;
        console.log(this.state.instaPost);
        return (
            <div className={s.mainBox}>
                <div>
                    <div className={s.topBox}>
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
                <div className={s.hashTitle}>
                    <h1>#catchthedarkhorse</h1>
                </div>
                <div className={s.bottomBox}>
                    <div className={s.instaTitle}>
                        {instaPostTitle}
                    </div>
                    <img src={instaUrl} alt="test" />

                    {/* <div className={s.absoluteBox}>
                        <div className={s.textWrapper}>
                            <h2>Run, jump, catch the Dark Horse</h2>
                            <div>Ut ante arcu, imperdiet et diam ut, egestas bibendum mi. Sed eget libero ex maecenas.</div>
                        </div>
                    </div> */}
                </div>
            </div>

        );
    }
}

export default withRouter(News1);