import React, { Component } from "react";
import { connect } from "react-redux";
import s from "./Products.css";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Products1 from "./Products1";
import Products2 from "./Products2";
import Products3 from "./Products3";
import Footer from "./Footer";
import BurgerMenu from "./BurgerMenu";
import { lettersSplit } from "./userHandlers";
import { productSideText } from "./Animations";
import { routes } from "../routes";
import WhiteElement from "./WhiteElement";
import { prodApiLink, prodPageApiLink } from "./usefullVariables";
import { fetchItems } from "../actions";
import { withLastLocation } from "react-router-last-location";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProductsPage();
    !this.props.prodData && this.props.fetchProducts();
  }

  setLocationArray = () => {
    const { lastLocation, location: currentLocaiton } = this.props;
    return { lastLocation, currentLocaiton };
  };

  widthChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const acf = this.props.productsPageData;
    const path = window.location.pathname;

    const custStyles = {
      display: "none",
    };

    return (
      <section className={s.mainSection}>
        {path !== routes.productsFooter && <BurgerMenu fixed={true} />}
        <div
          className={s.leftSection}
          style={path === routes.productsFooter ? custStyles : {}}
        >
          <WhiteElement />

          <Route
            path={routes.productsHome}
            component={() => <Products1 acf={acf} />}
          />
          <Route
            path={routes.productsSingle}
            component={() => <Products2 acf={acf} />}
          />
          <Route
            path={routes.productsInsta}
            component={() => <Products3 acf={acf} />}
          />
        </div>
        <Route path={routes.productsFooter} component={() => <Footer />} />
        <SideBarText acf={acf} history={this.setLocationArray()} />
      </section>
    );
  }
}

const SideBarText = ({ acf, history }) => {
  const path = history.pathname;

  const backgroundText = {
    backgroundImage: `url(${acf && acf[0].acf.right_background_text.url})`,
    overflow: path === routes.productsFooter ? "hidden" : "unset",
  };

  return (
    <div className={s.rightSection} style={backgroundText}>
      <Route
        path={routes.products}
        component={() => <SideBarTextElement history={history} />}
      />
      {path === routes.productsInsta && acf && (
        <img
          className={s.starterKitImage}
          src={acf[0].acf.kit_image.url}
          alt={acf[0].acf.kit_image.name}
        />
      )}
      {path === routes.newsFooter && acf && (
        <img
          className={s.cannaCircle}
          src={acf[0].acf.footer_images.bottom_small.url}
          alt="canna circle"
        />
      )}
    </div>
  );
};

class SideBarTextElement extends Component {
  state = {};

  componentDidMount() {
    const { currentLocaiton, lastLocation } = this.props.history;

    currentLocaiton &&
      this.startSideTextAnimation(currentLocaiton, lastLocation);
  }

  startSideTextAnimation = (currentLocaiton, lastLocation) => {
    console.log(currentLocaiton, lastLocation);
    const pathname = currentLocaiton.pathname;
    if (pathname === routes.productsHome) productSideText(0, pathname);
    //  && (lastLocation ? lastLocation.pathname !== pathname : true)
    else if (pathname === routes.productsSingle) productSideText(0, pathname);
    else if (pathname === routes.productsInsta) productSideText(0, pathname);
    else if (pathname === routes.productsFooter) productSideText(0, pathname);
  };

  render() {
    const splitHorse = lettersSplit("dark horse");
    return (
      <div className={[s.sideText, "productSideText"].join(" ")}>
        {splitHorse}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { productsPageData } = state;
  return { productsPageData };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProductsPage: () =>
    dispatch(fetchItems(prodPageApiLink, "productsPageData")),
  fetchProducts: () => dispatch(fetchItems(prodApiLink, "prodData")),
});

export default withLastLocation(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Products))
);
