import React, { Component } from 'react';
import { withRouter } from 'react-router';
import s from './FooterWhite.css'
import Logo from './Logo'
import { socialLoad, whiteFooterAnimation } from './Animations'
import SocialMedia from './SocialMedia'
import CopyrightSnws from './CopyrightSnws'

let debounce = false

class FooterWhite extends Component {
    state = {

    }
    componentDidMount() {

        window.addEventListener('wheel', this.onScroll, false);
        socialLoad()
        whiteFooterAnimation('enter')
    }

    componentWillUnmount() {

        window.removeEventListener('wheel', this.onScroll, false);
    }

    onScroll = e => {
        const { localization } = this.props
        if (e.deltaY < 0 && !debounce) { //Up
            whiteFooterAnimation('leave')
            debounce = true

            setTimeout(() => {
                localization === 'news' ? this.props.history.push('/news/section4') : this.props.history.push('/products/section3')
                debounce = false
            }, 500);
        }
        else if (e.deltaY > 0) { //Down
            return
        }
    }

    render() {
        const { sectionApi, footer: footerApi, width } = this.props
        const { topBanner, leftImage, mailImage, green } = sectionApi
        const { dark_logo } = this.props.images

        const leftSection = (
            <div className={[s.image, 'footerImage'].join(' ')}>
                {typeof leftImage === 'undefined' ? null : <img src={leftImage.url} alt="Product decoration" />}
            </div>
        )

        return (
            <div className={s.mainBox}>
                <div className={[s.topBanner, 'topBannerFooter'].join(' ')}>
                    <div>catch and stay with the dark horse!</div>
                    {typeof topBanner === 'undefined' ? null : <img src={topBanner.url} alt={topBanner.name} />}
                </div>
                <div className={s.logoBox}>
                    <Logo logo={dark_logo} color='dark' />
                    {width <= 1024 ? <SocialMedia fontSize={20} boxSize={36} isHorizontal={true} marginBottom={false} /> : null}
                </div>
                <div className={s.contentBox}>
                    {width <= 600 ? null : leftSection}
                    <div className={s.right}>
                        <div className={s.infos}>
                            <div className={s.contact}>
                                <div className={s.top}>
                                    <Localization data={footerApi.information} />
                                    <EasyContact data={footerApi.easyContact} />
                                </div>
                                <div className={s.bottom}>
                                    <div className={[s.mail, 'footerMail'].join(' ')} >
                                        <div className={s.mailText}>{footerApi.easyContact.mail}</div>
                                        {typeof mailImage === 'undefined' ? null : <img src={mailImage.url} alt="Mail background" />}
                                    </div>
                                </div>
                            </div>
                            <div className={s.social}>
                                {width > 1024 ? <SocialMedia fontSize={25} boxSize={45} isHorizontal={false} marginBottom={false} /> : null}
                            </div>
                        </div>
                        <div className={s.coppy}>
                            <CopyrightSnws isDark={true} />
                        </div>
                    </div>
                </div>
                {typeof green === 'undefined' ? null : <img className={s.greenBottom} src={green.url} alt="Bottom decoration" />}
            </div>

        );
    }
}

const Localization = (props) => {
    const { name, street, city } = props.data
    return (
        <div className={[s.contactElement, 'contactElement'].join(' ')}>
            <h3>localization</h3>
            <p>{name}</p>
            <p>{street}</p>
            <p>{city}</p>
        </div>
    );
}

const EasyContact = (props) => {
    const { phone, fax, mail } = props.data
    return (
        <div className={[s.contactElement, 'contactElement'].join(' ')}>
            <h3>easy contact</h3>
            <p>t. {phone}</p>
            <p>f. {fax}</p>
            <p>e-mail: {mail}</p>
        </div>
    );
}

export default withRouter(FooterWhite);
