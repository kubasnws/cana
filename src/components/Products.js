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
        const token = '21406152901.b379a5c.791f0004ec104098bd5018dfcd6b5bf5'
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
            overflow: path === '/products/footer' ? 'hidden' : 'unset'
        }
        const sideBarText = (
            <div className={s.rightSection} style={backgroundText}>
                <Route path='/products' component={() => <SideBarTextElement api={productsPage} />} />
                {path === '/products/section3' && typeof kitImage !== 'undefined' ? <img className={s.starterKitImage} src={kitImage.url} alt='starter kit' /> : null}
                {path === '/products/footer' && typeof footer.cannaCircle !== 'undefined' ? <img className={s.cannaCircle} src={footer.cannaCircle.url} alt='canna circle' /> : null}
            </div>
        )
        return (
            <section className={s.mainSection}>
                <BurgerMenu fixed={true} y={width > 950 ? null : '230px'} />
                <div className={s.leftSection}>
                    <Route path='/products/section1'
                        component={() => <Products1
                            sectionApi={section1}
                            images={images}
                            products={products}
                            isLoaded={isLoaded}
                            width={width} />}
                    />
                    <Route path='/products/section2'
                        component={() => <Products2
                            sectionApi={section2}
                            products={products}
                            width={width} />}
                    />
                    <Route path='/products/section3'
                        component={() => <Products3
                            sectionApi={section3}
                            width={width}
                            instaPosts={instaPosts}
                            social={social}
                        />}
                    />
                    <Route path='/products/footer'
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
        if (path === '/products/section1')
            productSideText(0, path)
        else if (path === '/products/section2')
            productSideText(0, path)
        else if (path === '/products/section3')
            productSideText(0, path)
        else if (path === '/products/footer')
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