import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from './AgeChecker.css'
import BannerTopBar from './BannerTopBar'
import AgeFormContent from './AgeFormContent'
import { Redirect } from 'react-router-dom';
import BannerVideo from './BannerVideo';
import { routes } from '../routes';
import Languages from './Languages';
import { fetchItems } from "../actions";
import { mainPageApiLink } from "./usefullVariables";



class AgeChecker extends Component {
    state = {};
    componentDidMount() {
        !this.props.mainPageApi && this.props.fetchMainPage();
    }

    render() {
        if (localStorage.getItem('isAgeOk') === 'true') {
            return <Redirect push to={routes.home} />;
        }

        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        const mainPageApi = this.props.mainPageApi && this.props.mainPageApi[0];
        const { acf: {
            circle_cana: circleCanna,
            cameleon,
            side_logo: sideLogo,
            cana_text_background: cannaText,
            age_verification_video
        } = Object } = mainPageApi ? mainPageApi : Object;

        return (
            <div className={styles.ageChecker}>
                {iOS ? null : (age_verification_video && <BannerVideo video={age_verification_video} />)}
                <div className={styles.leftContent}>
                    <div className={styles.langBox}>
                        <Languages />
                    </div>
                    <BannerTopBar location={this.props.location} logoDisplay={false} custStyle='age' />
                    <AgeFormContent comeBack={this.props.comeBack} fail={this.props.fail} selectHandler={this.props.selectHandler} day={this.props.day} month={this.props.month} year={this.props.year} ageVerificationHandler={this.props.ageVerificationHandler} />
                </div>
                <div className={styles.sideText}>
                    <div className={styles.sideContent}>
                        cana life
                        </div>
                    <img src={cannaText && cannaText.url} alt="Canna life" />
                    <img className={styles.rotating} src={circleCanna && circleCanna.url} alt="Canna circle" />
                </div>
                <img className='cameleon' src={cameleon && cameleon.url} alt="Cameleon" />
                <img src={sideLogo && sideLogo.url} alt="Side logo" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { mainPageApi } = state;
    return { mainPageApi }
};

const mapDispatchToProps = dispatch => ({
    fetchMainPage: () => dispatch(fetchItems(mainPageApiLink, 'mainPageApi'))
})

export default connect(mapStateToProps, mapDispatchToProps)(AgeChecker);
