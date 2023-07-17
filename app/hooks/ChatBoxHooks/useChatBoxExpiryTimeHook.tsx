/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import {useState, useEffect} from 'react';
// This custom hook is used to update expiration time for an intervel of time(1 minute).
let Time: string = '';
let interval: ReturnType<typeof setInterval>; // Defining type of interval

export const useChatBoxExpiryTimeHook = (expiryTime?: Date) => {
  const today = moment(new Date()).format('DD/MM/YYYY');
  const [expirationTime, setExpirationTime] = useState('');
  useEffect(() => {
    ExpirationTimeServiceCall();
    interval = setInterval(function () {
      ExpirationTimeServiceCall();
    }, 60000);
    return () => clearIntervals();
  }, []);

  const ExpirationTimeServiceCall = () => {
    Time = timeDiff(
      moment(new Date()).format('HH:mm'),
      expiryTime
        ? moment(expiryTime).format('HH:mm')
        : moment(new Date()).format('HH:mm'),
      expiryTime
        ? moment(expiryTime).format('DD/MM/YYYY')
        : moment(new Date()).format('DD/MM/YYYY'),
    );
    setExpirationTime(Time);
  };

  function clearIntervals() {
    clearInterval(interval);
  }

  /*
    This is a function that calculates the difference in time between two given times, "start" and "end".
    It splits the input times by ":", converts them to Date objects, and calculates the difference in milliseconds.
    It then converts this difference to hours and minutes,
    and adds the difference in days between two dates (toDate and today) multiplied by 24.
    Finally, it returns the difference in hours and minutes.
  */
  const timeDiff = (start: string, end: string, toDate: string): string => {
    const startParts: string[] = start.split(':');
    const endParts: string[] = end.split(':');
    const startDate: Date = new Date(
      0,
      0,
      0,
      parseInt(startParts[0], 10),
      parseInt(startParts[1], 10),
      0,
    );
    const endDate: Date = new Date(
      0,
      0,
      0,
      parseInt(endParts[0], 10),
      parseInt(endParts[1], 10),
      0,
    );
    let differ: number = endDate.getTime() - startDate.getTime();
    let hours: number = Math.floor(differ / 1000 / 60 / 60);
    differ -= hours * 1000 * 60 * 60;
    let minutes: number = Math.floor(differ / 1000 / 60);

    const a: moment.Moment = moment(today, 'DD/MM/YYYY');
    const b: moment.Moment = moment(toDate, 'DD/MM/YYYY');
    hours += b.diff(a, 'days') * 24;
    if (hours < 0) {
      hours += 24;
    }
    return (
      (hours <= 9 ? '0' : '') +
      hours +
      ':' +
      (minutes <= 9 ? '0' : '') +
      minutes
    );
  };
  return {expirationTime};
};
