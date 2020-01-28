import React, { Component } from 'react';
import s from './Footer.css'
import Logo from './Logo'
import { onLoadFooterHandler, onLeaveFooterHandler } from './Animations'
import WhiteElement from './WhiteElement'
import { scrollDirectionDetect, lettersSplit } from './userHandlers'
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu'
import Swipe from 'react-easy-swipe';
import { routes } from '../routes';
import { lang } from './usefullVariables';


class Footer extends Component {
    state = {
        width: Number,
        path: String,
    }
    componentDidMount() {
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
            console.log('to');
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

        const { section: footer } = this.props
        const { images: img } = footer
        const { sideTextSection__1 } = this.props.images
        const { width } = this.state

        const side = (
            <div className={[s.sideText, 'sideText'].join(' ')}>
                <img src={sideTextSection__1} alt='Decoration text' />
            </div>
        )

        const cdh = lettersSplit('cdh')

        return (
            <Swipe onSwipeDown={this.onSwipeDown}>
                <footer>
                    <BurgerMenu fixed={true} />
                    <WhiteElement />
                    <img className={s.backgroundPhoto} src={img.background.url} alt={img.background.name} />
                    <div className={s.left}>
                        <div className={s.information}>
                            <Logo logo={this.props.logo} customStyles={{ width: '120px' }} />
                            <Localization data={footer.information} />
                            <EasyContact data={footer.easyContact} />
                        </div>
                        <div className={s.centerPhoto}>
                            {width <= 650 ? cdh : <div className={[s.backText, 'backTextFooter'].join(' ')}>canna dark horse</div>}
                            <img className='productFooter' src={img.product.url} alt={img.product.name} />
                        </div>
                    </div>
                    {width <= 650 ? null : side}
                    <div className={s.bottom}>
                        <div className={s.copy}>
                            <p>{`copyright 2019 ${width <= 1000 ? '' : '/ interactive agency'}`}</p>
                            <a href='https://www.snws.pl' target="_blank" rel="noopener noreferrer"><img src={process.env.PUBLIC_URL + '/images/snwsLogo.png'} alt='Logo SNWS' /></a>
                        </div>
                        <img src={img.bottom_big.url} alt={img.bottom_big.name} />
                    </div>
                </footer>
            </Swipe>
        );
    }
}

const Localization = (props) => {
    const { name, street, city } = props.data
    return (
        <div className='contactElement'>
            <h3>{lang === 'en' ? 'localization' : 'Lokalizacja'}</h3>
            <p>{name}</p>
            <p>{street}</p>
            <p>{city}</p>
        </div>
    );
}

const EasyContact = ({ data: { phone, fax, mail } }) => {
    return (
        <div className='contactElement'>
            <h3>{lang === 'en' ? 'contact' : 'kontakt'}</h3>
            {phone && <p>t. {phone}</p>}
            {fax && <p>f. {fax}</p>}
            {mail && <p>e-mail: {mail}</p>}
        </div>
    );
}




export default withRouter(Footer);