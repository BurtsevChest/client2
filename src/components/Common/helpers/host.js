const protocol = 'http://';
let domain = window.location.hostname;
let api_domain, chatApi, socket_domain;

switch(domain) {
   case 'localhost':
      domain = window.location.host;
      api_domain = 'localhost:5763';
      chatApi = 'localhost:3000';
      socket_domain = 'localhost:5763'; 
      break;
   default:
      api_domain = '45.91.8.70:5769';
      chatApi = '45.91.8.70:5775';
      socket_domain = '45.91.8.70:5769'; 
      break;
}

export {
   domain,
   api_domain,
   protocol,
   chatApi,
   socket_domain
}