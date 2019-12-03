import React, { Component } from 'react';
import styles from './AgeVerificationForm.css'
import DateInput from './DateInput';
import { lang } from './usefullVariables';

class AgeVerificationForm extends Component {

    state = {}
    render() {
        const { selectHandler, day, month, year, ageVerificationHandler, fail } = this.props
        return (
            <form className={styles.ageForm}>
                <div className={styles.formLabel}>{lang === 'en' ? 'date of birth' : 'data urodzenia'}</div>
                <div className={styles.inputsForm}>
                    <DateInput date='day' handler={selectHandler} newDate={day} />
                    <DateInput date='month' handler={selectHandler} newDate={month} />
                    <DateInput date='year' handler={selectHandler} newDate={year} />
                </div>
                {fail ? <div className={styles.failAge}>{lang === 'en' ? 'You need to be at least 18 to visit our website. Come back in ' : 'Musisz mieć przynajmniej 18 lat, żeby odwiedzić naszą stronę. Wróć za '}{this.props.comeBack}!</div> : null}
                <div className={styles.buttonBox}>
                    <div className={styles.buttonWrapper}>
                        <p>{lang === 'en' ? 'Ready?' : 'Gotowy?'}</p>
                        <button type='button' onClick={ageVerificationHandler}>{lang === 'en' ? 'Click it!' : 'Przejdź!'}</button>
                    </div>
                </div>
            </form>
        );
    }

}


export default AgeVerificationForm;



