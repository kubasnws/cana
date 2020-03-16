import React, { Component } from 'react';
import { connect } from "react-redux";
import s from './Logo.css';
import { Link } from 'react-router-dom';
import { onLoadLogoHandler } from './Animations';
import { fetchItems } from "../actions";
import { mainPageApiLink } from "./usefullVariables";

class Logo extends Component {
    state = {}

    componentDidMount() {
        !this.props.mainPageApi && this.props.fetchMainPage();
    }

    render() {
        const { customStyles, color, clicable, mainPageApi: api = [] } = this.props;
        const { acf } = api.length > 0 && api[0];

        const darkLeft = {
            borderTop: '3px solid #242424',
            borderLeft: '3px solid #242424'
        }
        const darkRight = {
            borderBottom: '3px solid #242424',
            borderRight: '3px solid #242424'
        }
        return (
            <>
                <Link to={clicable === false ? '/age' : '/'}>
                    <div className={s.logo}>
                        <div className={[s.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkLeft : null}></div>
                        <div className={[s.logoAnimationLines, 'logoAnimationLines'].join(' ')} style={color === 'dark' ? darkRight : null}></div>
                        <img className={[s.logo, 'logo'].join(' ')} src={acf && (color === 'dark' ? acf.logo_dark.url : acf.logo.url)} style={customStyles ? customStyles : {}} alt="Logo" />
                    </div>
                </Link>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const { mainPageApi } = state;
    return { mainPageApi }
};

const mapDispatchToProps = dispatch => ({
    fetchMainPage: () => dispatch(fetchItems(mainPageApiLink, 'mainPageApi')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Logo);