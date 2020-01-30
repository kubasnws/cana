import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../store";
import AgeChecker from './AgeChecker';
// import HomePage from './HomePage';
import MainSection1 from './MainSection1'
import MainBanner from './MainBanner';
import ErrorPage from './ErrorPage'
import MainSection2 from './MainSection2'
import MainSection3 from './MainSection3'
import Footer from './Footer'
import Products from './Products'
import News from './News';
import { routes } from '../routes';
import Test from './Test';


// import RouterComponent from './RouterComponent';
let postNumber = '2';
switch (localStorage.getItem('lang')) {
  case 'pl':
    postNumber = '2'
    break;
  case 'en':
    postNumber = '292';
    break;
  default:
    break;
}

const API = `http://cana.snwsprodukcja71.pl/wp-json/acf/v3/pages/${postNumber}`;
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


  setLanguage = () => {
    if (localStorage.getItem('lang') === null) {
      localStorage.setItem('lang', 'pl');
    }
  }

  componentDidMount() {
    this.setLanguage()

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

  selectHandler = (e, name) => {
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

    localStorage.setItem('isAgeOk', this.state.isAgeOk);
    if (localStorage.getItem('isAgeOk') !== 'true') {
      return (
        <Provider store={store}>
          <Router>
            <Redirect to={routes.age} />
            <Route
              path={routes.age}
              component={(e) => <AgeChecker
                location={e.location.pathname}
                selectHandler={this.selectHandler}
                day={this.state.day}
                month={this.state.month}
                year={this.state.year}
                ageVerificationHandler={this.ageVerificationHandler}
                isAnimated={this.state.isAgeAnimated}
                fail={this.state.ageFail}
                comeBack={this.state.ageComeBack}
              />}
            />
          </Router>
        </Provider>
      );

    } else {

      return (
        <Provider store={store}>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path='/test' >
                <Test />
              </Route>
              <Route exact path={routes.home} >
                <MainBanner />
              </Route>
              <Route path={routes.mainProd} >
                <MainSection1 />
              </Route>
              <Route path={routes.mainImage}
                component={() => <MainSection2
                  images={this.state.images}
                  sectionApi={this.state.mainSection2}
                  socialMedia={this.state.social_media} />} />
              <Route path={routes.mainVideo}
                component={() => <MainSection3
                  images={this.state.images}
                  section={this.state.mainSection3}
                  socialMedia={this.state.social_media} />} />
              <Route path={routes.mainFooter}
                component={() => <Footer
                  images={this.state.images}
                  section={this.state.footer}
                />}
              />
              <Route path={routes.products}
                component={() => <Products
                  images={this.state.images}
                  social={this.state.social_media}
                  footer={this.state.footer}
                  footerImages={this.state.images}
                  section={this.state.footer}
                />} />
              <Route path={routes.news}
                component={() => <News
                  images={this.state.images}
                  social={this.state.social_media}
                  footer={this.state.footer}
                  footerImages={this.state.images}
                  section={this.state.footer}
                />} />
              <Route
                path={routes.age}
                component={AgeChecker}
              />
              <Route path={routes.error} component={() => <ErrorPage cameleon={this.state.images} />} />
              <Redirect to={routes.error} />
            </Switch>
          </Router>
        </Provider>
      );
    }
  }
}

export default (App);
