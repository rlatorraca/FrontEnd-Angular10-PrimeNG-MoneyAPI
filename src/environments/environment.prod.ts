export const environment = {
  production: true,
  apiURL: 'https://rlspmoney-api.herokuapp.com/',

  allowedDomaninsProd: [ new RegExp('rlspmoney-api.herokuapp.com')],
  disallowedRoutesProd: [ new RegExp('\/oauth\/token') ]
};
