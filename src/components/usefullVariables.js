export const backendBaseUrl = 'http://cana.snwsprodukcja71.pl';
// export const instaToken = '21406152901.1677ed0.b210d4c2300147ba9d4cad0d0335c3e4';
export const instaToken = '4684109970.1677ed0.746190f9744742f89e92e744799750c5';
export const lang = localStorage.getItem('lang');

let mainPageId = '2';
switch (localStorage.getItem('lang')) {
    case 'pl':
        mainPageId = '2'
        break;
    case 'en':
        mainPageId = '292';
        break;
    default:
        break;
}

export const mainPageApiLink = `/wp-json/acf/v3/pages/${mainPageId}`;
export const newsPageApiLink = `/wp-json/acf/v3/pages/230`;
export const prodPageApiLink = `/wp-json/acf/v3/pages/146`;
export const prodApiLink = `/wp-json/wp/v2/products`;
export const videoApiLink = count => `/wp-json/wp/v2/video_posts${count && `?per_page=${count}`}`;

