import React, { Component } from 'react';
import s from './News2.css'
import { news2 } from './Animations';
import { } from './Icons'
import { withRouter } from "react-router";
import VideoDisplay from './VideoDisplay'

const firstPostAPI = 'http://cana.snwsprodukcja71.pl/wp-json/wp/v2/video_posts/180'
let debounce = false

class News2 extends Component {
    state = {
        firstVideoPost: {
            videoLink: String,
            postTitle: String,
            videoTitle: String,
            videoDescription: String,
            videoPostsConnection: [],
        },
        videoAPILoaded: false,
    }

    componentDidMount() {
        news2('enter')
        window.addEventListener('wheel', this.onScroll, false);

        fetch(firstPostAPI)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                const d = data;
                this.setState(() => ({
                    firstVideoPost: {
                        videoLink: d.acf.video.url,
                        postTitle: d.title.rendered,
                        videoTitle: d.acf.video_description,
                        videoDescription: d.acf.video_title,
                        videoPostsConnection: d.acf.video_products_conection
                    },
                    videoAPILoaded: true,
                }));
            })
            .catch(error => console.log(error + " coś nie tak"))
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onScroll = e => {
        const delay = 700
        if (e.deltaY < 0 && !debounce) { //Up
            news2('leave')
            debounce = true
            setTimeout(() => {
                this.props.history.push('/news/section1')
                debounce = false
            }, delay);
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            news2('leave')
            debounce = true
            setTimeout(() => {
                this.props.history.push('/news/section3')
                debounce = false
            }, delay);
        }
    }


    render() {
        const { topBanner, videoBackground } = this.props.sectionApi
        const { firstVideoPost, videoAPILoaded } = this.state
        const { videoTitle, videoDescription } = firstVideoPost
        const { width } = this.props

        const description = (
            <div className={[s.left, 'left'].join(' ')}>
                <h2>{videoTitle}</h2>
                <div>{videoDescription}</div>
            </div>
        )
        return (
            <div className={s.mainBox}>
                <div className={[s.topBanner, 'topBanner'].join(' ')}>
                    {typeof topBanner === 'undefined' ? null : <img src={topBanner.url} alt={topBanner.name} />}
                </div>
                <div className={s.content}>
                    {width <= 680 ? null : description}
                    <div className={s.right}>
                        <div className={[s.videoBox, 'videoBox'].join(' ')}>
                            <VideoDisplay
                                firstVideoPost={firstVideoPost}
                                width={width}
                                videoAPILoaded={videoAPILoaded}
                                videoBackground={videoBackground}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(News2);