export const handlerLanguageChange = e => {
    const lang = e.target.getAttribute('lang');

    if (localStorage.getItem('lang') !== lang) {
        localStorage.setItem('lang', lang);
        window.location.reload();
    }
}
