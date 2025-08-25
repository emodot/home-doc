import dayjs from 'dayjs';

export const formatDate = (date, type = 'string') => {
  if (!date) return null;
  if (type === 'string') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = new Date(date).getDate();
    const month = months[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();
    return `${day} ${month} ${year}`;
  }
  return new Date(date)?.toISOString()?.split('T')[0];
};

export const formatToDateWithDash = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

export const getMonth = (month) => {
  return new Date(month).getMonth();
};

export const getYear = (year) => {
  return dayjs(new Date(year)).format('YYYY');
};

const convertTo24HourFormat = (time12Hour) => {
  const timeParts = time12Hour?.split(':');
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1].split(' ')[0]);
  const meridiem = timeParts[1].split(' ')[1];

  if (meridiem === 'PM' && hours < 12) {
    hours += 12;
  } else if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedTime;
};

export const insertTimeToDate = (date, time) => {
  const T = date?.replace('00:00:00.', `${convertTo24HourFormat(time)?.split(' ')[0]}:00.`);
  const D = dayjs(T);
  return D.subtract(1, 'hour');
};

export const isTimeInRange = (appointmentDate, startTime, endTime) => {
  const startT = convertTo24HourFormat(startTime);
  const endT = convertTo24HourFormat(endTime);
  const startDateTime = insertTimeToDate(appointmentDate, startT);
  const endDateTime = insertTimeToDate(appointmentDate, endT);
  const currentDate = dayjs(dayjs().format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'));

  if (!startDateTime.isSame(currentDate, 'day')) return false;
  if (currentDate.isAfter(startDateTime) && currentDate.isBefore(endDateTime)) return true;

  return false;
};

export const isAppointmentDate = (appointmentDate, startTime) => {
  const appointmentDateTime = insertTimeToDate(appointmentDate, startTime);
  const currentDate = dayjs(dayjs().format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'));

  if (!appointmentDateTime.isSame(currentDate, 'day')) return false;
  return true;
};

export const daysBetweenDates = (date1, date2) => {
  if (date1 && date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffInTime = Math.abs(date2 - date1);

    const diffInDays = Math.floor(diffInTime / oneDay);
    return diffInDays;
  }
};

export const isWithinAMonth = (expiryDate) => {  
  const currentDate = new Date()
  
  const oneDay = 24 * 60 * 60 * 1000;
  const diffInTime = expiryDate - currentDate;

  const diffInDays = Math.ceil(diffInTime / oneDay);
  if (diffInDays > 0 && diffInDays <= 30) {
    return 'expiring soon'
  } else if (diffInDays <= 0) {
    return 'expired';
  }
  

  // return diffInDays > 0 && diffInDays <= 30;
};
