import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';



/**
 * Wraps the React Router Link component and creates a delay after the link is clicked.
 */

class DelayLink extends Component {

    static propTypes = {
        /**
         * Milliseconds to wait before registering the click.
         */
        delay: PropTypes.number,
        /**
         * Called after the link is clicked and before the delay timer starts.
         */
        onDelayStart: PropTypes.func,
        /**
         * Called after the delay timer ends.
         */
        onDelayEnd: PropTypes.func,
    };

    static defaultProps = {
        delay: 0,
        onDelayStart: () => { },
        onDelayEnd: () => { },
    };

    static contextTypes = Link.contextTypes;

    constructor(props) {
        super(props);
        this.timeout = null;
    }



    /**
     * Called when the link is clicked
     *
     * @param {Event} e
     */
    handleClick = (e) => {
        const { replace, to, delay, onDelayStart, onDelayEnd } = this.props;
        const history = this.props.history

        onDelayStart(e, to);
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();

        this.timeout = setTimeout(() => {
            if (replace) {
                history.replace(to);
            } else {
                history.push(to);
            }
            onDelayEnd(e, to);
        }, delay);
    };

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    render() {
        const { delay, onDelayEnd, onDelayStart, ...rest } = this.props


        return (
            <Link {...rest} onClick={this.handleClick} />
        );
    }
}

export default withRouter(DelayLink)