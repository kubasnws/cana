import React from 'react';
import s from './ScrollItButton.css';
import { withRouter } from "react-router";
import DelayLink from '../DelayLink';
import { navigation } from '../../routes';


const ScrollItButton = ({ smallText, bigText = 'scroll it!', animation = null, location }) => {

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
    return (

        <div className={[s.buttonWrapper, 'buttonWrapper'].join(' ')}>
            {smallText && <p>{smallText}</p>}
            <DelayLink
                to={getCurrentPathname()}
                delay={animation !== null && 500}
                onDelayStart={animation !== null ? () => animation() : () => { }}
            >
                <button>{bigText}</button>
            </DelayLink>
        </div>
    );
}

export default withRouter(ScrollItButton);