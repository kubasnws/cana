import React, { Component } from 'react';
import styles from './AgeVerificationForm.css'
import DateInput from './DateInput'

class AgeVerificationForm extends Component {

    state = {}
    render() {
        const { selectHandler, day, month, year, ageVerificationHandler, fail } = this.props
        return (
            <form className={styles.ageForm}>
                <div className={styles.formLabel}>date of birth</div>
                <div className={styles.inputsForm}>
                    <DateInput date='day' handler={selectHandler} newDate={day} />
                    <DateInput date='month' handler={selectHandler} newDate={month} />
                    <DateInput date='year' handler={selectHandler} newDate={year} />
                </div>
                {fail ? <div className={styles.failAge}>You need to be at least 18 to visit our website. Come back in {this.props.comeBack}!</div> : null}
                <div className={styles.buttonBox}>
                    <div className={styles.buttonWrapper}>
                        <p>Ready?</p>
                        <button type='button' onClick={ageVerificationHandler}>click it!</button>
                    </div>
                </div>
            </form>
        );
    }

}


export default AgeVerificationForm;



