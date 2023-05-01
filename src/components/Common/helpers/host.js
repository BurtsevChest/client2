const protocol = 'http://';
let domain = window.location.hostname;
let api_domain, chatApi;

switch(domain) {
   case 'localhost':
      domain = window.location.host;
      api_domain = 'localhost:5763';
      chatApi = 'localhost:3000';
      break;
   default:
      api_domain = '45.91.8.70:5769';
      chatApi = '45.91.8.70:5775';
      break;
}

export {
   domain,
   api_domain,
   protocol,
   chatApi
}