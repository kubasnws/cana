import React, { Component } from 'react';
import s from './BurgerMenu.css';
import { menuOpen } from './Animations'
import { CloseButton } from './Icons'
import { Link } from 'react-router-dom'
import { lettersSplit } from './userHandlers'
import Logo from './Logo'
import { contactInfos } from './App'


class BurgerMenu extends Component {
    state = {
        menuIsOpen: false,
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    burgerMenuHandler = () => {
        if (this.state.menuIsOpen) {
            menuOpen('close')
            setTimeout(() => {
                this.setState({ menuIsOpen: !this.state.menuIsOpen });
            }, 500);
        } else {
            this.setState({ menuIsOpen: !this.state.menuIsOpen });
        }
    }

    render() {
        const text = 'Where am i?'
        const res = lettersSplit(text)
        const { menuIsOpen } = this.state
        const { x: custX, y: custY } = this.props
        const whereAmI = (
            <>
                <div style={menuIsOpen ? { opacity: 0 } : null} className={[s.circle, 'burgerCircle'].join(' ')}></div>
                <div className={[s.text, 'burgerText'].join(' ')}>{res}</div>
            </>
        )
        const burgerStyle = {
            right: typeof custX === 'undefined' ? null : custX,
            top: typeof custY === 'undefined' ? null : custY,
        }
        return (
            <>
                <div onClick={menuIsOpen ? null : this.burgerMenuHandler} className={`${this.props.fixed === true ? s.burgerMenuFixed : ''} ${s.burgerMenu} burgerMenu`} style={burgerStyle} >
                    <span></span>
                    <span></span>
                    <span></span>
                    {whereAmI}
                </div>
                {menuIsOpen ? <MenuContentBox menuIsOpen={menuIsOpen} clickHandler={this.burgerMenuHandler} /> : null}
            </>
        );
    }
}

class MenuContentBox extends Component {
    state = {}
    componentDidMount() {
        menuOpen()
    }
    render() {
        const { clickHandler } = this.props
        return (
            <div className={[s.menuContentBox, 'menuContentBox'].join(' ')}>
                <div className={[s.whiteMenuBox, 'whiteMenuBox'].join(' ')}>
                    <div className={[s.menuCloseBox, 'menuCloseBox'].join(' ')} onClick={() => clickHandler()}><CloseButton /></div>
                    <div className={s.menuLeft}>
                        {/* <img src={} alt=""/> */}
                        <Logo color='dark' />
                    </div>
                    <div className={s.menuCenter}>
                        <div className={[s.infos, 'infos'].join(' ')}>
                            <div className={[s.element, 'element'].join(' ')}><span>Call us: </span>{contactInfos.phone}</div>
                            <div className={[s.element, 'element'].join(' ')}><span>Send an e-mail: </span>{contactInfos.mail}</div>
                        </div>
                        <div className={[s.navigation, 'navigation'].join(' ')}>
                            <div className={[s.navElement, 'navElement'].join(' ')}>
                                <h2><Link to='/products/section1'>products</Link></h2>
                            </div>
                            <div className={[s.navElement, 'navElement'].join(' ')}>
                                <h2><Link to='/news/section1'>canna life</Link></h2>
                            </div>
                            <div className={[s.navElement, 'navElement'].join(' ')}>
                                <h2><Link to='/footer'>contact</Link></h2>
                            </div>
                        </div>
                    </div>
                    <div className={s.menuRight}></div>
                </div>
            </div>
        );
    }
}


export default BurgerMenu;
