import api_settings from '../../../../api.json';

const protocol = 'http://';
let domain = window.location.hostname;
let api_domain, chatApi, socket_domain;

switch(domain) {
   case 'localhost':
      domain = window.location.host;
      api_domain = api_settings["local"].api_domain;
      chatApi = api_settings["local"].chatApi;
      socket_domain = api_settings["local"].socket_domain;
      break;
   default:
      api_domain = api_settings["production"].api_domain;
      chatApi = api_settings["production"].chatApi;
      socket_domain = api_settings["production"].socket_domain;
      break;
}

export {
   domain,
   api_domain,
   protocol,
   chatApi,
   socket_domain
}