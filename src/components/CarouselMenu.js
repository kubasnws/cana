import React from 'react';
import styles from './CarouselMenu.css';
import { Link } from 'react-router-dom'

const CarouselMenu = () => {
    return (
        <div className={`${styles.menuContainer} menuContainer`}>
            <div className={styles.box}>
                <div className={[styles.element, styles.disactive, 'disactive'].join(' ')}>
                    <h1><Link to='/products/section1'>products</Link></h1>
                </div>
                <div className={[styles.element, styles.active, 'active'].join(' ')}>
                    <h1><Link to='/'>canna life</Link></h1>
                </div>
                <div className={[styles.element, styles.disactive, 'disactive'].join(' ')}>
                    <h1><Link to='/footer'>contact</Link></h1>
                </div>
            </div>
        </div >
    );
}

export default CarouselMenu;