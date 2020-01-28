import React, { Component } from 'react';
import s from './News.css'
import { Route } from 'react-router-dom';
import News1 from './News1'
import News2 from './News2'
import News3 from './News3'
import Products3 from './Products3'
import Footer from './Footer'
import BurgerMenu from './BurgerMenu'
import { lettersSplit } from './userHandlers'
import { productSideText } from './Animations'
import { withRouter } from "react-router";
import { routes } from '../routes';
import { backendBaseUrl } from './usefullVariables';
import WhiteElement from './WhiteElement'

const APISite = `${backendBaseUrl}/wp-json/acf/v3/pages/230`;
const APISite_146 = `${backendBaseUrl}/wp-json/acf/v3/pages/146`;

class News extends Component {
    state = {
        productsPage: {},
        section2: {},
        section3: {},
        section4: {},
        footer: {},
        products: [],
        isLoaded: false,
        screenSize: {
            height: Number,
            width: Number,
        },
        sImages: {},
    }

    componentDidMount() {
        this.screenSize()
        // pobieranie api strony
        fetch(APISite)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                const acf = data.acf;

                this.setState(() => ({
                    productsPage: {
                        sideBackgroundText: acf.right_background_text,
                        kitImage: acf.kit_image,
                    },
                    section2: {
                        topBanner: acf.banner_2,
                        videoBackground: acf.video_background_news.url,
                    },

                }));
            })
            .catch(error => console.log(error + " coś poszło nie tak!"))
        // pobieranie api strony z postami
        fetch(APISite_146)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                const acf = data.acf;

                this.setState(() => ({
                    sImages: {
                        socialBar: acf.green_social_bar,
                    },
                    section4: {
                        topBanner: acf.top_image_2,
                    },
                    footer: {
                        topBanner: acf.top_image_footer,
                        cannaCircle: acf.canna_image,
                        leftImage: acf.left_image,
                        mailImage: acf.mail_image,
                        green: acf.green_footer,
                    }
                }));
            })
            .catch(error => console.log(error + " coś poszło nie tak!"))

    }

    screenSize = () => {
        this.setState({
            screenSize: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        });
    }

    render() {
        window.addEventListener('resize', this.screenSize)

        const path = window.location.pathname
        const { productsPage, screenSize, isLoaded, products, section2, section4, footer, sImages } = this.state
        const { images, social, section: footerContent, footerImages } = this.props
        const { sideBackgroundText, kitImage } = this.state.productsPage
        const backgroundText = {
            backgroundImage: `url(${typeof sideBackgroundText === 'undefined' ? '' : sideBackgroundText.url})`,
            overflow: path === routes.productsFooter ? 'hidden' : 'unset'
        }
        const sideBarText = (
            <div className={s.rightSection} style={backgroundText}>
                <Route path='/news' component={() => <SideBarTextElement api={productsPage} />} />
                {path === routes.newsInsta && typeof kitImage !== 'undefined' ? <img className={s.starterKitImage} src={kitImage.url} alt='starter kit' /> : null}
                {path === routes.newsFooter && typeof footer.cannaCircle !== 'undefined' ? <img className={s.cannaCircle} src={footer.cannaCircle.url} alt='canna circle' /> : null}
            </div>
        )
        const custStyles = {
            display: "none",
        }
        return (
            <section className={s.mainSection}>
                {path !== routes.productsFooter && <BurgerMenu fixed={true} y='40px' />}
                <div className={s.leftSection} style={path === routes.newsFooter ? custStyles : {}}>
                    <WhiteElement />
                    <Route path={routes.newsHome}
                        component={() => <News1
                            sImages={sImages}
                            images={images}
                            products={products}
                            isLoaded={isLoaded}
                            screenSize={screenSize} />}
                    />
                    <Route path={routes.newsVideos}
                        component={() => <News2
                            sectionApi={section2}
                            images={images}
                            products={products}
                            isLoaded={isLoaded}
                            screenSize={screenSize} />}
                    />
                    {/* <Route path={routes.newsImages}
                        component={() => <News3
                            images={images}
                            products={products}
                            isLoaded={isLoaded}
                            screenSize={screenSize}
                        />}
                    /> */}
                    <Route path={routes.newsInsta}
                        component={() => <Products3
                            sectionApi={section4}
                            screenSize={screenSize}
                            social={social}
                            localization='news'
                        />}
                    />

                </div>
                <Route path={routes.newsFooter}
                    component={() => <Footer
                        images={footerImages}
                        section={footerContent}
                    />}
                />
                {sideBarText}
            </section>
        );
    }
}

class SideBarTextElement extends Component {
    state = {}
    componentDidMount() {
        const path = window.location.pathname
        if (path === routes.newsHome)
            productSideText(0, path)
        else if (path === routes.newsVideos)
            productSideText(0, path)
        else if (path === routes.newsImages)
            productSideText(0, path)
        else if (path === routes.newsFooter)
            productSideText(0, path)
    }
    render() {
        const splitHorse = lettersSplit('latest news')
        const path = window.location.pathname
        const splitCondition = () => {
            if (path === routes.newsInsta || path === routes.newsFooter) {
                return null
            } else {
                return splitHorse
            }
        }
        return (
            <div className={[s.sideText, 'productSideText'].join(' ')} >
                {splitCondition()}
            </div>
        );
    }
}


export default withRouter(News);