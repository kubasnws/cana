import React, { Component } from 'react';
import s from './News2.css'
import { news2 } from './Animations';
import { } from './Icons'
import { withRouter } from "react-router";
import VideoDisplay from './VideoDisplay';
import { routes } from '../routes';
import { lang } from './usefullVariables';
// import Swiper from 'swiper/js/swiper.esm.bundle';


let firstPostAPI = 'http://cana.snwsprodukcja71.pl/wp-json/wp/v2/video_posts?per_page=1';

switch (lang) {
    case 'pl':
        firstPostAPI = 'http://cana.snwsprodukcja71.pl/wp-json/wp/v2/video_posts?per_page=1';
        break;
    case 'en':
        firstPostAPI = 'http://cana.snwsprodukcja71.pl/en/wp-json/wp/v2/video_posts?per_page=1';
        break;
    default:
        break;
}

let debounce = true

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
                const d = data[0];
                // console.log(d);
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
            this.props.history.push(routes.newsHome)
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            this.props.history.push(routes.newsImages)
        }
    }


    render() {

        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 2000);

        const { topBanner, videoBackground } = this.props.sectionApi
        const { firstVideoPost, videoAPILoaded } = this.state
        const { videoTitle, videoDescription } = firstVideoPost
        const { screenSize: {
            width,
            // height,
        } } = this.props

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