import React from 'react';
import styles from './Languages.css';
// import {
//     Link
// } from 'react-router-dom';

const Languages = props => {
    const fixed = {
        position: 'fixed',
        top: props.x,
        left: props.y
    }
    const dark = {
        color: '#242424'
    }
    return (
        <div className={`${styles.languages} languages`} style={props.fixed === true ? fixed : null}>
            <ul>
                {/* <Link to="/age"><li>pl</li></Link>
                <Link to="/"><li>en</li></Link> */}
                <li style={props.color === 'dark' ? dark : null}>pl</li>
                <li style={props.color === 'dark' ? dark : null}>en</li>
            </ul>
        </div>
    );
}

export default Languages;