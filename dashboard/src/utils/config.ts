import { getEnv } from './functions'

export default {
    PAGE: "aspecir_emprestimos",
    APP_NAME: getEnv("REACT_APP_NAME", "Aspecir"),
    NEWS_URL: getEnv("REACT_APP_API_NOTICIA_URL"),
    LOGO: '/assets/imgs/aspecir-emprestimos-logo.svg',
    API_URL: getEnv("REACT_APP_API_SITE_URL"),

    getApiNewsUrl(page:number) {
        return getEnv("REACT_APP_API_NOTICIAS_URL") + "?page=" + (page || "1");
    },
}