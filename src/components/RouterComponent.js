import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';


class RouterComponent extends Component {
    state = {

    }
    render() {

        if (localStorage.getItem('isAgeOk') !== 'true') {
            return <Redirect push to="/age" />;
        }
    }
}

export default RouterComponent;