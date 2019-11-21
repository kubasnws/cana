import React from 'react';
import s from './SideNavigation.css';
import './SideNavigation.css';
// import DelayLink from '../DelayLink'
import { Link } from 'react-router-dom';
import { navigation, routes } from '../../routes';
// import * as animation from '../Animations'


const SideNavigation = ({ location }) => {
    let element;

    if (location.includes(routes.news)) {
        element = navigation.news.map((element, index) => <SideNavigationElement key={index} index={index} element={element} location={location} />);
    } else if (location.includes(routes.products)) {
        element = navigation.products.map((element, index) => <SideNavigationElement key={index} index={index} element={element} location={location} />);
    } else {
        element = navigation.home.map((element, index) => <SideNavigationElement key={index} index={index} element={element} location={location} />);
    }

    return (
        <div className={s.sideNavBox}>
            {element}
        </div>
    );
}

const SideNavigationElement = ({ element, location, index }) => {
    return (
        <div className={[s.elementBox, location === element ? s.activeElement : ''].join(' ')}>
            {/* <DelayLink
                to={element}
                delay={500}
                onDelayStart={() => animation.onLeaveSection1Handler()}
            >
            </DelayLink> */}
            <Link to={element}></Link>
            <div className={s.infoBox}>
                <div className={s.content}>
                    <h1>{`0${index + 1}`}</h1>
                </div>
            </div>
        </div>

    )
}

export default SideNavigation;