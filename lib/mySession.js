var _ = require('lodash');
var session = require('node-weixin-session');

var stock = {
  oauth: {
    state: 'STATE',
    scope: 0,
    host: null,
    redirect: null
  },
  app: {
    id: null,
    secret: null,
    token: null
  },
  merchant: null,
  certificate: null,
  urls: {
    access: null,
    success: null,
    redirect: null,
    pay: {
      callback: null,
      redirect: null
    }
  }
};

var sessionConf = {
  default: _.clone(stock)
};

function getSessionConf(req, key) {
  if (!req) {
    req = {
      session: {
        id: 'default'
      }
    };
  }
  var id = req.session.id;
  if (sessionConf[id] && sessionConf[id][key]) {
    return sessionConf[id][key];
  }
  return sessionConf.default[key];
}

function setSessionConf(req, key, value) {
  if (!req) {
    req = {
      session: {
        id: 'default'
      }
    };
  }
  var id = req.session.id;

  if (!sessionConf[id]) {
    sessionConf[id] = _.clone(stock);
  }
  sessionConf[id][key] = value;
}

session.registerSet(setSessionConf);
session.registerGet(getSessionConf);

export default session;
