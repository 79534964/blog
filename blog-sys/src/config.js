const host = 'http://118.24.216.136';

export default {
  state: {
    version: '1.0.0',
    host,
    baseUrl: `${host}:4001`,
    imgUrl: process.env.NODE_ENV === 'development' ? `${host}:8080/static/img/` : `http://${window.location.host}/system/static/img/`,
    http: {
      ok: 200,
      noToken: 415
    }
  }
};
