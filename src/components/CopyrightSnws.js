import React from 'react';
import styles from './CopyrightSnws.css'

const CopyrightSnws = props => { //isDark: Boolean
    const { isDark } = props
    const dark = {
        color: '#2e2e2e'
    }
    return (
        <div className={styles.content}>
            <p style={isDark === true ? dark : null}>copyright 2018 / interactive agency</p>
            <a href="https://www.snws.pl" target='_blank' rel="noopener noreferrer"><img src={isDark === true ? process.env.PUBLIC_URL + '/images/snwsLogoDark.png' : process.env.PUBLIC_URL + '/images/snwsLogo.png'} alt="Logo SNWS" /></a>
        </div>
    );
}
export default CopyrightSnws;