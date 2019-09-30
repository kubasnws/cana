import React from 'react';
import styles from './WhiteElement.css'
import SocialMedia from './SocialMedia'


const WhiteElement = props => {

    return (
        <div className={[styles.whiteElement, 'whiteElement'].join(' ')}>
            {props.isSocialDisplay === false ? null : <SocialMedia />}
        </div>
    );
}

export default WhiteElement;