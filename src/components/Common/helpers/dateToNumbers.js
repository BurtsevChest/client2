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
 * @param {*} date Принимает экземпляр класса Date() или строку для его образования.
 * @returns Возвращает дату в виде dd.mm.yy
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

   return `${day}.${month}.${year}`
}

/**
 * 
 * @param {*} date Принимает экземпляр класса Date() или строку для его образования.
 * @returns Возвращает дату в виде "1 января `1970" или "1 января `23"
 */

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

   return `${day} ${month} '${year}`
}

/**
 * 
 * @param {*} date1 первая дата (в виде строки или экземпляра класса Date)
 * @param {*} date2 вторая дата (в виде строки или экземпляра класса Date)
 * @returns Возвращает разницу date1 - date2
 */

export function dayDiff(date1, date2) {
   var newDate1 = date1;
   var newDate2 = date2;
   if(!(newDate2 instanceof Date)) {
      newDate2 = new Date(date2)
   }
   if(!(newDate1 instanceof Date)) {
      newDate1 = new Date(date1)
   }
   return Math.ceil((newDate1 - newDate2) / (1000 * 60 * 60 * 24));
}

// Дописать DateFormatter

class DateFormatter {
   _date = '';
   _day = '';
   _month = '';
   _year = '';

   constructor(date) {
      this._date = date;

      if(!(date instanceof Date)) {
         this._date = new Date(date);
      }

      this._day = this._date.getDate();
      this._month = this._date.getMonth() + 1;
      this._year = this._date.getFullYear();
   }

   getDate() {
      return this._day;
   }

   getMonthNumber() {
      return this._month;
   }

   getMonthText() {
      return monthDictionary[this._month];
   }
}

export default DateFormatter
