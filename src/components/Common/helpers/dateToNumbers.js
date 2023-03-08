const monthDictionary = {
   1: 'января',
   2: 'февраля',
   3: 'марта',
   4: 'апреля',
   5: 'мая',
   6: 'июня',
   7: 'июля',
   8: 'августа',
   9: 'сентября',
   10: 'октября',
   11: 'ноября',
   12: 'декабря'
}

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

/**
 * 
 * @param {*} date Принимает таску. 
 * @returns Добавляет поле date в виде dd.mm.yy
 */

export function setOneTaskDate(task) {
   var date = new Date(task.date_of_completion);
   task.date = dateToNumbers(date);
   return task;
}

export function setOneTaskMonthDate(task) {
   var date = new Date(task.date_of_completion);
   task.date = dateToMonthText(date);
   return task
}

export function dateToMonthText(date) {
   var newDate = date;
   if(!(date instanceof Date)) {
      newDate = new Date(date)
   }
   let day = newDate.getDate();
   let month = newDate.getMonth() + 1;
   let year = newDate.getFullYear();

   month = monthDictionary[month];
   if(year > 2000) {
      year = year.toString()[2] + year.toString()[3]
   }

   return day + ' ' + month + ' \'' + year
}

/**
 * 
 * @param {*} date Принимает таску. 
 * @returns Добавляет поле date в виде dd.mm.yy
 */

export function generateDateMonth(tasks) {
   tasks.forEach((item) => {
      var date = new Date(item.date_of_completion);
      item.date = dateToMonthText(date);
   });
   return tasks;
}