const state = {
    version: '1.0.0',
    baseUrl: 'http://118.24.216.136:4001',
    imgUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.2.16:8080/static/img/' : `http://${window.location.host}/system/static/img/`
};

export default {
    state
};
