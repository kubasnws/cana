import React from 'react';
import styles from './AgeChecker.css'
import AgeVerificationForm from './AgeVerificationForm'
import Logo from './Logo'
import CopyrightSnws from './CopyrightSnws';
import { lang } from './usefullVariables';

const AgeFormContent = ({ comeBack, fail, selectHandler, day, month, year, ageVerificationHandler, logo }) => {
    return (
        <div className={styles.contentFormBox}>
            <div className={styles.titleContainer}>
                <h1>Canna</h1>
                <p>{lang === 'en' ? 'Age verification' : 'Weryfikacja wieku'}</p>
            </div>
            <div className={styles.ageVerificationForm}>
                <AgeVerificationForm
                    comeBack={comeBack}
                    fail={fail}
                    selectHandler={selectHandler}
                    day={day}
                    month={month}
                    year={year}
                    ageVerificationHandler={ageVerificationHandler}
                />
            </div>
            <div className={styles.bottomInformation}>
                <Logo logo={logo} customStyles={{ width: 100 }} clicable={false} />
                <CopyrightSnws />
            </div>
        </div>
    );
}

export default AgeFormContent;