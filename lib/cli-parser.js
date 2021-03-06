var path = require('path');
var fs = require('fs');

module.exports = function (flags) {


//Getting data from cli

  var prefix = flags.prefix || process.env.PREFIX || 'weixin';

//Auth basic
  var id = flags.id || process.env.APP_ID || null;
  var secret = flags.secret || process.env.APP_SECRET || null;
  var token = flags.token || process.env.APP_TOKEN || null;

//Oauth
  var host = flags.host || process.env.HOST || null;
  var redirect = flags.redirect || process.env.REDIRECT || null;
  var scope = flags.scope || process.env.SCOPE || 0;
  var state = flags.state || process.env.STATE || 'STATE';


//JSSDK
//  var jsurl = flags.jssdkUrl || process.env.JSSDK_URL || null;


//Merchant
  var merchantId = flags.merchantId || process.env.MERCHANT_ID || null;
  var merchantKey = flags.merchantKey || process.env.MERCHANT_KEY || null;

//Certificate
  var certPKCS12File = flags.certFile || process.env.CERT_FILE || null;
  var certKey = flags.certKey || process.env.CERT_KEY || merchantId || null;


  var payUrl = flags.payUrl || process.env.PAY_URL || null;


//Init configuration
  var app = {
    id: id,
    secret: secret,
    token: token
  };

  var oauth = {
    state: state,
    scope: scope,
    host: host,
    redirect: redirect
  };

  var merchant = {
    id: String(merchantId),
    key: String(merchantKey)
  };

  var certificate = null;
  if (certPKCS12File) {
    certificate = {
      pkcs12: path.resolve(certPKCS12File),
      key: String(certKey)
    };
    certificate = {
      pfx: fs.readFileSync(path.resolve(certPKCS12File)),
      pfxKey: String(certKey)
    };
  }
  host = 'http://' + host;
  var urls = {
    access: host + '/' + prefix + '/oauth/access',
    success: host + '/' + prefix + '/oauth/success',
    redirect: redirect || host + '/page/oauth',
    pay: {
      callback: host + '/' + prefix + '/pay/callback',
      redirect: payUrl || host + '/page/pay'
    }
  };
  return {
    oauth: oauth,
    app: app,
    merchant: merchant,
    certificate: certificate,
    urls: urls
  };
};
