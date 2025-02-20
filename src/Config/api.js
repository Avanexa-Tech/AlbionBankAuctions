import axios from 'axios';

import {baseUrl, base_geolocation_Url} from './base_url';

export const api = {
  header: () => {
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return header;
  },

  //properties
  getMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },

  postMethod: (url, data) => {
    var headers = api.header();
    const formData = new FormData();
    Object.keys(data).map(obj => {
      formData.append(obj, data[obj]);
    });
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, data, {headers: headers})
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => resolve(err.response.data));
    });
  },

  putMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .put(baseUrl + url, data, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },

  deleteMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .delete(baseUrl + url, data, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },

  //auction
  AuctiongetMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },

  AuctionpostMethod: (url, data) => {
    var headers = api.header();
    const formData = new FormData();
    Object.keys(data).map(obj => {
      formData.append(obj, data[obj]);
    });
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, data, {headers: headers})
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => resolve(err.response.data));
    });
  },

  AuctionspostMethod: (url, data, token, header) => {
    var headers = api.header(token);
    if (header != undefined) {
      headers['x-razorpay-signature'] = header;
    }
    const formData = new FormData();
    Object.keys(data).map(obj => {
      formData.append(obj, data[obj]);
    });
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, data, { headers: headers })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            resolve(res.data);
          }
        })
        .catch(err => resolve(err.response.data));
    });
  },

  AuctionputMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .put(baseUrl + url, data, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },

  AuctiondeleteMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .delete(baseUrl + url, data, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },

  //geolocation
  Auction_geolocation_getMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },
};
