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
        class: PropTypes.string,
    };

    static defaultProps = {
        delay: 0,
        onDelayStart: () => { },
        onDelayEnd: () => { },
        class: 'delayLink'
    };

    static contextTypes = Link.contextTypes;

    constructor(props) {
        super(props);
        this.timeout = null;
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
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

    render() {
        const { delay, onDelayEnd, onDelayStart, ...rest } = this.props


        return (
            <Link {...rest} onClick={this.handleClick} className={this.class} />
        );
    }
}

export default withRouter(DelayLink)