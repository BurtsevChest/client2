const protocol = 'http://';
let domain = window.location.hostname;
let api_domain;

if(domain === 'localhost') {
   domain = window.location.host;
   api_domain = 'localhost:5763';
}

export {
   domain,
   api_domain,
   protocol
}