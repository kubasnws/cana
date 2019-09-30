import React, { Component } from 'react';
import { withRouter } from 'react-router';
import s from './News3.css'
import { news3 } from './Animations'

class News3 extends Component {
    state = {

    }
    componentDidMount() {
        news3('enter')
        window.addEventListener('wheel', this.onScroll, false);
    }

    componentWillUnmount() {

        window.removeEventListener('wheel', this.onScroll, false);
    }

    onScroll = e => {
        const delay = 700
        if (e.deltaY < 0) { //Up
            news3('leave')
            setTimeout(() => {
                this.props.history.push('/news/section2')
            }, delay);
        }
        else if (e.deltaY > 0) { //Down
            news3('leave')
            setTimeout(() => {
                this.props.history.push('/news/section4')
            }, delay);
            return
        }
    }

    render() {

        const { firstPost } = this.props

        return (
            <div className={s.mainBox}>
                <div className={s.imageBox}>
                    <img className={[s.mainImage, 'mainImage'].join(' ')} src={typeof firstPost.image === 'undefined' ? null : firstPost.image.url} alt={typeof firstPost.image === 'undefined' ? null : firstPost.image.name} />
                    <div className={s.textBox}>
                        <h2 className={[s.photoTitle, 'photoTitle'].join(' ')}>{firstPost.title}</h2>
                        <div className={[s.photoDescription, 'photoDescription'].join(' ')}>{firstPost.description}</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(News3);