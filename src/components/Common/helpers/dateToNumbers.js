/**
 * 
 * @param {*} date Принимает экземпляр класса Date() 
 * @returns Возвращает дату в виде dd.mm.yyy
 */

export function dateToNumbers(date) {
   var newDate = date;
   if(!(date instanceof Date)) {
      newDate = new Date(date)
   }
   let day = newDate.getDate();
   let month = newDate.getMonth() + 1;
   let year = newDate.getFullYear();

   if(day < 10) day = '0'+day
   if(month < 10) month = '0'+month

   return day + '.' + month + '.' + year
}

/**
 * 
 * @param {*} date Принимает массив тасков. 
 * @returns Добавляет поле date в виде dd.mm.yy
 */

export function generateDate(tasks) {
   tasks.forEach((item) => {
      var dat = new Date(item.date_of_completion);
      item.date = dateToNumbers(dat);
   });
   return tasks;
}