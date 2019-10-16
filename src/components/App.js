import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AgeChecker from './AgeChecker';
// import HomePage from './HomePage';
import MainSection1 from './MainSection1'
import MainBanner from './MainBanner';
import ErrorPage from './ErrorPage'
import MainSection2 from './MainSection2'
import MainSection3 from './MainSection3'
import Footer from './Footer'
import Products from './Products'
import News from './News'



// import RouterComponent from './RouterComponent';


const API = 'http://cana.snwsprodukcja71.pl/wp-json/acf/v3/pages/2';
export let socialLinks = Object
export let menuItems = Object
export let contactInfos = Object
export let imageLogo = Object

if (localStorage.getItem("isAgeOk") === null) {
  localStorage.setItem("isAgeOk", false)
}

class App extends Component {
  state = {
    isScrolled: false,
    isAgeOk: localStorage.getItem('isAgeOk'),
    isAgeAnimated: false,
    ageFail: false,
    cameleonImage: '',
    day: '',
    month: '',
    year: '',
    logo: '',
    social_media: {},
    images: {},
    videos: {},
    mainSection2: {},
    mainSection3: {},
    footer: {
      information: {},
      easyContact: {},
      images: {
        product: {},
        background: {},
        bottom_small: {},
        bottom_big: {},
      },
    },
  }

  componentDidMount() {

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status)
      })
      .then(response => response.json())
      .then(data => {
        const acf = data.acf;

        socialLinks = acf.social_media
        contactInfos = acf.easy_contact
        imageLogo = {
          white: acf.logo.url,
          dark: acf.logo_dark.url
        }
        // menuItems = acf.

        this.setState(() => ({
          logo: acf.logo.url,
          social_media: acf.social_media,
          images: {
            cameleon: acf.cameleon.url,
            circle_cana: acf.circle_cana.url,
            cana_text_background: acf.cana_text_background.url,
            side_logo: acf.side_logo.url,
            logo: acf.logo.url,
            dark_logo: acf.logo_dark.url,
            sideTextSection__1: acf.side_text.url,
            sample_product: acf.sample_product.url,
            left_image__1: acf.left_image__1.url,
            left_image__2: acf.left_image__2.url,
            cannaCar: acf.canna_car.url,
          },
          mainSection2: {
            title: acf.description_2.title,
            text: acf.description_2.text
          },
          mainSection3: {
            videoBackground: acf.video_background.url,
            title: acf.text_group.title,
            text: acf.text_group.text,
            videoDev: acf.video_dev.url,
            leftImage: acf.image_sec_3.url
          },
          footer: {
            information: acf.information,
            easyContact: acf.easy_contact,
            images: acf.footer_images,
          },
          videos: {
            smoke_1: acf.banner_video.url,
            smoke_2: acf.age_verification_video.url
          }
        }));
      })
      .catch(error => console.log(error + " coś nie tak"))

    window.addEventListener('touchstart', () => {
      document.querySelector('.body').classList.add('bodyOverflowFalse')
    });

    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    this.setState({
      day: dd,
      month: mm,
      year: yyyy,
    }, this.isAgeAnimatedHandler);

  }

  isAgeAnimatedHandler = () => {
    // this.setState({ isAgeAnimated: true });
    // onLoadAgeHandler()
  }

  selectHandler = (e, name) => {
    console.log()
    this.setState({
      [name]: e.target.value
    })
  }


  ageVerificationHandler = () => {
    let { day, month, year } = this.state
    day = parseInt(day)
    month = parseInt(month)
    year = parseInt(year)
    const minAge = 18
    const userBirth = new Date((year + minAge), month, day);
    const today = new Date()
    const difference = today.getTime() - userBirth.getTime()
    if (difference < 0) { //refusal
      const sec = difference / -1000
      // const days = Math.floor(sec / (3600 * 24));
      const d = Math.floor(sec / (3600 * 24));
      const dDisplay = d > 0 ? d + (d === 1 ? " day" : " days") : "";
      this.setState({
        ageFail: true,
        ageComeBack: dDisplay
      })
    } else { //allow
      this.setState({
        isAgeOk: true,
      })
    }

  }


  render() {

    // window.addEventListener('wheel', (e) => scrollDirectionDetect(e));

    localStorage.setItem('isAgeOk', this.state.isAgeOk);
    if (localStorage.getItem('isAgeOk') !== 'true') {
      return (
        <Router>
          <Redirect to="/age" />
          <Route
            path="/age"
            component={(e) => <AgeChecker
              location={e.location.pathname}
              selectHandler={this.selectHandler}
              day={this.state.day}
              month={this.state.month}
              year={this.state.year}
              ageVerificationHandler={this.ageVerificationHandler}
              images={this.state.images}
              videos={this.state.videos}
              isAnimated={this.state.isAgeAnimated}
              fail={this.state.ageFail}
              comeBack={this.state.ageComeBack}
            />}
          />
        </Router>
      );

    } else {

      return (
        <>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path='/' component={() => <MainBanner
                logo={this.state.logo}
                socialMedia={this.state.social_media}
                videos={this.state.videos} />} />
              <Route path='/main-section-1'
                component={() => <MainSection1
                  images={this.state.images}
                  socialMedia={this.state.social_media} />}
              />
              <Route path='/main-section-2'
                component={() => <MainSection2
                  images={this.state.images}
                  sectionApi={this.state.mainSection2}
                  socialMedia={this.state.social_media} />} />
              <Route path='/main-section-3'
                component={() => <MainSection3
                  images={this.state.images}
                  section={this.state.mainSection3}
                  socialMedia={this.state.social_media} />} />
              <Route path='/footer'
                component={() => <Footer
                  images={this.state.images}
                  section={this.state.footer}
                  logo={this.state.logo}
                  socialMedia={this.state.social_media} />}
              />
              {/* <Route path='/products'
                component={() => <Products
                  images={this.state.images}
                  social={this.state.social_media}
                  footer={this.state.footer}
                />} />
              <Route path='/news'
                component={() => <News
                  images={this.state.images}
                  social={this.state.social_media}
                  footer={this.state.footer}
                />} /> */}
              <Route
                path="/age"
                component={AgeChecker}
              />
              <Route path="/404" component={() => <ErrorPage cameleon={this.state.images} />} />
              <Redirect to='/404' />
            </Switch>
          </Router>
        </>
      );
    }
  }
}


export default App;
