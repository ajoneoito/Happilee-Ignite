/**
 * This code exports a function called "toDate" which takes in a string argument "dtr_string" that represents a date.
 * The function first checks if the input is null or undefined and returns null if so.
 * It then creates two Date objects, one for the input date and one for the current date.
 * It calculates the time difference between the two dates in milliseconds.
 * It uses the moment library to format the date.
 * @param {string} dtr_string Input date string.
 */
import moment from 'moment';
export function toDate(dtr_string: string | undefined) {
  if (!dtr_string) {
    return null;
  }
  let date = new Date(dtr_string);
  let currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();

  if (timeDiff <= 24 * 60 * 60 * 1000) {
    //If the time difference is less than or equal to 24 hours, it returns the time in the format of "h:mm a" (hours:minutes am/pm)
    return moment(date).format('h:mm a');
  } else if (timeDiff <= 48 * 60 * 60 * 1000) {
    // If the time difference is less than or equal to 48 hours, it returns the string "Yesterday".
    return 'Yesterday';
  } else if (timeDiff <= 168 * 60 * 60 * 1000) {
    // If the time difference is less than or equal to 168 hours (7 days), it returns the day of the week.
    return moment(date).format('dddd');
  } else {
    //If the time difference is greater than 168 hours, it returns the date in the format "DD/MM/YYYY".
    return moment(date).format('DD/MM/YYYY');
  }
}

export function toUpper(str: string | undefined | null) {
  if (str === undefined || str === '' || str === null) {
    return '';
  } else {
    let str_res = str
      .toLowerCase()
      .split('_')
      .map(function (word) {
        if (word[0] !== undefined) {
          return word[0].toUpperCase() + word.substr(1);
        } else {
          return '';
        }
      })
      .join(' ');
    return str_res;
  }
}

export function getDateString(isoDateString: string ) {
  const dateObject = new Date(isoDateString);

  const year = dateObject.getFullYear();
  const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
    dateObject,
  );
  const date = dateObject.getDate();

  // Format the date string
  const dateString = `${date} ${month} ${year}`;

  return dateString;
}

export function getTimeString(isoDateString: string) {
  const dateObject = new Date(isoDateString);

  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  // Convert hours to 12-hour format and determine if it's AM or PM
  let amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12' in 12-hour format

  // Format the time string
  const timeString = `${hours}:${minutes} ${amOrPm}`;

  return timeString;
}
function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}
export function formatDate(date: Date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('-');
}

export function formatDateStructure(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function removeDuplicates(arr: any) {
  const seenIds = {};
  const filteredArr = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (!seenIds.hasOwnProperty(current.lead_id)) {
      seenIds[current.lead_id] = true;
      filteredArr.push(current);
    } else {
      const duplicateIndex = filteredArr.findIndex(
        item => item.lead_id === current.lead_id,
      );
      if (duplicateIndex !== -1) {
        filteredArr.splice(duplicateIndex, 1);
      }
      filteredArr.push(current);
    }
  }

  return filteredArr;
}
