import React from 'react';
import styles from './CarouselMenu.css';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { lang } from './usefullVariables';

const CarouselMenu = () => {
    return (
        <div className={`${styles.menuContainer} menuContainer`}>
            <div className={styles.box}>
                <div className={[styles.element, styles.disactive, 'disactive'].join(' ')}>
                    <h1><Link to={routes.productsHome}>{lang === 'en' ? 'products' : 'produkty'}</Link></h1>
                </div>
                <div className={[styles.element, styles.active, 'active'].join(' ')}>
                    <h1><Link to={routes.mainProd}>canna life</Link></h1>
                </div>
                <div className={[styles.element, styles.disactive, 'disactive'].join(' ')}>
                    <h1><Link to={routes.mainFooter}>{lang === 'en' ? 'contact' : 'kontakt'}</Link></h1>
                </div>
            </div>
        </div >
    );
}

export default CarouselMenu;