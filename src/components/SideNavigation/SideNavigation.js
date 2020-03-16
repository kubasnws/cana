import React from 'react';
import s from './SideNavigation.css';
import './SideNavigation.css';
import { Link } from 'react-router-dom';
import { navigation, routes } from '../../routes';
import { lang } from '../usefullVariables';


const SideNavigation = ({ location }) => {
    let element;
    let sectionName;

    if (location.includes(routes.news)) {
        element = navigation.news.map((element, index) => <SideNavigationElement key={index} index={index} element={element} location={location} />);
        sectionName = 'Canna life';
    } else if (location.includes(routes.products)) {
        element = navigation.products.map((element, index) => <SideNavigationElement key={index} index={index} element={element} location={location} />);
        sectionName = lang === 'pl' ? 'Produkty' : 'Products';
    } else {
        sectionName = lang === 'pl' ? 'Strona główna' : 'Home';
        element = navigation.home.map((element, index) => <SideNavigationElement key={index} index={index} element={element} location={location} />);
    }

    return (
        <div className={s.sideNavBox}>
            <div className={s.siteNameBox}>
                <div className={s.siteName}>{sectionName}</div>
            </div>
            {element}
        </div>
    );
}

const SideNavigationElement = ({ element, location, index }) => {
    return (
        <div className={[s.elementBox, location === element ? s.activeElement : ''].join(' ')}>
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