import React, { Component } from 'react';
import s from './Footer.css'
import Logo from './Logo'
import { onLoadFooterHandler, onLeaveFooterHandler } from './Animations'
import WhiteElement from './WhiteElement'
import { scrollDirectionDetect, lettersSplit } from './userHandlers'
import { withRouter } from "react-router";
import BurgerMenu from './BurgerMenu'
import Swipe from 'react-easy-swipe';
import { routes } from '../routes'

const path = window.location.pathname

class Footer extends Component {
    state = {
        width: Number
    }
    componentDidMount() {
        onLoadFooterHandler()
        // burgerMenuAnimation()
        this.widthChange()
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.onScroll, false);
    }

    onSwipeDown = () => {
        onLeaveFooterHandler()
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
            onLeaveFooterHandler()
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
                            <p>{`copyright 2018 ${width <= 1000 ? '' : '/ interactive agency'}`}</p>
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
            <h3>localization</h3>
            <p>{name}</p>
            <p>{street}</p>
            <p>{city}</p>
        </div>
    );
}

const EasyContact = (props) => {
    const { phone, fax, mail } = props.data
    return (
        <div className='contactElement'>
            <h3>easy contact</h3>
            <p>t. {phone}</p>
            <p>f. {fax}</p>
            <p>e-mail: {mail}</p>
        </div>
    );
}


export default withRouter(Footer);