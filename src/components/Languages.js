import React from 'react';
import styles from './Languages.css';
import { handlerLanguageChange } from './ChangeLanguage';

const Languages = props => {
    const fixed = {
        position: 'fixed',
        top: props.x,
        left: props.y
    }
    const isActive = {
        fontWeight: '900',
    }

    const lang = localStorage.getItem('lang');
    return (
        <div className={`${styles.languages} languages`} style={props.fixed === true ? fixed : null}>
            <ul>
                <li onClick={e => handlerLanguageChange(e)} lang="pl" style={lang === 'pl' ? isActive : {}}>pl</li>
                <li onClick={e => handlerLanguageChange(e)} lang="en" style={lang === 'en' ? isActive : {}}>en</li>
            </ul>
        </div>
    );
}

export default Languages;