import React from 'react';
import s from './SideNavigation.css';
import './SideNavigation.css';
import DelayLink from '../DelayLink'
import { navigation } from '../../routes';
import * as animation from '../Animations'


const SideNavigation = ({ location }) => {
    console.log(animation);
    let element;

    if (location.includes('/news')) {
        element = navigation.news.map((element, index) => <SideNavigationElement key={index} element={element} location={location} />);
    } else if (location.includes('/products')) {
        element = navigation.products.map((element, index) => <SideNavigationElement key={index} element={element} location={location} />);
    } else {
        element = navigation.home.map((element, index) => <SideNavigationElement key={index} element={element} location={location} />);
    }

    return (
        <div className={s.sideNavBox}>
            {element}
        </div>
    );
}

const SideNavigationElement = ({ element, location }) => {
    console.log(location, element);
    return (
        <div className={[s.elementBox, location === element ? s.activeElement : ''].join(' ')}>
            <DelayLink
                to={element}
                delay={500}
                class='sidebarLink'
                onDelayStart={() => animation.onLeaveSection1Handler()}
            >

            </DelayLink>
        </div>

    )
}

export default SideNavigation;