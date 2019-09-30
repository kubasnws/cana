import React from 'react';
import styles from './AgeChecker.css'
import AgeVerificationForm from './AgeVerificationForm'
import Logo from './Logo'
import CopyrightSnws from './CopyrightSnws'

const AgeFormContent = (props) => {
    return (
        <div className={styles.contentFormBox}>
            <div className={styles.titleContainer}>
                <h1>Canna</h1>
                <p>Age verification</p>
            </div>
            <div className={styles.ageVerificationForm}>
                <AgeVerificationForm
                    comeBack={props.comeBack}
                    fail={props.fail}
                    selectHandler={props.selectHandler}
                    day={props.day}
                    month={props.month}
                    year={props.year}
                    ageVerificationHandler={props.ageVerificationHandler}
                />
            </div>
            <div className={styles.bottomInformation}>
                <Logo logo={props.logo} customStyles={{ width: 100 }} clicable={false} />
                <CopyrightSnws />
            </div>
        </div>
    );
}

export default AgeFormContent;