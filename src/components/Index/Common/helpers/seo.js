import seoData from '@/components/Index/Common/seoData.json';

const SEO_PAGE_TITLE = document.querySelector('meta[name="title"]');
const SEO_PAGE_DESCRIPTION = document.querySelector('meta[name="description"]');

export function setSeo(path) {
   try {
     if(!path.includes('/user_account')) {
       SEO_PAGE_TITLE.setAttribute("content", seoData[path].title)
       SEO_PAGE_DESCRIPTION.setAttribute("content", seoData[path].description)
     }else {
       SEO_PAGE_TITLE.setAttribute("content", '')
       SEO_PAGE_DESCRIPTION.setAttribute("content", '')
     }
   } catch(error) {
      SEO_PAGE_TITLE.setAttribute("content", '')
      SEO_PAGE_DESCRIPTION.setAttribute("content", '')
   }
}
