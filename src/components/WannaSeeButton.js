import React from 'react';
import s from './WannaSeeButton.css'
import DelayLink from './DelayLink'
import { LongArrowRight } from './Icons'

const WannaSeeButton = (props) => {
    return (
        <DelayLink
            to='/main-section-3'
            delay={1500}
            onDelayStart={() => onLeaveSecction2Handler()}
            onDelayEnd={() => { }}>
            <button type='button'>check it!</button>
            <div className={s.nextButton}><span>Click</span><LongArrowRight /></div>
        </DelayLink>
    );
}

export default WannaSeeButton;