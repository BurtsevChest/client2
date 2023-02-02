import configIndex from "@/components/Index/config";
import configSidebar from "@/components/UserAccount/Sidebar/config";

const ALL_PAGES = configIndex.concat(configSidebar);

/**
 * 
 * @param {*} page Принимает path текущей страницы 
 * @result Задает текущей странице title. А то localhost:8080 смотрится некрасиво
 */
export function setPageName(page) {
   ALL_PAGES.forEach((item) => {
      if(item.path === page || item.href === page) {
         document.title = item.title
      }
   })
}