export const environment = {
  production: true,
  apiURL: 'http://rlspmoney-api.heroku.com',

  allowedDomaninsProd: [ new RegExp('rlspmoney-api.herokuapp.com')],
  disallowedRoutesProd: [ new RegExp('\/oauth\/token') ]
};
