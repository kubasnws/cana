import React, { Component } from 'react';
import { withRouter } from 'react-router';
import s from './News3.css';
import { news3 } from './Animations';
import { backendBaseUrl } from './usefullVariables';
import { routes } from '../routes';
import Swiper from 'swiper/js/swiper.esm.bundle';
import { lang } from './usefullVariables';


let debounce = true;


class News3 extends Component {
    state = {
        imagesArray: [],
    }
    componentDidMount() {
        news3('enter')
        window.addEventListener('wheel', this.onScroll, false);

        this.getImagesApi()


    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    getImagesApi = async () => {
        const numPosts = 3;
        let language = 'pl'
        switch (lang) {
            case 'pl':
                language = ''
                break;
            case 'en':
                language = '/en'
                break;
            default:
                break;
        }
        const imagesLink = `${backendBaseUrl}${language}/wp-json/wp/v2/photo_posts?per_page=${numPosts}`;

        try {
            const response = await fetch(imagesLink);
            const data = await response.json();

            this.setState({
                imagesArray: data,
            });

            this.swiperInit()

        } catch (err) {
            console.log(`${err}, Coś poszło nie tak!`);
        }
    }

    swiperInit = () => {

        new Swiper('.swiper-image', {
            slidesPerView: 1,
        })
    }

    onScroll = e => {
        if (e.deltaY < 0 && !debounce) { //Up
            this.props.history.push(routes.newsVideos)
        }
        else if (e.deltaY > 0 && !debounce) { //Down
            this.props.history.push(routes.newsInsta)
            return
        }
    }

    render() {

        debounce = true;
        setTimeout(() => {
            debounce = false
        }, 2000);

        const { imagesArray } = this.state;
        const elements = imagesArray.length > 0 && imagesArray.map(item => <ImageElement key={item.id} data={item} />)

        return (
            <div className={s.mainBox}>
                <div className={s.imageBox}>
                    <div className={[s.swiperContainer, 'swiper-container swiper-image'].join(' ')}>
                        <div className={[s.swiperWrapper, 'swiper-wrapper'].join(' ')}>
                            {elements}
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

const ImageElement = ({ data: { acf: { description, image: { url, name } }, title: { rendered: title } } }) => {
    return (
        <div className={[s.swiperSlide, 'swiper-slide'].join(' ')}>
            <img className={[s.mainImage, 'mainImage'].join(' ')} src={url} alt={name} />
            <div className={s.textBox}>
                <h2 className={[s.photoTitle, 'photoTitle'].join(' ')}>{title}</h2>
                <div className={[s.photoDescription, 'photoDescription'].join(' ')}>{description}</div>
            </div>
        </div>
    );
}

export default withRouter(News3);