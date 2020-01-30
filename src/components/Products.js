import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './Products.css'
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import Products1 from './Products1'
import Products2 from './Products2'
import Products3 from './Products3'
import Footer from './Footer'
import BurgerMenu from './BurgerMenu'
import { lettersSplit } from './userHandlers'
import { productSideText } from './Animations'
import { routes } from '../routes';
import WhiteElement from './WhiteElement';
import { prodApiLink, prodPageApiLink } from "./usefullVariables";
import { fetchItems } from "../actions";


class Products extends Component {
    state = {

    }

    componentDidMount() {
        this.props.fetchProductsPage();
        this.props.fetchProducts();
    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {

        const { footer } = this.state;
        const { section: footerContent, footerImages } = this.props;
        const acf = this.props.productsPageData;
        const path = window.location.pathname;

        const custStyles = {
            display: "none",
        }

        return (
            <section className={s.mainSection}>
                {path !== routes.productsFooter && <BurgerMenu fixed={true} />}
                <div className={s.leftSection} style={path === routes.productsFooter ? custStyles : {}}>
                    <WhiteElement />

                    <Route path={routes.productsHome}
                        component={() => <Products1
                            acf={acf} />}
                    />
                    <Route path={routes.productsSingle}
                        component={() => <Products2
                            acf={acf} />}
                    />
                    <Route path={routes.productsInsta}
                        component={() => <Products3
                            acf={acf} />}
                    />

                </div>
                <Route path={routes.productsFooter}
                    component={() => <Footer
                        images={footerImages}
                        section={footerContent}
                    />}
                />
                <SideBarText acf={acf} footer={footer} />
            </section>
        );
    }
}

const SideBarText = ({ acf }) => {

    const path = window.location.pathname

    const backgroundText = {
        backgroundImage: `url(${acf && acf[0].acf.right_background_text.url})`,
        overflow: path === routes.productsFooter ? 'hidden' : 'unset'
    }

    return (
        <div className={s.rightSection} style={backgroundText}>
            <Route path={routes.products} component={() => <SideBarTextElement />} />
            {path === routes.productsInsta && acf && <img className={s.starterKitImage} src={acf[0].acf.kit_image.url} alt={acf[0].acf.kit_image.name} />}
            {/* {path === routes.productsFooter && typeof footer.cannaCircle !== 'undefined' ? <img className={s.cannaCircle} src={footer.cannaCircle.url} alt='canna circle' /> : null} */}
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

const mapStateToProps = (state) => {
    const { productsPageData } = state;
    return { productsPageData }
};

const mapDispatchToProps = dispatch => ({
    fetchProductsPage: () => dispatch(fetchItems(prodPageApiLink, 'productsPageData')),
    fetchProducts: () => dispatch(fetchItems(prodApiLink, 'prodData')),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));