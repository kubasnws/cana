import React, { Component } from 'react';
import styles from './AgeChecker.css'
import BannerTopBar from './BannerTopBar'
import AgeFormContent from './AgeFormContent'
import { Redirect } from 'react-router-dom';
import BannerVideo from './BannerVideo';
import { routes } from '../routes';
import Languages from './Languages';

class AgeChecker extends Component {
    state = {}
    componentDidMount() {
        console.log(this.props.isAnimated);
    }

    showAlert = () => {
        alert('dziala')
    }
    render() {
        if (localStorage.getItem('isAgeOk') === 'true') {
            return <Redirect push to={routes.home} />;
        }
        const { cana_text_background, circle_cana, cameleon, side_logo, logo } = this.props.images
        return (
            <div className={styles.ageChecker}>
                <BannerVideo videos={this.props.videos} />
                <div className={styles.leftContent}>
                    {/* <WhiteElement isSocialDisplay={false} /> */}
                    <div className={styles.langBox}>
                        <Languages />
                    </div>
                    <BannerTopBar location={this.props.location} logoDisplay={false} custStyle='age' />
                    <AgeFormContent comeBack={this.props.comeBack} fail={this.props.fail} selectHandler={this.props.selectHandler} day={this.props.day} month={this.props.month} year={this.props.year} logo={logo} ageVerificationHandler={this.props.ageVerificationHandler} />
                </div>
                <div className={styles.sideText}>
                    <div className={styles.sideContent}>
                        cana life
                        </div>
                    <img src={cana_text_background} alt="Canna life" />
                    <img className={styles.rotating} src={circle_cana} alt="Canna circle" />
                </div>
                <img className='cameleon' src={cameleon} alt="Cameleon" />
                <img src={side_logo} alt="Side logo" />
            </div>
        );
    }
}

export default AgeChecker;
