import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './News.css'
import { Route } from 'react-router-dom';
import News1 from './News1'
import News2 from './News2'
import Products3 from './Products3'
import Footer from './Footer'
import BurgerMenu from './BurgerMenu'
import { lettersSplit } from './userHandlers'
import { productSideText } from './Animations'
import { withRouter } from "react-router";
import { routes } from '../routes';
import { newsPageApiLink, prodPageApiLink } from './usefullVariables';
import WhiteElement from './WhiteElement';
import { fetchItems } from "../actions";

class News extends Component {
    state = {
        productsPage: {},
        section2: {},
        section3: {},
        section4: {},
        footer: {},
        products: [],
        isLoaded: false,
        sImages: {},
    }

    componentDidMount() {
        !this.props.newsPageApi && this.props.fetchNewsPage();
        !this.props.prodPageApi && this.props.fetchProdPage();
    }

    render() {
        window.addEventListener('resize', this.screenSize)
        const mainPageApi = this.props.mainPageApi && this.props.mainPageApi[0];
        const { acf: { footer_images: footerImages } = Object } = mainPageApi ? mainPageApi : Object;

        const newsPageApi = this.props.newsPageApi && this.props.newsPageApi[0];
        const { acf: { right_background_text: sideBackgroundText, kit_image: kitImage } = Object } = newsPageApi ? newsPageApi : Object;
        const path = window.location.pathname
        const { productsPage, screenSize, isLoaded, products, section2, section4 } = this.state
        const { images, social, section: footerContent } = this.props;
        const backgroundText = {
            backgroundImage: `url(${typeof sideBackgroundText === 'undefined' ? '' : sideBackgroundText.url})`,
            overflow: path === routes.productsFooter ? 'hidden' : 'unset'
        }
        const sideBarText = (
            <div className={s.rightSection} style={backgroundText}>
                <Route path={routes.news} component={() => <SideBarTextElement api={productsPage} />} />
                {path === routes.newsInsta && (kitImage && <img className={s.starterKitImage} src={kitImage.url} alt='starter kit' />)}
                {path === routes.newsFooter && (footerImages && <img className={s.cannaCircle} src={footerImages.bottom_small.url} alt='canna circle' />)}
            </div>
        )
        const custStyles = {
            display: "none",
        }
        return (
            <section className={s.mainSection}>
                {path !== routes.newsFooter && <BurgerMenu fixed={true} y='40px' />}
                <div className={s.leftSection} style={path === routes.newsFooter ? custStyles : {}}>
                    <WhiteElement />
                    <Route path={routes.newsHome} component={() => <News1 />} />
                    <Route path={routes.newsVideos}
                        component={() => <News2
                            sectionApi={section2}
                            images={images}
                            products={products}
                            isLoaded={isLoaded}
                            screenSize={screenSize} />}
                    />
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


const mapStateToProps = (state) => {
    const { prodPageApi, newsPageApi, mainPageApi } = state;
    return {
        newsPageApi,
        prodPageApi,
        mainPageApi
    }
};

const mapDispatchToProps = dispatch => ({
    fetchNewsPage: () => dispatch(fetchItems(newsPageApiLink, 'newsPageApi', false)),
    fetchProdPage: () => dispatch(fetchItems(prodPageApiLink, 'prodPageApi'))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));