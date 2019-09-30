import React, { Component } from 'react';


// import { HashLink as Link } from 'react-router-hash-link';
import {
    Redirect,
    Route
} from 'react-router-dom';

class HomePage extends Component {
    state = {

    }
    render() {
        if (localStorage.getItem('isAgeOk') !== 'true') {
            return <Redirect push to="/age" />;
        }
        return (
            <>
                {/* <Route exact path='/' component={() => <MainBanner
                    logo={this.props.logo}
                    socialMedia={this.props.social_media}
                    videos={this.props.videos} />} /> */}
            </>
        );

    }
}

export default HomePage;