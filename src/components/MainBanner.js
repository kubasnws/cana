import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./MainBanner.css";
import BannerVideo from "./BannerVideo";
import BannerTopBar from "./BannerTopBar";
import CarouselMenu from "./CarouselMenu";
import BannerBottomBar from "./BannerBottomBar";
import { onLoadBannerHandler, onLeaveBannerHandler } from "./Animations";
import { withRouter } from "react-router";
import Swipe from "react-easy-swipe";
import { routes } from "../routes";
import { fetchItems } from "../actions";
import { prodApiLink } from "./usefullVariables";

let debounce = false;

class MainBanner extends Component {
  state = {};

  componentDidMount() {
    !this.props.prodData && this.props.fetchProducts();
    onLoadBannerHandler();
    window.addEventListener("wheel", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.onScroll, false);
  }

  onSwipeUp = () => {
    onLeaveBannerHandler();
    setTimeout(() => {
      this.props.history.push(routes.mainProd);
    }, 500);
  };

  onScroll = (e) => {
    if (e.deltaY < 0) {
      //Up
      return;
    } else if (e.deltaY > 0 && !debounce) {
      //Down
      onLeaveBannerHandler();
      debounce = true;
      setTimeout(() => {
        this.props.history.push(routes.mainProd);
        debounce = false;
      }, 1000);
    }
  };

  render() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const mainPageApi = this.props.mainPageApi && this.props.mainPageApi[0];
    const {
      acf: { banner_video: bannerVideo, social_media: socialMedia } = Object,
    } = mainPageApi ? mainPageApi : Object;

    return (
      <Swipe onSwipeUp={this.onSwipeUp}>
        <section className={styles.start} id={styles.start}>
          {iOS ? null : bannerVideo && <BannerVideo video={bannerVideo} />}

          <BannerTopBar logo={this.props.logo} textDisplay={true} />
          <CarouselMenu />
          {socialMedia && <BannerBottomBar socialMedia={socialMedia} />}
        </section>
      </Swipe>
    );
  }
}

const mapStateToProps = (state) => {
  const { mainPageApi } = state;
  return { mainPageApi };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchItems(prodApiLink, "prodData")),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainBanner)
);
