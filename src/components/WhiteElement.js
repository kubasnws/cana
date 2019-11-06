import React from 'react';
import { withRouter } from "react-router";
import s from './WhiteElement.css';
import SocialMedia from './SocialMedia';
import Languages from './Languages';
import SideNavigation from './SideNavigation/SideNavigation';


const WhiteElement = props => {

    return (
        <div className={[s.whiteElement, 'whiteElement'].join(' ')}>
            <Languages />
            <SideNavigation location={props.location.pathname} />
            {!props.isSocialDisplay && <SocialMedia />}
        </div>
    );
}

export default withRouter(WhiteElement);