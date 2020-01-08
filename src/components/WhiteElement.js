import React from 'react';
import { withRouter } from "react-router";
import s from './WhiteElement.css';
import SocialMedia from './SocialMedia';
import Languages from './Languages';
import SideNavigation from './SideNavigation/SideNavigation';


const WhiteElement = ({ location, isSocialDisplay, language }) => {

    return (
        <div className={[s.whiteElement, 'whiteElement'].join(' ')}>
            {!language ? <Languages /> : <div></div>}
            <SideNavigation location={location.pathname} />
            {!isSocialDisplay && <SocialMedia />}
        </div>
    );
}

export default withRouter(WhiteElement);