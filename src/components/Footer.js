import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './Footer.css'
import Logo from './Logo'
import { onLoadFooterHandler, onLeaveFooterHandler } from './Animations'
import WhiteElement from './WhiteElement'
import { scrollDirectionDetect, lettersSplit } from './userHandlers'
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu'
import Swipe from 'react-easy-swipe';
import { routes } from '../routes';
import { lang, mainPageApiLink } from './usefullVariables';
import { fetchItems } from "../actions";


class Footer extends Component {
    state = {
        width: Number,
        path: String,
    }
    componentDidMount() {
        // !this.props.mainPageApi && this.props.fetchMainPage();
        onLoadFooterHandler()
        this.setState({ path: this.props.location.pathname });
        // burgerMenuAnimation()
        this.widthChange()
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    test = () => {
        console.log('test');
    }
    onSwipeDown = () => {
        onLeaveFooterHandler()

        const { path } = this.state
        setTimeout(() => {
            if (path === routes.mainFooter) {
                this.props.history.push(routes.mainVideo)
            } else if (path === routes.productsFooter) {
                this.props.history.push(routes.productsInsta)
            } else if (path === routes.newsFooter) {
                this.props.history.push(routes.newsInsta)
            }
        }, 500);
    }

    onScroll = e => {

        if (e.deltaY < 0) { //Up

            window.removeEventListener('wheel', scrollDirectionDetect, true)
            onLeaveFooterHandler()
            const { path } = this.state
            setTimeout(() => {
                if (path === routes.mainFooter) {
                    this.props.history.push(routes.mainVideo)
                } else if (path === routes.productsFooter) {
                    this.props.history.push(routes.productsInsta)
                } else if (path === routes.newsFooter) {
                    this.props.history.push(routes.newsInsta)
                }
            }, 500);
        }
        else if (e.deltaY > 0) { //Down
            return
        }


    }

    widthChange = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        window.addEventListener("resize", this.widthChange);
        window.addEventListener('wheel', (e) => scrollDirectionDetect(e, this.props.history));

        const mainPageApi = this.props.mainPageApi && this.props.mainPageApi[0];
        const { acf: { footer_images: footerImg, information, easy_contact: easyContact, side_text: sideText } = Object } = mainPageApi ? mainPageApi : Object;

        const { width } = this.state

        const side = (
            <div className={[s.sideText, 'sideText'].join(' ')}>
                <img src={sideText && sideText.url} alt='Decoration text' />
            </div>
        )

        const cdh = lettersSplit('cdh')

        return (
            <Swipe onSwipeDown={this.onSwipeDown}>
                <footer>
                    <BurgerMenu fixed={true} />
                    <WhiteElement />
                    <img className={s.backgroundPhoto} src={footerImg && footerImg.background.url} alt={footerImg && footerImg.background.name} />
                    <div className={s.left}>
                        <div className={s.information}>
                            <Logo logo={this.props.logo} />
                            <Localization data={information} />
                            <EasyContact data={easyContact} />
                        </div>
                        <div className={s.centerPhoto}>
                            {width <= 650 ? cdh : <div className={[s.backText, 'backTextFooter'].join(' ')}>canna dark horse</div>}
                            <img className='productFooter' src={footerImg && footerImg.product.url} alt={footerImg && footerImg.product.name} />
                        </div>
                    </div>
                    {width <= 650 ? null : side}
                    <div className={s.bottom}>
                        <div className={s.copy}>
                            <p>{`copyright 2019 ${width <= 1000 ? '' : '/ interactive agency'}`}</p>
                            <a href='https://www.snws.pl' target="_blank" rel="noopener noreferrer"><img src={process.env.PUBLIC_URL + '/images/snwsLogo.png'} alt='Logo SNWS' /></a>
                        </div>
                        <img src={footerImg && footerImg.bottom_big.url} alt={footerImg && footerImg.bottom_big.name} />
                    </div>
                </footer>
            </Swipe>
        );
    }
}

const Localization = ({ data: { name, street, city } = Object }) => {
    return (
        <div className='contactElement'>
            <h3>{lang === 'en' ? 'localization' : 'Lokalizacja'}</h3>
            <p>{name}</p>
            <p>{street}</p>
            <p>{city}</p>
        </div>
    );
}

const EasyContact = ({ data: { phone, fax, mail } = Object }) => {
    return (
        <div className='contactElement'>
            <h3>{lang === 'en' ? 'contact' : 'kontakt'}</h3>
            {phone && <p>t. {phone}</p>}
            {fax && <p>f. {fax}</p>}
            {mail && <p>e-mail: {mail}</p>}
        </div>
    );
}

const mapStateToProps = (state) => {
    const { mainPageApi } = state;
    return { mainPageApi }
};

const mapDispatchToProps = dispatch => ({
    fetchMainPage: () => dispatch(fetchItems(mainPageApiLink, 'mainPageApi'))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));