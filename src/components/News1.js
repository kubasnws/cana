import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './News1.css'
import Logo from './Logo';
import { withRouter } from "react-router";
import Swipe from 'react-easy-swipe';
import { routes } from '../routes';
import { fetchInsta } from "../actions";

class News1 extends Component {
    state = {}
    componentDidMount() {
        !this.props.insta && this.props.fetchInsta();
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onScroll = e => {
        if (e.deltaY < 0) { //Up
            return
        }
        else if (e.deltaY > 0) { //Down
            this.props.history.push(routes.newsVideos)
        }
    }

    onSwipeUp = () => {
        setTimeout(() => { this.props.history.push(routes.newsVideos) }, 500);
    }

    render() {
        const insta = this.props.insta;
        const instaPost = insta && insta.map((item, index) => index === 0 && <FirstInstaImage key={item.id} insta={item} />);
        return (
            <Swipe onSwipeUp={this.onSwipeUp}>
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
                        {instaPost}
                    </div>
                </div>
            </Swipe>
        );
    }
}

const FirstInstaImage = ({ insta }) => {
    return (
        <>
            <div className={s.instaTitle}>
                {insta.caption && insta.caption.text}
            </div>
            <img src={insta.images && insta.images.standard_resolution.url} alt={insta.user && insta.user.username} />
        </>
    );
}

const mapStateToProps = (state) => {
    const { insta } = state;
    return { insta }
};

const mapDispatchToProps = dispatch => ({
    fetchInsta: () => dispatch(fetchInsta()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News1));