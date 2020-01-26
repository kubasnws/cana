import { lang } from '../components/usefullVariables';


export const routes = lang === 'pl' ? {
    home: '/',
    age: '/age',
    mainProd: '/main-section-1',
    mainImage: '/main-section-2',
    mainVideo: '/main-section-3',
    mainFooter: '/footer',
    products: '/products',
    productsHome: '/products/section1',
    productsSingle: '/products/section2',
    productsInsta: '/products/section3',
    productsFooter: '/products/footer',
    news: '/news',
    newsHome: '/news/section1',
    newsVideos: '/news/section2',
    newsImages: '/news/section3',
    newsInsta: '/news/section4',
    newsFooter: '/news/footer',
    error: '/404',
} : {
        home: '/',
        age: '/age',
        mainProd: '/main-section-1',
        mainImage: '/main-section-2',
        mainVideo: '/main-section-3',
        mainFooter: '/footer',
        products: '/products',
        productsHome: '/products/section1',
        productsSingle: '/products/section2',
        productsInsta: '/products/section3',
        productsFooter: '/products/footer',
        news: '/news',
        newsHome: '/news/section1',
        newsVideos: '/news/section2',
        newsImages: '/news/section3',
        newsInsta: '/news/section4',
        newsFooter: '/news/footer',
        error: '/404',
    }




export const navigation = {
    home: [
        routes.home,
        routes.mainProd,
        routes.mainImage,
        routes.mainVideo,
        routes.mainFooter,
    ],
    products: [
        routes.productsHome,
        routes.productsSingle,
        routes.productsInsta,
        routes.productsFooter,
    ],
    news: [
        routes.newsHome,
        routes.newsVideos,
        // routes.newsImages,
        routes.newsInsta,
        routes.newsFooter,
    ],
}
