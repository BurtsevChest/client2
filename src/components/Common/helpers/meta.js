const metaTags = [
   'title',
   'description',
   'keywords',
   'robots'
]

const SEO = {};

metaTags.forEach((item) => {
   try {
      SEO[item] = document.querySelector(`meta[name="${item}"]`);
   } catch(err) { 
      console.log(item + 'is not defined');
   }
})

export function setSeo(item, value) {
   item.setAttribute("content", value)
}

export default SEO;