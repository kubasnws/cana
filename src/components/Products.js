import React, { Component } from 'react';
import s from './Products.css'
import { Route } from 'react-router-dom';
import Products1 from './Products1'
import Products2 from './Products2'
import Products3 from './Products3'
import FooterWhite from './FooterWhite'
import BurgerMenu from './BurgerMenu'
import { lettersSplit } from './userHandlers'
import { productSideText } from './Animations'
import { withRouter } from "react-router";
import { routes } from '../routes';

const APISite = 'http://cana.snwsprodukcja71.pl/wp-json/acf/v3/pages/146';
const APIProducts = 'http://cana.snwsprodukcja71.pl/wp-json/wp/v2/products';

class Products extends Component {
    state = {
        productsPage: {},
        section1: {},
        section2: {},
        section3: {},
        footer: {},
        products: [],
        instaPosts: [],
        isLoaded: false,
        width: Number,
    }

    componentDidMount() {
        this.widthChange()
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
                    section1: {
                        horse: acf.back_horse,
                        bannerPhoto: acf.left_main_image,
                        socialBar: acf.green_social_bar,
                    },
                    section2: {
                        topBanner: acf.top_image,
                    },
                    section3: {
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
        // pobieranie api postow
        fetch(APIProducts)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                const products = data;

                this.setState(() => ({
                    products: products,
                    isLoaded: true,
                }));
            })
            .catch(error => console.log(error + " coś poszło nie tak!"))

        // pobieranie api z insta
        const token = '4684109970.1677ed0.0dfef633bc6a4f52881cc3c780ca6464'
        const num_photos = 6;
        fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}&count=${num_photos}`)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                const posts = data.data;

                this.setState(() => ({
                    instaPosts: posts
                }));
            })
            .catch(error => console.log(error + " coś poszło nie tak!"))

    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        window.addEventListener('resize', this.widthChange)

        const path = window.location.pathname
        const { productsPage, width, isLoaded, products, section1, section2, section3, footer, instaPosts } = this.state
        const { images, social, footer: footerApi } = this.props
        const { sideBackgroundText, kitImage } = this.state.productsPage
        const backgroundText = {
            backgroundImage: `url(${typeof sideBackgroundText === 'undefined' ? null : sideBackgroundText.url})`,
            overflow: path === routes.productsFooter ? 'hidden' : 'unset'
        }
        const sideBarText = (
            <div className={s.rightSection} style={backgroundText}>
                <Route path={routes.products} component={() => <SideBarTextElement api={productsPage} />} />
                {path === routes.productsInsta && typeof kitImage !== 'undefined' ? <img className={s.starterKitImage} src={kitImage.url} alt='starter kit' /> : null}
                {path === routes.productsFooter && typeof footer.cannaCircle !== 'undefined' ? <img className={s.cannaCircle} src={footer.cannaCircle.url} alt='canna circle' /> : null}
            </div>
        )
        return (
            <section className={s.mainSection}>
                <BurgerMenu fixed={true} y={width > 950 ? null : '230px'} />
                <div className={s.leftSection}>
                    <Route path={routes.productsHome}
                        component={() => <Products1
                            sectionApi={section1}
                            images={images}
                            products={products}
                            isLoaded={isLoaded}
                            width={width} />}
                    />
                    <Route path={routes.productsSingle}
                        component={() => <Products2
                            sectionApi={section2}
                            products={products}
                            width={width} />}
                    />
                    <Route path={routes.productsInsta}
                        component={() => <Products3
                            sectionApi={section3}
                            width={width}
                            instaPosts={instaPosts}
                            social={social}
                        />}
                    />
                    <Route path={routes.productsFooter}
                        component={() => <FooterWhite
                            sectionApi={footer}
                            images={images}
                            width={width}
                            footer={footerApi}
                        />}
                    />
                </div>

                {width > 950 ? sideBarText : null}
            </section>
        );
    }
}

class SideBarTextElement extends Component {
    state = {}
    componentDidMount() {
        const path = window.location.pathname
        if (path === routes.productsHome)
            productSideText(0, path)
        else if (path === routes.productsSingle)
            productSideText(0, path)
        else if (path === routes.productsInsta)
            productSideText(0, path)
        else if (path === routes.productsFooter)
            productSideText(0, path)
    }
    render() {
        const splitHorse = lettersSplit('dark horse')
        return (
            <div className={[s.sideText, 'productSideText'].join(' ')} >
                {splitHorse}
            </div>
        );
    }
}


export default withRouter(Products);