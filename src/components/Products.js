import React, { Component } from 'react';
import s from './Products.css'
import { Route } from 'react-router-dom';
import { withRouter } from "react-router";
import Products1 from './Products1'
import Products2 from './Products2'
import Products3 from './Products3'
import Footer from './Footer'
import BurgerMenu from './BurgerMenu'
import { lettersSplit } from './userHandlers'
import { productSideText } from './Animations'
import { instaToken } from './usefullVariables'
import { routes } from '../routes';
import { backendBaseUrl } from './usefullVariables';
import WhiteElement from './WhiteElement'

const APISite = `${backendBaseUrl}/wp-json/acf/v3/pages/146`;
const APIProducts = `${backendBaseUrl}/wp-json/wp/v2/products`

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

        this.getInstaPosts()
    }

    getInstaPosts = async () => {
        // pobieranie api z insta
        const num_photos = 6;
        const apiLink = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instaToken}&count=${num_photos}`;

        try {
            const response = await fetch(apiLink)
            const data = await response.json()

            const posts = data.data;

            this.setState(() => ({
                instaPosts: posts
            }));
        } catch (err) {
            console.log(err + " coś poszło nie tak!")
        }

    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        window.addEventListener('resize', this.widthChange)

        const { productsPage, width, isLoaded, products, section1, section2, section3, footer, instaPosts } = this.state
        const { images, social, section: footerContent, footerImages } = this.props
        const path = window.location.pathname

        const custStyles = {
            display: "none",
        }

        return (
            <section className={s.mainSection}>

                {path !== routes.productsFooter && <BurgerMenu fixed={true} y={width > 950 ? null : '230px'} />}
                <div className={s.leftSection} style={path === routes.productsFooter ? custStyles : {}}>
                    <WhiteElement />
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

                </div>
                <Route path={routes.productsFooter}
                    component={() => <Footer
                        images={footerImages}
                        section={footerContent}
                    />}
                />

                {width > 950 ? <SideBarText productsPage={productsPage} footer={footer} /> : null}
            </section>
        );
    }
}

const SideBarText = ({ productsPage, footer }) => {

    const { sideBackgroundText, kitImage } = productsPage
    const path = window.location.pathname

    const backgroundText = {
        backgroundImage: `url(${typeof sideBackgroundText === 'undefined' ? null : sideBackgroundText.url})`,
        overflow: path === routes.productsFooter ? 'hidden' : 'unset'
    }

    return (
        <div className={s.rightSection} style={backgroundText}>
            <Route path={routes.products} component={() => <SideBarTextElement api={productsPage} />} />
            {path === routes.productsInsta && typeof kitImage !== 'undefined' ? <img className={s.starterKitImage} src={kitImage.url} alt='starter kit' /> : null}
            {path === routes.productsFooter && typeof footer.cannaCircle !== 'undefined' ? <img className={s.cannaCircle} src={footer.cannaCircle.url} alt='canna circle' /> : null}
        </div>
    )
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