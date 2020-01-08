import React from 'react';
import s from './ScrollItButton.css';
import { withRouter } from "react-router";
import DelayLink from '../DelayLink';
import { navigation } from '../../routes';
import { lang } from '../usefullVariables';


const ScrollItButton = ({ smallText, bigText, animation = null, location }) => {
    const getCurrentPathname = () => {
        const localPathname = location.pathname;
        const actualPosition = () => {
            if (localPathname.includes('/news')) {
                return navigation.news
            } else if (localPathname.includes('/products')) {
                return navigation.products
            } else {
                return navigation.home
            }
        }
        const arr = actualPosition();
        const index = arr.findIndex(index => index === localPathname);
        const nextIndex = arr[index + 1]

        return nextIndex;
    }

    const big = () => {
        if (typeof bigText === 'undefined') {
            return lang === 'en' ? 'Scroll It!' : 'Przewiń!'
        } else {
            return bigText;
        }
    }

    return (

        <div className={[s.buttonWrapper, 'buttonWrapper'].join(' ')}>
            {smallText && <p>{smallText}</p>}
            <DelayLink
                to={getCurrentPathname()}
                delay={animation !== null && 500}
                onDelayStart={animation !== null ? () => animation() : () => { }}
            >
                <button>{big()}</button>
            </DelayLink>
        </div>
    );
}

export default withRouter(ScrollItButton);